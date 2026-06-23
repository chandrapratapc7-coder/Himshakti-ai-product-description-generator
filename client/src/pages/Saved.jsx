// pages/Saved.jsx
// Shows all saved product description listings from localStorage.
// Each card can be expanded to view full content, or deleted.

import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useSavedListings } from "../hooks/useLocalStorage";

// Platform colour map (matches PlatformSelector / PreviewCard)
const PLATFORM_COLORS = {
  Amazon:    "#ff9900",
  Flipkart:  "#2874f0",
  Meesho:    "#9c27b0",
  Instagram: "#e1306c",
  WhatsApp:  "#25d366",
  D2C:       "#2d6a4f",
};

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ── Single listing card ──────────────────────────────────────────────────
function ListingCard({ listing, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { formData, output, savedAt } = listing;

  const copyAll = () => {
    if (!output) return;
    const text = [
      `TITLE:\n${output.title}`,
      `\nSHORT DESCRIPTION:\n${output.shortDesc}`,
      `\nLONG DESCRIPTION:\n${output.longDesc}`,
      `\nBULLET POINTS:\n${(output.bullets || []).join("\n")}`,
      `\nSEO KEYWORDS:\n${(output.keywords || []).join(", ")}`,
      `\nUSAGE:\n${output.usage}`,
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="sl-card">
      {/* Header */}
      <div className="sl-card__header">
        <div className="sl-card__heading">
          <h3 className="sl-card__title">{formData.productName}</h3>
          <span className="sl-card__date">Saved {formatDate(savedAt)}</span>
        </div>
        <div className="sl-card__meta">
          <span className="sl-chip">{formData.category}</span>
          <span className="sl-chip">{formData.weight}</span>
          <span className="sl-chip sl-chip--tone">{formData.tone}</span>
        </div>
      </div>

      {/* Platforms */}
      <div className="sl-platforms">
        {(formData.platforms || []).map((p) => (
          <span
            key={p}
            className="sl-platform-pill"
            style={{
              borderColor: PLATFORM_COLORS[p] || "#ccc",
              color: PLATFORM_COLORS[p] || "#555",
              background: (PLATFORM_COLORS[p] || "#ccc") + "14",
            }}
          >
            {p}
          </span>
        ))}
      </div>

      {/* Preview text (collapsed) */}
      {!expanded && output && (
        <p className="sl-preview">{output.shortDesc}</p>
      )}

      {/* Full content (expanded) */}
      {expanded && output && (
        <div className="sl-full">
          <div className="sl-section">
            <span className="sl-section__label">Title</span>
            <p className="sl-section__text">{output.title}</p>
          </div>
          <div className="sl-section">
            <span className="sl-section__label">Short Description</span>
            <p className="sl-section__text">{output.shortDesc}</p>
          </div>
          <div className="sl-section">
            <span className="sl-section__label">Long Description</span>
            <p className="sl-section__text">{output.longDesc}</p>
          </div>
          <div className="sl-section">
            <span className="sl-section__label">Bullet Points</span>
            <ul className="sl-bullets">
              {(output.bullets || []).map((b, i) => (
                <li key={i}>{b.replace(/^✔\s*/, "")}</li>
              ))}
            </ul>
          </div>
          <div className="sl-section">
            <span className="sl-section__label">SEO Keywords</span>
            <div className="sl-keywords">
              {(output.keywords || []).map((k) => (
                <span key={k} className="sl-keyword">{k}</span>
              ))}
            </div>
          </div>
          <div className="sl-section">
            <span className="sl-section__label">Usage &amp; Storage</span>
            <p className="sl-section__text">{output.usage}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="sl-actions">
        <Button variant="secondary" size="sm" onClick={() => setExpanded((e) => !e)}>
          {expanded ? "▲ Hide Details" : "▼ View Full Content"}
        </Button>
        <Button variant="primary" size="sm" onClick={copyAll}>
          {copied ? "✓ Copied!" : "⎘ Copy All"}
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(listing.id)}>
          🗑 Delete
        </Button>
      </div>

      <style>{`
        .sl-card {
          background: #fff; border: 1px solid #d5e8d4; border-radius: 14px;
          padding: 1.25rem 1.5rem; box-shadow: 0 2px 10px rgba(45,106,79,.06);
        }
        .sl-card__header {
          display: flex; justify-content: space-between; align-items: flex-start;
          flex-wrap: wrap; gap: .75rem; margin-bottom: .75rem;
        }
        .sl-card__heading { display: flex; flex-direction: column; gap: .15rem; }
        .sl-card__title { font-size: 1.05rem; font-weight: 800; color: #1a3a2a; margin: 0; }
        .sl-card__date  { font-size: .75rem; color: #a0b8a8; }
        .sl-card__meta  { display: flex; gap: .4rem; flex-wrap: wrap; }
        .sl-chip {
          font-size: .72rem; font-weight: 700; color: #4a7c5e;
          background: #edf7f1; border: 1px solid #d5e8d4;
          padding: .2rem .6rem; border-radius: 999px;
        }
        .sl-chip--tone { color: #2d6a4f; background: #e0f2e9; }

        .sl-platforms { display: flex; gap: .4rem; flex-wrap: wrap; margin-bottom: .75rem; }
        .sl-platform-pill {
          font-size: .72rem; font-weight: 700; padding: .2rem .65rem;
          border-radius: 999px; border: 1.5px solid;
        }

        .sl-preview {
          font-size: .875rem; color: #4a7c5e; line-height: 1.6;
          margin: 0 0 1rem;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .sl-full { display: flex; flex-direction: column; gap: .875rem; margin-bottom: 1rem; }
        .sl-section { border-top: 1px solid #edf7f1; padding-top: .75rem; }
        .sl-section:first-child { border-top: none; padding-top: 0; }
        .sl-section__label {
          display: block; font-size: .72rem; font-weight: 800; color: #2d6a4f;
          text-transform: uppercase; letter-spacing: .06em; margin-bottom: .3rem;
        }
        .sl-section__text { font-size: .85rem; color: #1a3a2a; line-height: 1.7; margin: 0; }
        .sl-bullets { margin: 0; padding-left: 1.1rem; font-size: .85rem; color: #1a3a2a; line-height: 1.7; }
        .sl-keywords { display: flex; flex-wrap: wrap; gap: .4rem; }
        .sl-keyword {
          font-size: .75rem; color: #2d6a4f; background: #edf7f1;
          border: 1px solid #d5e8d4; padding: .15rem .55rem; border-radius: 999px;
        }

        .sl-actions { display: flex; gap: .5rem; flex-wrap: wrap; }

        @media (max-width: 480px) {
          .sl-actions { flex-direction: column; }
          .sl-actions .hs-btn { width: 100%; }
        }
      `}</style>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────
export default function Saved() {
  const { listings, deleteListing, clearAll } = useSavedListings();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClearAll = () => {
    if (confirmClear) {
      clearAll();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  return (
    <div className="saved-page">
      <Navbar />

      <main className="saved-main">
        <div className="saved-inner">
          {/* Header */}
          <div className="saved-header">
            <div>
              <span className="page-eyebrow">Your Library</span>
              <h1 className="page-title">Saved Listings</h1>
              <p className="page-subtitle">
                {listings.length === 0
                  ? "Generated descriptions you save will appear here."
                  : `You have ${listings.length} saved listing${listings.length > 1 ? "s" : ""}.`}
              </p>
            </div>
            {listings.length > 0 && (
              <Button variant="danger" size="sm" onClick={handleClearAll}>
                {confirmClear ? "Click again to confirm" : "🗑 Clear All"}
              </Button>
            )}
          </div>

          {/* Empty state */}
          {listings.length === 0 ? (
            <div className="saved-empty">
              <span className="saved-empty__icon">💾</span>
              <h2 className="saved-empty__title">No saved listings yet</h2>
              <p className="saved-empty__body">
                Generate a product description and click <strong>Save Listing</strong> to
                keep it here for later — no account needed, it's stored right in your browser.
              </p>
              <Link to="/generator" className="saved-empty__link">
                <Button variant="primary">✦ Go to Generator</Button>
              </Link>
            </div>
          ) : (
            <div className="saved-list">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onDelete={deleteListing}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        .saved-page {
          min-height: 100vh; display: flex; flex-direction: column;
          background: #f4f9f6; font-family: 'Inter','Segoe UI',system-ui,sans-serif;
        }
        .saved-main { flex: 1; padding: 2.5rem 1.5rem; }
        .saved-inner { max-width: 900px; margin: 0 auto; }

        .saved-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;
        }
        .page-eyebrow {
          display: inline-block; font-size: .75rem; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase; color: #2d6a4f;
          background: #e0f2e9; padding: .25rem .75rem; border-radius: 999px; margin-bottom: .6rem;
        }
        .page-title {
          font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 900; color: #1a3a2a;
          margin: 0 0 .4rem; letter-spacing: -.02em;
        }
        .page-subtitle { font-size: .9rem; color: #6b9e82; margin: 0; }

        .saved-list { display: flex; flex-direction: column; gap: 1.25rem; }

        /* Empty state */
        .saved-empty {
          text-align: center; padding: 3.5rem 2rem;
          background: #fff; border: 1.5px dashed #b5d9c5; border-radius: 14px;
        }
        .saved-empty__icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
        .saved-empty__title { font-size: 1.15rem; font-weight: 800; color: #1a3a2a; margin: 0 0 .6rem; }
        .saved-empty__body {
          font-size: .9rem; color: #6b9e82; max-width: 420px;
          margin: 0 auto 1.5rem; line-height: 1.7;
        }
        .saved-empty__link { display: inline-block; }

        @media (max-width: 480px) {
          .saved-main { padding: 1.5rem 1rem; }
        }
      `}</style>
    </div>
  );
}
