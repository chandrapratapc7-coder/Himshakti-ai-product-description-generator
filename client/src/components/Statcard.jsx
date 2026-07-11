// components/StatCard.jsx
// Reusable stat number card for the Dashboard.
//
// Props:
//   icon    — emoji or icon
//   label   — card heading
//   value   — big number or text
//   sub     — small helper text below value
//   accent  — "green" | "saffron" | "blue" | "purple"
//   isLoading — bool

export default function StatCard({
  icon  = "📊",
  label = "",
  value = "—",
  sub   = "",
  accent = "green",
  isLoading = false,
}) {
  const accents = {
    green:   { bar: "#2d6a4f", bg: "#edf7f1", text: "#2d6a4f" },
    saffron: { bar: "#f4a261", bg: "#fff5ed", text: "#c05a1e" },
    blue:    { bar: "#457b9d", bg: "#eef4f8", text: "#2c5f7a" },
    purple:  { bar: "#7c3aed", bg: "#f3eeff", text: "#5b21b6" },
  };
  const a = accents[accent] || accents.green;

  return (
    <div className="sc-card" style={{ "--bar": a.bar, "--bg": a.bg, "--txt": a.text }}>
      <div className="sc-top-bar" />
      <div className="sc-body">
        <span className="sc-icon">{icon}</span>
        <div className="sc-content">
          <span className="sc-label">{label}</span>
          {isLoading
            ? <div className="sc-skeleton" />
            : <span className="sc-value">{value}</span>
          }
          {sub && !isLoading && <span className="sc-sub">{sub}</span>}
        </div>
      </div>

      <style>{`
        .sc-card {
          position: relative;
          background: #fff;
          border: 1px solid #d5e8d4;
          border-radius: 14px;
          overflow: hidden;
          padding: 1.25rem;
          box-shadow: 0 2px 10px rgba(45,106,79,.06);
          transition: transform .18s, box-shadow .18s;
        }
        .sc-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(45,106,79,.1);
        }
        .sc-top-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 4px; background: var(--bar);
        }
        .sc-body {
          display: flex; align-items: flex-start; gap: .875rem; margin-top: .25rem;
        }
        .sc-icon {
          font-size: 1.75rem; line-height: 1; flex-shrink: 0;
        }
        .sc-content { display: flex; flex-direction: column; gap: .2rem; min-width: 0; }
        .sc-label {
          font-size: .78rem; font-weight: 700; color: #6b9e82;
          text-transform: uppercase; letter-spacing: .05em;
        }
        .sc-value {
          font-size: 1.6rem; font-weight: 900; color: #1a3a2a;
          line-height: 1.1; letter-spacing: -.02em;
        }
        .sc-sub { font-size: .75rem; color: var(--txt); font-weight: 600; }
        .sc-skeleton {
          height: 1.8rem; width: 5rem; border-radius: 6px;
          background: linear-gradient(90deg, #e8f5ee 25%, #d5e8d4 50%, #e8f5ee 75%);
          background-size: 200% 100%;
          animation: sc-shimmer 1.4s infinite;
        }
        @keyframes sc-shimmer { to { background-position: -200% 0; } }
      `}</style>
    </div>
  );
}
