const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // Optionally, add more fields (address, industry, etc.)
});

module.exports = mongoose.model('Business', businessSchema); 