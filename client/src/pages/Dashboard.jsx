// pages/Dashboard.jsx
// Authenticated user dashboard — stats fetched via GET /api/dashboard/stats.
// Matches HimShakti real pattern: Navbar/Footer, inline <style>, CSS variable palette.

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import Navbar        from "../components/Navbar";
import Footer         from "../components/Footer";
import Button          from "../components/Button";
import Loader          from "../components/Loader";
import { useToast }    from "../components/Toast";
import { getDashboardStats } from "../services/api";

const CHART_COLORS = ["#2d6a4f", "#f4a261", "#457b9d", "#8a5a1a", "#6b9e82", "#c0392b"];

export default function Dashboard() {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const { showToast } = useToast();

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getDashboardStats();
      setStats(data.data);
    } catch (err) {
      const message = err?.response?.data?.message || "Could not load dashboard stats";
      setError(message);
      showToast(message, "error", 5000);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return (
    <div className="dash-page">
      <Navbar />
      <main className="dash-main">
        <div className="dash-inner">

          {/* Header */}
          <div className="dash-header">
            <div>
              <span className="page-eyebrow">Your Activity</span>
              <h1 className="page-title">Dashboard</h1>
              <p className="page-subtitle">
                {loading
                  ? "Loading your stats..."
                  : stats
                    ? `You've generated ${stats.totalGenerated} description${stats.totalGenerated !== 1 ? "s" : ""} so far.`
                    : "Your generation activity at a glance."}
              </p>
            </div>
            <Link to="/generator">
              <Button variant="primary" size="sm">✦ Generate New</Button>
            </Link>
          </div>

          {/* Loading */}
          {loading && (
            <div className="dash-loading">
              <Loader type="spinner" size="md" text="Loading dashboard..." />
            </div>
          )}

          {/* Error state */}
          {!loading && error && !stats && (
            <div className="dash-placeholder">
              <span className="dash-placeholder__icon">⚠️</span>
              <h2 className="dash-placeholder__title">Couldn't load your stats</h2>
              <p className="dash-placeholder__body">{error}</p>
              <Button variant="primary" onClick={fetchStats}>↻ Try Again</Button>
            </div>
          )}

          {/* Empty state — no generations yet */}
          {!loading && !error && stats && stats.totalGenerated === 0 && (
            <div className="dash-placeholder">
              <span className="dash-placeholder__icon">📊</span>
              <h2 className="dash-placeholder__title">No descriptions generated yet</h2>
              <p className="dash-placeholder__body">
                Head to the Generator to create your first AI product description —
                your stats will appear here once you do.
              </p>
              <Link to="/generator">
                <Button variant="primary">✦ Go to Generator</Button>
              </Link>
            </div>
          )}

          {/* Charts */}
          {!loading && !error && stats && stats.totalGenerated > 0 && (
            <div className="dash-grid">

              <div className="dash-stat-card">
                <h2 className="dash-stat__label">Activity (Last 7 Days)</h2>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={stats.last7Days}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d5e8d4" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6b9e82" />
                    <YAxis allowDecimals={false} stroke="#6b9e82" />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#2d6a4f" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="dash-stat-card">
                <h2 className="dash-stat__label">By Platform</h2>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={stats.byPlatform}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d5e8d4" />
                    <XAxis dataKey="platform" tick={{ fontSize: 12 }} stroke="#6b9e82" />
                    <YAxis allowDecimals={false} stroke="#6b9e82" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#f4a261" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="dash-stat-card">
                <h2 className="dash-stat__label">By Tone</h2>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={stats.byTone}
                      dataKey="count"
                      nameKey="tone"
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      label
                    >
                      {stats.byTone.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="dash-stat-card">
                <h2 className="dash-stat__label">By Category</h2>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={stats.byCategory} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#d5e8d4" />
                    <XAxis type="number" allowDecimals={false} stroke="#6b9e82" />
                    <YAxis dataKey="category" type="category" tick={{ fontSize: 12 }} stroke="#6b9e82" width={90} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#457b9d" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
          )}

        </div>
      </main>
      <Footer />

      <style>{`
        .dash-page {
          min-height: 100vh; display: flex; flex-direction: column;
          background: var(--color-bg, #f4f9f6);
          font-family: var(--font-family, 'Inter','Segoe UI',system-ui,sans-serif);
        }
        .dash-main  { flex: 1; padding: 2.5rem 1.5rem; }
        .dash-inner { max-width: 1100px; margin: 0 auto; }

        .dash-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          flex-wrap: wrap; gap: 1rem; margin-bottom: 1.75rem;
        }
        .page-eyebrow {
          display: inline-block; font-size: .75rem; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase; color: #2d6a4f;
          background: #e0f2e9; padding: .25rem .75rem; border-radius: 999px;
          margin-bottom: .6rem;
        }
        .page-title {
          font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 900; color: #1a3a2a;
          margin: 0 0 .4rem; letter-spacing: -.02em;
        }
        .page-subtitle { font-size: .9rem; color: #6b9e82; margin: 0; }

        .dash-loading { display: flex; justify-content: center; padding: 4rem 0; }

        .dash-placeholder {
          text-align: center; padding: 3.5rem 2rem;
          background: #fff; border: 1.5px dashed #b5d9c5; border-radius: 14px;
        }
        .dash-placeholder__icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
        .dash-placeholder__title { font-size: 1.15rem; font-weight: 800; color: #1a3a2a; margin: 0 0 .6rem; }
        .dash-placeholder__body {
          font-size: .9rem; color: #6b9e82; max-width: 420px;
          margin: 0 auto 1.5rem; line-height: 1.7;
        }

        .dash-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;
        }
        .dash-stat-card {
          background: #fff; border: 1px solid #d5e8d4; border-top: 3px solid #2d6a4f;
          border-radius: 14px; padding: 1.25rem 1.5rem;
          box-shadow: 0 2px 10px rgba(45,106,79,.06);
        }
        .dash-stat__label {
          font-size: 1rem; font-weight: 800; color: #1a3a2a; margin: 0 0 1rem;
        }
        .dash-stat__value { font-size: 1.5rem; font-weight: 900; color: #1a3a2a; }
        .dash-stat__note  { font-size: .8rem; color: #6b9e82; }

        /* ── Responsive pass: 768px / 375px ── */
        @media (max-width: 768px) {
          .dash-main  { padding: 2rem 1.25rem; }
          .dash-grid  { grid-template-columns: 1fr; gap: 1.25rem; }
          .dash-header { flex-direction: column; align-items: stretch; }
        }
        @media (max-width: 375px) {
          .dash-main  { padding: 1.5rem 1rem; }
          .dash-stat-card { padding: 1rem; }
          .dash-stat__label { font-size: .9rem; }
        }
      `}</style>
    </div>
  );
}
