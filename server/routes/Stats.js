// server/routes/stats.js
// GET /api/stats — aggregates product data from MongoDB for the Dashboard.

const express = require("express");
const router  = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    // ── Total listings ─────────────────────────────────────────────────
    const total = await Product.countDocuments();

    // ── Platform breakdown ─────────────────────────────────────────────
    const platformAgg = await Product.aggregate([
      { $unwind: "$platforms" },
      { $group: { _id: "$platforms", count: { $sum: 1 } } },
      { $sort:  { count: -1 } },
    ]);

    // ── Tone breakdown ─────────────────────────────────────────────────
    const toneAgg = await Product.aggregate([
      { $group: { _id: "$tone", count: { $sum: 1 } } },
      { $sort:  { count: -1 } },
    ]);

    // ── Category breakdown ─────────────────────────────────────────────
    const categoryAgg = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort:  { count: -1 } },
    ]);

    // ── Activity by day (last 7 days) ──────────────────────────────────
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const activityAgg = await Product.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Fill missing days with 0
    const activityMap = {};
    activityAgg.forEach((d) => { activityMap[d._id] = d.count; });
    const activityByDay = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" });
      activityByDay.push({ date: key, label, count: activityMap[key] || 0 });
    }

    // ── Recent listings (last 5) ────────────────────────────────────────
    const recent = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("productName category tone platforms createdAt");

    // ── Most popular platform ──────────────────────────────────────────
    const topPlatform = platformAgg[0]?._id || "None yet";
    const topTone     = toneAgg[0]?._id     || "None yet";
    const topCategory = categoryAgg[0]?._id  || "None yet";

    res.status(200).json({
      total,
      topPlatform,
      topTone,
      topCategory,
      platformBreakdown: platformAgg.map((p) => ({ name: p._id, value: p.count })),
      toneBreakdown:     toneAgg.map((t)     => ({ name: t._id, value: t.count })),
      categoryBreakdown: categoryAgg.map((c) => ({ name: c._id, value: c.count })),
      activityByDay,
      recentListings: recent,
    });
  } catch (err) {
    console.error("GET /stats error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

module.exports = router;