// OutputEditor.jsx
// Displays AI-generated content in 6 editable sections.
// Each section has its own Copy button. A "Copy All" button at the top
// copies everything at once.
//
// Props:
//   output     — null | { title, shortDesc, longDesc, bullets[], keywords[], usage }
//   isLoading  — bool
//   onRegenerate — () => void   (calls parent to re-run generation)

import { useState, useEffect } from "react";
import Button from "./Button";
import SectionCard from "./SectionCard";

// ── Section config ──────────────────────────────────────────────────────────
const SECTIONS = [
  {
    key:   "title",
    label: "Product Title",
    icon:  "🏷️",
    rows:  2,
    tip:   "60-80 chars ideal for Amazon",
  },
  {
    key:   "shortDesc",
    label: "Short Description",
    icon:  "📝",
    rows:  3,
    tip:   "50-80 words",
  },
  {
    key:   "longDesc",
    label: "Long Description",
    icon:  "📄",
    rows:  6,
    tip:   "150-250 words",
  },
  {
    key:   "bullets",
    label: "Bullet Points",
    icon:  "✅",
    rows:  5,
    tip:   "5-7 key features",
    transform: (v) => (Array.isArray(v) ? v.join("\n") : v),
  },
  {
    key:   "keywords",
    label: "SEO Keywords",
    icon:  "🔍",
    rows:  2,
    tip:   "8-12 keywords",
    transform: (v) => (Array.isArray(v) ? v.join(", ") : v),
  },
  {
    key:   "usage",
    label: "Usage & Storage",
    icon:  "📦",
    rows:  2,
    tip:   "2-3 sentences",
  },
];

