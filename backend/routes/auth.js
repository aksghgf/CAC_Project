const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Business = require('../models/Business');
const { authLimiter } = require('../middleware/security');
const { authSchemas, validate } = require('../middleware/validation');
const { auth } = require('../middleware/auth');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');


// Register
router.post('/register', authLimiter, validate(authSchemas.register), async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    console.log("New Login is ",email, password, user);
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register Admin (Business Owner)
router.post('/register-admin', authLimiter, async (req, res) => {
  try {
    const { email, password, name, businessName } = req.body;
    // Check if business exists
    const existingBusiness = await Business.findOne({ name: businessName });
    if (existingBusiness) {
      return res.status(400).json({ message: 'Business already exists' });
    }
    // Create business
    const business = await Business.create({ name: businessName });
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create admin user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role: 'admin',
      businessId: business._id
    });
    await user.save();
    // Generate token
    const token = jwt.sign(
      { id: user._id, businessId: business._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        businessId: user.businessId
      },
      business: {
        id: business._id,
        name: business.name
      }
    });
  } catch (error) {
    console.error('Register Admin Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Register Employee
router.post('/register-employee', authLimiter, auth, async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const businessId = req.user.businessId; // Get from logged-in admin
    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(400).json({ message: 'Business not found' });
    }
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create employee user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role: 'employee',
      businessId: business._id
    });
    await user.save();
    // Generate token
    const token = jwt.sign(
      { id: user._id, businessId: business._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        businessId: user.businessId
      },
      business: {
        id: business._id,
        name: business.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login (update to return businessId)
router.post('/login', authLimiter, validate(authSchemas.login), async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Generate token
    const token = jwt.sign(
      { id: user._id, businessId: user.businessId },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        businessId: user.businessId
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        businessId: user.businessId
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `http://localhost:5173/reset-password/${token}`;
  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: 'Password Reset',
    text: `Reset your password by clicking the link: ${resetUrl}`,
  };

  const info = await transporter.sendMail(mailOptions);

  // Log Ethereal preview URL for development
  if (process.env.EMAIL_HOST === 'smtp.ethereal.email') {
    console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
  }

  res.json({ message: 'Password reset email sent' });
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Password has been reset' });
});

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh-secret-key');
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate new access token
    const newToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

// Logout
router.post('/logout', auth, async (req, res) => {
  try {
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// List all businesses (for employee registration)
router.get('/businesses', async (req, res) => {
  try {
    const businesses = await Business.find({}, '_id name');
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;