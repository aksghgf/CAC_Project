const express = require('express');
const ExpenseReport = require('../models/ExpenseReport');
const { auth, adminAuth } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/security');
const { expenseSchemas, validate } = require('../middleware/validation');
const { uploadReceipt, handleUploadError, getFileUrl } = require('../middleware/upload');
const router = express.Router();

// Get all expense reports
router.get('/', auth, apiLimiter, async (req, res) => {
  try {
    const businessId = req.user.businessId;
    let query = { businessId };
    
    // If user is not admin, only show their own expenses
    if (req.user.role !== 'admin') {
      query.employeeId = req.user._id;
    }
    
    const expenses = await ExpenseReport.find(query)
      .sort({ submittedAt: -1 })
      .populate('employeeId', 'name email');
      
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create expense report with file upload
router.post('/', auth, apiLimiter, uploadReceipt, handleUploadError, validate(expenseSchemas.create), async (req, res) => {
  try {
    const { amount, description, category, receipt } = req.body;
    const businessId = req.user.businessId;
    
    // Ensure user has a businessId (should be set for all users)
    if (!businessId) {
      return res.status(400).json({ message: 'User not associated with any business' });
    }
    
    const expense = new ExpenseReport({
      employeeId: req.user._id,
      businessId,
      employeeName: req.user.name,
      amount,
      description,
      category,
      receipt: req.file ? req.file.filename : receipt // Use uploaded file or existing receipt URL
    });
    
    await expense.save();
    
    // Populate employee info before sending response
    await expense.populate('employeeId', 'name email');
    
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update expense status (admin only)
router.put('/:id/status', auth, adminAuth, apiLimiter, validate(expenseSchemas.updateStatus), async (req, res) => {
  try {
    const businessId = req.user.businessId;
    const { status } = req.body;
    const expense = await ExpenseReport.findOneAndUpdate(
      { _id: req.params.id, businessId },
      { status, reviewedAt: new Date() },
      { new: true }
    );
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get expense statistics
router.get('/stats', auth, apiLimiter, async (req, res) => {
  try {
    const businessId = req.user.businessId;
    let query = { businessId };
    
    // If user is not admin, only show their own statistics
    if (req.user.role !== 'admin') {
      query.employeeId = req.user._id;
    }
    
    const stats = await ExpenseReport.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);
    
    const totalExpenses = await ExpenseReport.countDocuments(query);
    const totalAmount = await ExpenseReport.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    res.json({
      stats,
      totalExpenses,
      totalAmount: totalAmount[0]?.total || 0
    });
  } catch (error) {
    console.error('Error fetching expense stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get expense by ID
router.get('/:id', auth, apiLimiter, async (req, res) => {
  try {
    const businessId = req.user.businessId;
    let query = { _id: req.params.id, businessId };
    if (req.user.role !== 'admin') {
      query.employeeId = req.user._id;
    }
    const expense = await ExpenseReport.findOne(query);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;