// ── Skeleton row ────────────────────────────────────────────────────────────
function Skeleton({ rows = 3 }) {
  return (
    <div className="oe-skeleton">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="oe-skeleton__bar"
          style={{ width: `${70 + (i % 3) * 10}%` }}
        />
      ))}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function OutputEditor({ output, isLoading, onRegenerate }) {
  const [copied, setCopied]   = useState("");
  const [values, setValues]   = useState({});

  // Populate editable values when output arrives
  useEffect(() => {
    if (!output) return;
    const mapped = {};
    SECTIONS.forEach(({ key, transform }) => {
      const raw = output[key] ?? "";
      mapped[key] = transform ? transform(raw) : raw;
    });
    setValues(mapped);
  }, [output]);

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(""), 2200);
    });
  };

  const copyAll = () => {
    if (!values || !Object.keys(values).length) return;
    const full = SECTIONS.map(
      (s) => `${s.label.toUpperCase()}:\n${values[s.key] ?? ""}`
    ).join("\n\n");
    copy(full, "__all__");
  };

  const charCount = (key) => (values[key] ?? "").length;

  // ── Empty state ────────────────────────────────────────────────────────
  if (!isLoading && !output) {
    return (
      <SectionCard padding="lg">
        <div className="oe-empty">
          <div className="oe-empty__icon">🏔</div>
          <h3 className="oe-empty__title">Content will appear here</h3>
          <p className="oe-empty__body">
            Fill in your product details on the left and click{" "}
            <strong>Generate Description</strong> to create AI-optimised
            content for all your platforms.
          </p>
          <div className="oe-empty__chips">
            {["Title", "Description", "Bullets", "SEO Keywords"].map((c) => (
              <span key={c} className="oe-empty__chip">{c}</span>
            ))}
          </div>
        </div>
      </SectionCard>
    );
  }

  // ── Loading state ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <SectionCard padding="md">
        <div className="oe-loading-header">
          <div className="oe-loading-spinner" />
          <div>
            <p className="oe-loading-title">Crafting your content…</p>
            <p className="oe-loading-sub">Usually takes a few seconds</p>
          </div>
        </div>
        <div className="oe-sections-list">
          {SECTIONS.map((s) => (
            <div key={s.key} className="oe-section oe-section--loading">
              <div className="oe-section__head">
                <span className="oe-section__icon">{s.icon}</span>
                <span className="oe-section__label">{s.label}</span>
              </div>
              <Skeleton rows={s.rows > 4 ? 4 : s.rows} />
            </div>
          ))}
        </div>
      </SectionCard>
    );
  }

  // ── Output state ───────────────────────────────────────────────────────
  return (
    <SectionCard padding="md">
      {/* Top bar */}
      <div className="oe-topbar">
        <div>
          <h2 className="oe-topbar__title">Generated Content</h2>
          <p className="oe-topbar__sub">Edit any section before copying</p>
        </div>
        <div className="oe-topbar__actions">
          {onRegenerate && (
            <Button variant="secondary" size="sm" onClick={onRegenerate}>
              ↺ Regenerate
            </Button>
          )}
          <Button variant="primary" size="sm" onClick={copyAll}>
            {copied === "__all__" ? "✓ Copied!" : "⎘ Copy All"}
          </Button>
        </div>
      </div>

      {/* Sections */}
      <div className="oe-sections-list">
        {SECTIONS.map((s) => {
          const val = values[s.key] ?? "";
          const isCopied = copied === s.key;
          return (
            <div key={s.key} className="oe-section">
              <div className="oe-section__head">
                <span className="oe-section__icon">{s.icon}</span>
                <span className="oe-section__label">{s.label}</span>
                <span className="oe-section__tip">{s.tip}</span>
                <span className="oe-section__chars">
                  {charCount(s.key)} chars
                </span>
                <button
                  className={`oe-copy-btn ${isCopied ? "oe-copy-btn--done" : ""}`}
                  onClick={() => copy(val, s.key)}
                  title={`Copy ${s.label}`}
                >
                  {isCopied ? "✓ Copied" : "⎘ Copy"}
                </button>
              </div>
              <textarea
                className="oe-textarea"
                rows={s.rows}
                value={val}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [s.key]: e.target.value }))
                }
              />
            </div>
          );
        })}
      </div>

      <style>{`
        /* Empty */
        .oe-empty {
          text-align:center; padding:2rem 1rem; max-width:320px; margin:0 auto;
        }
        .oe-empty__icon { font-size:3rem; margin-bottom:.75rem; }
        .oe-empty__title {
          font-size:1.05rem; font-weight:800; color:#1a3a2a; margin:0 0 .5rem;
        }
        .oe-empty__body {
          font-size:.875rem; color:#6b9e82; margin:0 0 1.25rem; line-height:1.6;
        }
        .oe-empty__chips {
          display:flex; flex-wrap:wrap; justify-content:center; gap:.4rem;
        }
        .oe-empty__chip {
          padding:.3rem .7rem; background:#edf7f1;
          border:1px solid #c8dfc8; border-radius:999px;
          font-size:.75rem; font-weight:600; color:#2d6a4f;
        }

        /* Loading */
        .oe-loading-header {
          display:flex; align-items:center; gap:.875rem;
          padding:.5rem 0 1.25rem; border-bottom:1px solid #edf7f1; margin-bottom:1rem;
        }
        .oe-loading-spinner {
          flex-shrink:0; width:2rem; height:2rem;
          border:3px solid #d5e8d4; border-top-color:#2d6a4f;
          border-radius:50%; animation:oe-spin .8s linear infinite;
        }
        .oe-loading-title {
          font-size:.95rem; font-weight:700; color:#1a3a2a; margin:0 0 .15rem;
        }
        .oe-loading-sub { font-size:.8rem; color:#6b9e82; margin:0; }

        .oe-skeleton { display:flex; flex-direction:column; gap:.5rem; padding:.1rem 0 .25rem; }
        .oe-skeleton__bar {
          height:13px; border-radius:6px;
          background:linear-gradient(90deg,#e8f5ee 25%,#d5e8d4 50%,#e8f5ee 75%);
          background-size:200% 100%;
          animation:oe-shimmer 1.4s infinite;
        }
        @keyframes oe-shimmer { to { background-position:-200% 0; } }
        @keyframes oe-spin { to { transform:rotate(360deg); } }

        /* Top bar */
        .oe-topbar {
          display:flex; align-items:flex-start; justify-content:space-between;
          gap:1rem; margin-bottom:1.25rem;
          padding-bottom:1rem; border-bottom:1px solid #edf7f1;
        }
        .oe-topbar__title {
          font-size:1.1rem; font-weight:800; color:#1a3a2a; margin:0 0 .15rem;
        }
        .oe-topbar__sub { font-size:.78rem; color:#6b9e82; margin:0; }
        .oe-topbar__actions { display:flex; gap:.5rem; flex-shrink:0; }

        /* Sections */
        .oe-sections-list { display:flex; flex-direction:column; gap:.875rem; }

        .oe-section {
          border:1.5px solid #e0ede0; border-radius:10px;
          overflow:hidden; transition:border-color .15s;
        }
        .oe-section:focus-within { border-color:#2d6a4f; }
        .oe-section--loading { border-color:#edf7f1; }

        .oe-section__head {
          display:flex; align-items:center; gap:.45rem; flex-wrap:wrap;
          padding:.5rem .75rem; background:#f7faf8;
          border-bottom:1px solid #e0ede0;
        }
        .oe-section__icon  { font-size:1rem; }
        .oe-section__label {
          font-size:.78rem; font-weight:700; color:#1a3a2a;
          text-transform:uppercase; letter-spacing:.05em;
        }
        .oe-section__tip {
          font-size:.72rem; color:#7a9e8a; font-weight:500;
          padding:.15rem .5rem; background:#edf7f1;
          border-radius:999px; margin-left:.1rem;
        }
        .oe-section__chars {
          font-size:.72rem; color:#a0b8a8; margin-left:auto;
        }
        .oe-copy-btn {
          padding:.2rem .6rem;
          font-size:.73rem; font-weight:700;
          border:1.5px solid #c8dfc8; border-radius:5px;
          background:#fff; color:#2d6a4f; cursor:pointer;
          transition:background .12s, border-color .12s, color .12s;
          flex-shrink:0;
        }
        .oe-copy-btn:hover { background:#edf7f1; border-color:#2d6a4f; }
        .oe-copy-btn--done {
          background:#2d6a4f; border-color:#2d6a4f; color:#fff;
        }

        .oe-textarea {
          width:100%; padding:.65rem .875rem;
          font-size:.875rem; font-family:inherit;
          color:#1a3a2a; background:#fff;
          border:none; outline:none; resize:vertical;
          line-height:1.6; box-sizing:border-box;
        }

        @media(max-width:520px){
          .oe-topbar { flex-direction:column; gap:.75rem; }
          .oe-topbar__actions { width:100%; }
          .oe-topbar__actions .hs-btn { flex:1; }
          .oe-section__chars { display:none; }
        }
      `}</style>
    </SectionCard>
  );
}
