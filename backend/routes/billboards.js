const express = require('express');
const BillboardAttribution = require('../models/BillboardAttribution');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Get all billboard attributions
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const attributions = await BillboardAttribution.find()
      .populate('campaignId', 'name')
      .sort({ createdAt: -1 });
    res.json(attributions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create billboard attribution
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { billboardId, location, campaignId } = req.body;

    const attribution = new BillboardAttribution({
      billboardId,
      location,
      campaignId
    });

    await attribution.save();
    res.status(201).json(attribution);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Track conversion
router.post('/:id/conversion', async (req, res) => {
  try {
    const { userLocation } = req.body;
    const attribution = await BillboardAttribution.findById(req.params.id);

    if (!attribution) {
      return res.status(404).json({ message: 'Billboard not found' });
    }

    // Calculate distance using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Earth's radius in kilometers
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    };

    const distance = calculateDistance(
      userLocation.lat, userLocation.lng,
      attribution.location.lat, attribution.location.lng
    );

    if (distance <= attribution.radius / 1000) { // Convert meters to km
      attribution.conversions += 1;
      await attribution.save();
      res.json({ attributed: true, distance });
    } else {
      res.json({ attributed: false, distance });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;