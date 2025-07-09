const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  goal: {
    type: String,
    required: true,
    enum: ['conversions', 'reach', 'engagement', 'traffic']
  },
  budget: {
    type: Number,
    required: true,
    min: 0
  },
  targetAudience: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  platforms: {
    type: [String],
    required: true,
    enum: ['meta', 'google', 'influencer', 'email', 'billboard']
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'completed'],
    default: 'active'
  },
  cac: {
    type: Number,
    default: 0
  },
  spend: {
    type: Number,
    default: 0
  },
  conversions: {
    type: Number,
    default: 0
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  mlOptimizations: {
    targeting: [String],
    budgetSplit: {
      meta: { type: Number, default: 50 },
      google: { type: Number, default: 50 }
    },
    suggestedCreatives: [String]
  },
  influencerLinks: [
    {
      influencerId: String,
      influencerName: String,
      utmLink: String
    }
  ],
  emailUtmLink: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Campaign', campaignSchema);