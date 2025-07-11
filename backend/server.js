const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
console.log('Loaded ENV:', process.env.PORT, process.env.MONGODB_URI, process.env.FRONTEND_URL);
// Import configurations
const { connectDB } = require('./config/database');
const { securityConfig, apiLimiter } = require('./middleware/security');

const app = express();
const PORT = process.env.PORT || 5000;

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Security middleware
app.use(securityConfig);
// Allow all origins for local development
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API rate limiting
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/billboards', require('./routes/billboards'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      message: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const Business = require('./models/Business'); // Add this import

const seedUsers = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      // 1. Create a default business
      const business = await Business.create({ name: 'Default Business' });

      const salt = await bcrypt.genSalt(10);
      const adminPassword = await bcrypt.hash('admin123', salt);
      const employeePassword = await bcrypt.hash('employee123', salt);

      // 2. Use business._id for both users
      const adminUser = new User({
        name: 'Default Admin',
        email: 'admin@demo.com',
        password: adminPassword,
        role: 'admin',
        businessId: business._id
      });

      const employeeUser = new User({
        name: 'Default Employee',
        email: 'employee@demo.com',
        password: employeePassword,
        role: 'employee',
        businessId: business._id
      });

      await adminUser.save();
      await employeeUser.save();

      console.log('Default users created: admin@demo.com / admin123, employee@demo.com / employee123');
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await seedUsers();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();