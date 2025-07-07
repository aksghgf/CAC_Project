const mongoose = require('mongoose');

const billboardAttributionSchema = new mongoose.Schema({
  billboardId: {
    type: String,
    required: true
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  conversions: {
    type: Number,
    default: 0
  },
  radius: {
    type: Number,
    default: 1000 // 1km in meters
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BillboardAttribution', billboardAttributionSchema);