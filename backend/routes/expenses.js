const express = require('express');
const ExpenseReport = require('../models/ExpenseReport');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Get all expense reports
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { employeeId: req.user._id };
    const expenses = await ExpenseReport.find(query).sort({ submittedAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create expense report
router.post('/', auth, async (req, res) => {
  try {
    const { amount, description, category, receipt } = req.body;

    const expense = new ExpenseReport({
      employeeId: req.user._id,
      employeeName: req.user.name,
      amount,
      description,
      category,
      receipt
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update expense status (admin only)
router.put('/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const expense = await ExpenseReport.findByIdAndUpdate(
      req.params.id,
      { status, reviewedAt: new Date() },
      { new: true }
    );
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;