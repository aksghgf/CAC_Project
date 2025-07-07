const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cac-optimizer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const User = require('./models/User');
const Campaign = require('./models/Campaign');
const ExpenseReport = require('./models/ExpenseReport');
const BillboardAttribution = require('./models/BillboardAttribution');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/billboards', require('./routes/billboards'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});