// pages/Dashboard.jsx
// Real dashboard fetching live data from GET /api/stats.
// Uses recharts for bar and pie charts.
// Install recharts: npm install recharts (in client folder)

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import Navbar    from "../components/Navbar";
import Footer    from "../components/Footer";
import StatCard  from "../components/StatCard";
import Loader    from "../components/Loader";
import Button    from "../components/Button";
import { useToast } from "../components/Toast";

// ── Colour palettes ───────────────────────────────────────────────────────
const PLATFORM_COLORS = {
  Amazon:    "#ff9900",
  Flipkart:  "#2874f0",
  Meesho:    "#9c27b0",
  Instagram: "#e1306c",
  WhatsApp:  "#25d366",
  D2C:       "#2d6a4f",
};

const TONE_COLORS = {
  Premium:         "#f4a261",
  Traditional:     "#457b9d",
  "Health-focused": "#2d6a4f",
};

const PIE_FALLBACK = ["#2d6a4f", "#f4a261", "#457b9d", "#7c3aed", "#e1306c"];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

// ── Custom Tooltip for bar chart ──────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff", border: "1px solid #d5e8d4", borderRadius: 8,
      padding: ".5rem .875rem", boxShadow: "0 4px 12px rgba(45,106,79,.12)",
    }}>
      <p style={{ margin: 0, fontSize: ".8rem", fontWeight: 700, color: "#1a3a2a" }}>{label}</p>
      <p style={{ margin: 0, fontSize: ".85rem", color: "#2d6a4f" }}>
        {payload[0].value} listing{payload[0].value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────
export default function Dashboard() {
  const [stats,     setStats]     = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res  = await fetch("http://localhost:5000/api/stats");
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
      showToast("Failed to load dashboard data. Is the backend running?", "error", 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dash-page">
      <Navbar />

      <main className="dash-main">
        <div className="dash-inner">

          {/* ── Header ── */}
          <div className="dash-header">
            <div>
              <span className="page-eyebrow">Overview</span>
              <h1 className="page-title">Dashboard</h1>
              <p className="page-subtitle">
                Live stats from your MongoDB database
              </p>
            </div>
            <div className="dash-header__actions">
              <button className="dash-refresh-btn" onClick={fetchStats} disabled={isLoading}>
                {isLoading ? "⟳ Refreshing..." : "⟳ Refresh"}
              </button>
              <Link to="/generator">
                <Button variant="primary" size="sm">✦ Generate New</Button>
              </Link>
            </div>
          </div>

          {/* ── Error ── */}
          {error && (
            <div className="dash-error">
              ❌ <strong>Could not load stats:</strong> {error}
              <br /><small>Make sure the backend server is running on port 5000.</small>
            </div>
          )}

          {/* ── Stat Cards ── */}
          <div className="dash-stats-grid">
            <StatCard
              icon="📦"
              label="Total Listings"
              value={isLoading ? "—" : stats?.total ?? 0}
              sub="saved in database"
              accent="green"
              isLoading={isLoading}
            />
            <StatCard
              icon="🏆"
              label="Top Platform"
              value={isLoading ? "—" : stats?.topPlatform ?? "None yet"}
              sub="most used platform"
              accent="saffron"
              isLoading={isLoading}
            />
            <StatCard
              icon="🎨"
              label="Favourite Tone"
              value={isLoading ? "—" : stats?.topTone ?? "None yet"}
              sub="most selected tone"
              accent="blue"
              isLoading={isLoading}
            />
            <StatCard
              icon="🗂️"
              label="Top Category"
              value={isLoading ? "—" : stats?.topCategory ?? "None yet"}
              sub="most generated category"
              accent="purple"
              isLoading={isLoading}
            />
          </div>

          {/* ── Charts row ── */}
          {!isLoading && stats && (
            <div className="dash-charts-row">

              {/* Activity bar chart */}
              <div className="dash-chart-card">
                <h2 className="dash-chart__title">📈 Activity — Last 7 Days</h2>
                <p className="dash-chart__sub">Listings generated per day</p>
                <div className="dash-chart__wrap">
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={stats.activityByDay} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#edf7f1" />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: "#6b9e82", fontFamily: "Inter, system-ui" }}
                        axisLine={false} tickLine={false}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: "#6b9e82", fontFamily: "Inter, system-ui" }}
                        axisLine={false} tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" fill="#2d6a4f" radius={[5, 5, 0, 0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Platform pie chart */}
              <div className="dash-chart-card">
                <h2 className="dash-chart__title">📱 Platform Breakdown</h2>
                <p className="dash-chart__sub">Distribution across platforms</p>
                {stats.platformBreakdown.length === 0 ? (
                  <div className="dash-chart__empty">No platform data yet</div>
                ) : (
                  <div className="dash-chart__wrap">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={stats.platformBreakdown}
                          cx="50%" cy="50%"
                          innerRadius={50} outerRadius={85}
                          paddingAngle={3}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                          fontSize={11}
                        >
                          {stats.platformBreakdown.map((entry, i) => (
                            <Cell
                              key={entry.name}
                              fill={PLATFORM_COLORS[entry.name] || PIE_FALLBACK[i % PIE_FALLBACK.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v) => [`${v} listings`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Second charts row ── */}
          {!isLoading && stats && (
            <div className="dash-charts-row">

              {/* Tone breakdown */}
              <div className="dash-chart-card">
                <h2 className="dash-chart__title">🎨 Tone Breakdown</h2>
                <p className="dash-chart__sub">Writing tone distribution</p>
                {stats.toneBreakdown.length === 0 ? (
                  <div className="dash-chart__empty">No tone data yet</div>
                ) : (
                  <div className="dash-chart__wrap">
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart
                        data={stats.toneBreakdown}
                        layout="vertical"
                        margin={{ top: 8, right: 24, left: 20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#edf7f1" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 11, fill: "#6b9e82" }} axisLine={false} tickLine={false} />
                        <YAxis
                          type="category" dataKey="name"
                          tick={{ fontSize: 11, fill: "#1a3a2a", fontWeight: 600 }}
                          axisLine={false} tickLine={false} width={100}
                        />
                        <Tooltip formatter={(v) => [`${v} listings`, ""]} />
                        <Bar dataKey="value" radius={[0, 5, 5, 0]} maxBarSize={30}>
                          {stats.toneBreakdown.map((entry) => (
                            <Cell
                              key={entry.name}
                              fill={TONE_COLORS[entry.name] || "#2d6a4f"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Category breakdown */}
              <div className="dash-chart-card">
                <h2 className="dash-chart__title">🗂️ Category Breakdown</h2>
                <p className="dash-chart__sub">Products by category</p>
                {stats.categoryBreakdown.length === 0 ? (
                  <div className="dash-chart__empty">No category data yet</div>
                ) : (
                  <div className="dash-chart__wrap">
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart
                        data={stats.categoryBreakdown}
                        layout="vertical"
                        margin={{ top: 8, right: 24, left: 20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#edf7f1" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 11, fill: "#6b9e82" }} axisLine={false} tickLine={false} />
                        <YAxis
                          type="category" dataKey="name"
                          tick={{ fontSize: 11, fill: "#1a3a2a", fontWeight: 600 }}
                          axisLine={false} tickLine={false} width={130}
                        />
                        <Tooltip formatter={(v) => [`${v} listings`, ""]} />
                        <Bar dataKey="value" fill="#457b9d" radius={[0, 5, 5, 0]} maxBarSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Loading skeleton ── */}
          {isLoading && (
            <div className="dash-loading">
              <Loader type="spinner" size="md" text="Loading dashboard data..." />
            </div>
          )}

          {/* ── Recent Listings ── */}
          {!isLoading && stats?.recentListings?.length > 0 && (
            <div className="dash-recent">
              <div className="dash-recent__header">
                <h2 className="dash-chart__title">🕒 Recent Listings</h2>
                <Link to="/saved" className="dash-recent__viewall">View All →</Link>
              </div>
              <div className="dash-recent__list">
                {stats.recentListings.map((p, i) => (
                  <div key={p._id} className="dash-recent__item">
                    <span className="dash-recent__num">{i + 1}</span>
                    <div className="dash-recent__info">
                      <span className="dash-recent__name">{p.productName}</span>
                      <span className="dash-recent__meta">
                        {p.category} · {p.tone} · {formatDate(p.createdAt)}
                      </span>
                    </div>
                    <div className="dash-recent__platforms">
                      {(p.platforms || []).slice(0, 3).map((pl) => (
                        <span
                          key={pl}
                          className="dash-recent__pill"
                          style={{
                            background: (PLATFORM_COLORS[pl] || "#ccc") + "20",
                            color: PLATFORM_COLORS[pl] || "#555",
                            border: `1px solid ${PLATFORM_COLORS[pl] || "#ccc"}`,
                          }}
                        >
                          {pl}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Empty state ── */}
          {!isLoading && !error && stats?.total === 0 && (
            <div className="dash-empty">
              <span className="dash-empty__icon">📊</span>
              <h2 className="dash-empty__title">No data yet</h2>
              <p className="dash-empty__body">
                Generate and save a few product descriptions to see your dashboard come to life.
              </p>
              <Link to="/generator">
                <Button variant="primary">✦ Generate Your First Listing</Button>
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />

      <style>{`
        .dash-page {
          min-height:100vh; display:flex; flex-direction:column;
          background:#f4f9f6; font-family:'Inter','Segoe UI',system-ui,sans-serif;
        }
        .dash-main { flex:1; padding:2rem 1.5rem 3rem; }
        .dash-inner { max-width:1200px; margin:0 auto; }

        /* Header */
        .dash-header {
          display:flex; justify-content:space-between; align-items:flex-start;
          flex-wrap:wrap; gap:1rem; margin-bottom:2rem;
        }
        .dash-header__actions { display:flex; gap:.75rem; align-items:center; }
        .page-eyebrow {
          display:inline-block; font-size:.75rem; font-weight:700;
          letter-spacing:.08em; text-transform:uppercase; color:#2d6a4f;
          background:#e0f2e9; padding:.25rem .75rem; border-radius:999px; margin-bottom:.6rem;
        }
        .page-title {
          font-size:clamp(1.6rem,4vw,2.2rem); font-weight:900; color:#1a3a2a;
          margin:0 0 .4rem; letter-spacing:-.02em;
        }
        .page-subtitle { font-size:.9rem; color:#6b9e82; margin:0; }

        .dash-refresh-btn {
          padding:.45rem 1rem; background:#fff; border:1.5px solid #d5e8d4;
          border-radius:8px; font-size:.85rem; font-weight:700; color:#2d6a4f;
          cursor:pointer; transition:background .14s;
          font-family:inherit;
        }
        .dash-refresh-btn:hover:not(:disabled) { background:#edf7f1; }
        .dash-refresh-btn:disabled { opacity:.6; cursor:not-allowed; }

        /* Error */
        .dash-error {
          background:#fff8f8; border:1px solid #f4b8b5; border-radius:10px;
          padding:1rem 1.25rem; margin-bottom:1.5rem;
          font-size:.875rem; color:#c0392b; line-height:1.6;
        }

        /* Stat cards */
        .dash-stats-grid {
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:1.25rem; margin-bottom:1.5rem;
        }

        /* Charts */
        .dash-charts-row {
          display:grid; grid-template-columns:1fr 1fr;
          gap:1.25rem; margin-bottom:1.5rem;
        }
        .dash-chart-card {
          background:#fff; border:1px solid #d5e8d4; border-radius:14px;
          padding:1.5rem; box-shadow:0 2px 10px rgba(45,106,79,.06);
        }
        .dash-chart__title {
          font-size:1rem; font-weight:800; color:#1a3a2a; margin:0 0 .2rem;
        }
        .dash-chart__sub { font-size:.78rem; color:#6b9e82; margin:0 0 1rem; }
        .dash-chart__wrap { width:100%; }
        .dash-chart__empty {
          text-align:center; padding:3rem 0;
          font-size:.875rem; color:#a0b8a8;
        }

        /* Loading */
        .dash-loading { display:flex; justify-content:center; padding:4rem 0; }

        /* Recent listings */
        .dash-recent {
          background:#fff; border:1px solid #d5e8d4; border-radius:14px;
          padding:1.5rem; box-shadow:0 2px 10px rgba(45,106,79,.06);
          margin-bottom:1.5rem;
        }
        .dash-recent__header {
          display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;
        }
        .dash-recent__viewall {
          font-size:.82rem; font-weight:700; color:#2d6a4f; text-decoration:none;
        }
        .dash-recent__viewall:hover { text-decoration:underline; }
        .dash-recent__list { display:flex; flex-direction:column; gap:.625rem; }
        .dash-recent__item {
          display:flex; align-items:center; gap:1rem;
          padding:.75rem 1rem; background:#f7faf8; border:1px solid #edf7f1;
          border-radius:10px; transition:background .14s;
        }
        .dash-recent__item:hover { background:#edf7f1; }
        .dash-recent__num {
          flex-shrink:0; width:1.5rem; height:1.5rem;
          background:#2d6a4f; color:#fff; border-radius:50%;
          font-size:.72rem; font-weight:800;
          display:flex; align-items:center; justify-content:center;
        }
        .dash-recent__info { flex:1; min-width:0; }
        .dash-recent__name {
          display:block; font-size:.9rem; font-weight:700; color:#1a3a2a;
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
        }
        .dash-recent__meta { font-size:.75rem; color:#6b9e82; }
        .dash-recent__platforms { display:flex; gap:.35rem; flex-wrap:wrap; }
        .dash-recent__pill {
          font-size:.68rem; font-weight:700; padding:.15rem .5rem;
          border-radius:999px;
        }

        /* Empty */
        .dash-empty {
          text-align:center; padding:3rem 2rem;
          background:#fff; border:1.5px dashed #b5d9c5; border-radius:14px;
        }
        .dash-empty__icon { font-size:3rem; display:block; margin-bottom:1rem; }
        .dash-empty__title { font-size:1.15rem; font-weight:800; color:#1a3a2a; margin:0 0 .5rem; }
        .dash-empty__body {
          font-size:.9rem; color:#6b9e82; max-width:380px;
          margin:0 auto 1.5rem; line-height:1.7;
        }

        /* Responsive */
        @media(max-width:1024px){
          .dash-stats-grid { grid-template-columns:1fr 1fr; }
        }
        @media(max-width:768px){
          .dash-charts-row { grid-template-columns:1fr; }
        }
        @media(max-width:480px){
          .dash-stats-grid { grid-template-columns:1fr; }
          .dash-main { padding:1.5rem 1rem 2rem; }
          .dash-header { flex-direction:column; }
        }
      `}</style>
    </div>
  );
}
