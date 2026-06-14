// pages/Dashboard.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STAT_CARDS = [
  { icon: "⚡", label: "Total Generated",   value: "0",   note: "descriptions so far"   },
  { icon: "💾", label: "Saved Listings",    value: "0",   note: "in local storage"       },
  { icon: "📱", label: "Platforms Used",    value: "—",   note: "connect and generate"   },
  { icon: "🎨", label: "Favourite Tone",    value: "—",   note: "based on your usage"    },
];

export default function Dashboard() {
  return (
    <div className="dash-page">
      <Navbar />

      <main className="dash-main">
        <div className="dash-inner">

          {/* Page heading */}
          <div className="page-header">
            <span className="page-eyebrow">Overview</span>
            <h1 className="page-title">Your Dashboard</h1>
            <p className="page-subtitle">
              Track your generation history, saved listings, and usage statistics.
              This section will be fully built in Week 6.
            </p>
          </div>

          {/* Stat cards */}
          <div className="dash-stats">
            {STAT_CARDS.map((s) => (
              <div key={s.label} className="dash-stat-card">
                <span className="dash-stat__icon">{s.icon}</span>
                <span className="dash-stat__value">{s.value}</span>
                <span className="dash-stat__label">{s.label}</span>
                <span className="dash-stat__note">{s.note}</span>
              </div>
            ))}
          </div>

          {/* Coming soon placeholder */}
          <div className="dash-placeholder">
            <div className="dash-placeholder__icon">📊</div>
            <h2 className="dash-placeholder__title">Dashboard Coming in Week 6</h2>
            <p className="dash-placeholder__body">
              This page will show your full generation history, charts of platform usage,
              tone preferences, and saved listing counts — all pulled from LocalStorage.
              Start generating descriptions now to populate your stats.
            </p>
            <a href="/generator" className="dash-placeholder__btn">
              ✦ Go to Generator
            </a>
          </div>

        </div>
      </main>

      <Footer />

      <style>{`
        .dash-page {
          min-height: 100vh; display: flex; flex-direction: column;
          background: #f4f9f6;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }
        .dash-main { flex: 1; padding: 3rem 1.5rem; }
        .dash-inner { max-width: 1100px; margin: 0 auto; }

        /* Header */
        .page-header { text-align: center; margin-bottom: 2.5rem; }
        .page-eyebrow {
          display: inline-block; font-size: .75rem; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase; color: #2d6a4f;
          background: #e0f2e9; padding: .25rem .75rem;
          border-radius: 999px; margin-bottom: .75rem;
        }
        .page-title {
          font-size: clamp(1.6rem, 4vw, 2.2rem); font-weight: 900;
          color: #1a3a2a; margin: 0 0 .75rem; letter-spacing: -.02em;
        }
        .page-subtitle {
          font-size: .95rem; color: #4a7c5e;
          max-width: 520px; margin: 0 auto; line-height: 1.65;
        }

        /* Stat cards */
        .dash-stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem; margin-bottom: 2rem;
        }
        .dash-stat-card {
          background: #fff; border: 1px solid #d5e8d4;
          border-top: 4px solid #2d6a4f;
          border-radius: 12px; padding: 1.25rem;
          text-align: center;
          box-shadow: 0 2px 8px rgba(45,106,79,.06);
        }
        .dash-stat__icon  { display: block; font-size: 1.5rem; margin-bottom: .5rem; }
        .dash-stat__value {
          display: block; font-size: 2rem; font-weight: 900;
          color: #1a3a2a; line-height: 1; margin-bottom: .25rem;
        }
        .dash-stat__label {
          display: block; font-size: .8rem; font-weight: 700;
          color: #2d6a4f; margin-bottom: .2rem;
        }
        .dash-stat__note { font-size: .72rem; color: #7a9e8a; }

        /* Placeholder */
        .dash-placeholder {
          background: #fff; border: 1.5px dashed #b5d9c5;
          border-radius: 14px; padding: 3rem 2rem;
          text-align: center;
        }
        .dash-placeholder__icon { font-size: 3rem; margin-bottom: 1rem; }
        .dash-placeholder__title {
          font-size: 1.2rem; font-weight: 800; color: #1a3a2a; margin: 0 0 .75rem;
        }
        .dash-placeholder__body {
          font-size: .9rem; color: #4a7c5e; max-width: 480px;
          margin: 0 auto 1.5rem; line-height: 1.7;
        }
        .dash-placeholder__btn {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .65rem 1.5rem;
          background: #2d6a4f; color: #fff;
          font-size: .9rem; font-weight: 700;
          border-radius: 9px; text-decoration: none;
          transition: background .14s, transform .12s;
        }
        .dash-placeholder__btn:hover { background: #1b4d38; transform: translateY(-1px); }

        @media (max-width: 768px) {
          .dash-stats { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .dash-stats { grid-template-columns: 1fr; }
          .dash-main { padding: 2rem 1rem; }
        }
      `}</style>
    </div>
  );
}
