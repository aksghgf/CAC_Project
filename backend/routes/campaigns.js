const express = require('express');
const Campaign = require('../models/Campaign');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Get all campaigns
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const businessId = req.user.businessId;
    const campaigns = await Campaign.find({ businessId }).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper to generate UTM link
function generateUTMLink({ baseUrl, source, medium, campaign, content }) {
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
    utm_content: content,
  });
  return `${baseUrl}?${params.toString()}`;
}

// Create campaign
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { name, goal, budget, targetAudience, region, platforms, influencers = [] } = req.body;
    const businessId = req.user.businessId;
    const baseUrl = 'https://yourwebsite.com/'; // TODO: Make configurable

    // ML optimization simulation
    const mlOptimizations = {
      targeting: ['ML-optimized demographic', 'Interest-based targeting'],
      budgetSplit: platforms?.includes('meta') && platforms?.includes('google') ? { meta: 55, google: 45 } : 
                   platforms?.includes('meta') ? { meta: 100, google: 0 } : 
                   platforms?.includes('google') ? { meta: 0, google: 100 } : { meta: 0, google: 0 },
      suggestedCreatives: ['Video ads', 'Carousel ads', 'Single image ads']
    };

    // Generate UTM links for influencers
    let influencerLinks = [];
    if (platforms?.includes('influencer') && Array.isArray(influencers)) {
      influencerLinks = influencers.map(inf => {
        // inf can be an object {id, name, ...} or just an id
        const influencerId = typeof inf === 'object' ? inf.id || inf._id : inf;
        const influencerName = typeof inf === 'object' ? inf.name : String(inf);
        const utmLink = generateUTMLink({
          baseUrl,
          source: 'influencer',
          medium: 'social',
          campaign: name,
          content: influencerName.replace(/\s+/g, '_').toLowerCase(),
        });
        return { influencerId, influencerName, utmLink };
      });
    }

    // Generate UTM link for email campaign
    let emailUtmLink = '';
    if (platforms?.includes('email')) {
      emailUtmLink = generateUTMLink({
        baseUrl,
        source: 'email',
        medium: 'newsletter',
        campaign: name,
        content: 'email_campaign',
      });
    }

    const campaign = new Campaign({
      name,
      goal,
      budget,
      targetAudience,
      region,
      platforms,
      mlOptimizations,
      businessId,
      influencerLinks,
      emailUtmLink
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