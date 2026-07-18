const express = require('express');
const GeneratedDescription = require('../models/GeneratedDescription');
const { protect } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

// --- GET /api/dashboard/stats ---
// Returns aggregated stats for the logged-in user's Recharts dashboard
router.get('/stats', protect, apiLimiter, async (req, res) => {
  try {
    const userId = req.user._id;

    const [byPlatform, byTone, byCategory, last7Days, totals] = await Promise.all([
      GeneratedDescription.aggregate([
        { $match: { user: userId } },
        { $unwind: '$platform' },
        { $group: { _id: '$platform', count: { $sum: 1 } } },
        { $project: { _id: 0, platform: '$_id', count: 1 } },
      ]),
      GeneratedDescription.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$tone', count: { $sum: 1 } } },
        { $project: { _id: 0, tone: '$_id', count: 1 } },
      ]),
      GeneratedDescription.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { _id: 0, category: '$_id', count: 1 } },
      ]),
      GeneratedDescription.aggregate([
        {
          $match: {
            user: userId,
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, date: '$_id', count: 1 } },
      ]),
      GeneratedDescription.countDocuments({ user: userId }),
    ]);

    res.status(200).json({
      success: true,
      data: { totalGenerated: totals, byPlatform, byTone, byCategory, last7Days },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load stats', error: err.message });
  }
});

module.exports = router;
