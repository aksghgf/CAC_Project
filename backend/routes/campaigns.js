const express = require('express');
const Campaign = require('../models/Campaign');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Get all campaigns
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create campaign
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { name, goal, budget, targetAudience, region, platform } = req.body;

    // ML optimization simulation
    const mlOptimizations = {
      targeting: ['ML-optimized demographic', 'Interest-based targeting'],
      budgetSplit: platform === 'both' ? { meta: 55, google: 45 } : 
                   platform === 'meta' ? { meta: 100, google: 0 } : 
                   { meta: 0, google: 100 },
      suggestedCreatives: ['Video ads', 'Carousel ads', 'Single image ads']
    };

    const campaign = new Campaign({
      name,
      goal,
      budget,
      targetAudience,
      region,
      platform,
      mlOptimizations
    });

    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update campaign
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete campaign
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.json({ message: 'Campaign deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;