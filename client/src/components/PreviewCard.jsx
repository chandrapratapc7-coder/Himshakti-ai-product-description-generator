// PreviewCard.jsx
// Simulates how the generated content would look as a real
// Amazon-style product listing card.
//
// Props:
//   formData — { productName, category, weight, platforms, image }   (from ProductForm)
//   output   — null | { title, shortDesc, bullets[], keywords[] }    (from generator)
//   platform — "Amazon" | "Flipkart" | "Meesho" | "Instagram" | "WhatsApp" | "D2C"
//              (default: first selected platform, else "Amazon")

import { useState } from "react";
import SectionCard from "./SectionCard";

// Platform-specific accent colours & labels
const PLATFORM_THEME = {
  Amazon:    { color: "#ff9900", label: "Amazon",    icon: "📦" },
  Flipkart:  { color: "#2874f0", label: "Flipkart",  icon: "🛒" },
  Meesho:    { color: "#9c27b0", label: "Meesho",    icon: "🛍️" },
  Instagram: { color: "#e1306c", label: "Instagram", icon: "📸" },
  WhatsApp:  { color: "#25d366", label: "WhatsApp",  icon: "💬" },
  D2C:       { color: "#2d6a4f", label: "Website",   icon: "🌐" },
};

// Mock price generator (deterministic-ish from product name length)
function mockPrice(name = "") {
  const base = 99 + (name.length % 10) * 30;
  const mrp  = base + Math.round(base * 0.35 / 5) * 5;
  return { price: base, mrp };
}

export default function PreviewCard({ formData = {}, output = null, platform }) {
  const platforms = formData.platforms?.length ? formData.platforms : ["Amazon"];
  const activePlatform = platform || platforms[0] || "Amazon";
  const [selectedPlatform, setSelectedPlatform] = useState(activePlatform);
  const theme = PLATFORM_THEME[selectedPlatform] || PLATFORM_THEME.Amazon;

  const title    = output?.title     || formData.productName || "Your Product Title Will Appear Here";
  const shortDesc= output?.shortDesc || "Generate a description to see the preview update with real content.";
  const bullets  = output?.bullets?.length
    ? output.bullets
    : [
        "✔ Key feature one will appear here",
        "✔ Key feature two will appear here",
        "✔ Key feature three will appear here",
      ];
  const { price, mrp } = mockPrice(formData.productName);
  const discount = Math.round(((mrp - price) / mrp) * 100);

  return (
    <SectionCard padding="md">
      {/* ── Header: platform switcher ── */}
      <div className="pc-header">
        <div>
          <h2 className="pc-header__title">Listing Preview</h2>
          <p className="pc-header__sub">See how your listing might look</p>
        </div>

        {platforms.length > 1 && (
          <div className="pc-platform-tabs">
            {platforms.map((p) => {
              const t = PLATFORM_THEME[p] || PLATFORM_THEME.Amazon;
              const active = p === selectedPlatform;
              return (
                <button
                  key={p}
                  className={`pc-tab ${active ? "pc-tab--active" : ""}`}
                  style={active ? { borderColor: t.color, color: t.color, background: t.color + "14" } : {}}
                  onClick={() => setSelectedPlatform(p)}
                >
                  {t.icon} {t.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Card frame ── */}
      <div className="pc-frame" style={{ "--pc-accent": theme.color }}>
        <div className="pc-frame__topbar">
          <span className="pc-frame__chip">{theme.icon} {theme.label} Listing Preview</span>
        </div>

        <div className="pc-listing">
          {/* Product image — real upload if present, placeholder otherwise */}
          {formData.image ? (
            <div className="pc-image pc-image--photo">
              <img src={formData.image} alt={formData.productName || "Product"} className="pc-image__photo" />
            </div>
          ) : (
            <div className="pc-image">
              <span className="pc-image__icon">🏔</span>
              <span className="pc-image__text">
                {formData.category || "Product"} Image
              </span>
              <span className="pc-image__weight">{formData.weight || "—"}</span>
            </div>
          )}

          {/* Details */}
          <div className="pc-details">
            <span className="pc-brand">HimShakti</span>

            <h3 className="pc-title">{title}</h3>

            {/* Rating */}
            <div className="pc-rating">
              <span className="pc-stars" aria-label="4.5 out of 5 stars">
                ⭐⭐⭐⭐<span className="pc-star--half">⭐</span>
              </span>
              <span className="pc-rating__score">4.5</span>
              <span className="pc-rating__count">(1,248 ratings)</span>
            </div>

            {/* Price */}
            <div className="pc-price-row">
              <span className="pc-price">₹{price}</span>
              <span className="pc-price__mrp">₹{mrp}</span>
              {discount > 0 && <span className="pc-price__off">{discount}% off</span>}
            </div>
            <p className="pc-price__note">Inclusive of all taxes</p>

            {/* Short description */}
            <p className="pc-shortdesc">{shortDesc}</p>

            {/* Bullets */}
            <ul className="pc-bullets">
              {bullets.slice(0, 5).map((b, i) => (
                <li key={i}>{b.replace(/^✔\s*/, "")}</li>
              ))}
            </ul>

            {/* Delivery info */}
            <div className="pc-delivery">
              <span>🚚 Free Delivery</span>
              <span>↩ 7-Day Returns</span>
              <span>🌿 100% Natural</span>
            </div>

            {/* Buttons */}
            <div className="pc-actions">
              <button className="pc-btn pc-btn--cart" disabled>
                🛒 Add to Cart
              </button>
              <button
                className="pc-btn pc-btn--buy"
                style={{ background: theme.color }}
                disabled
              >
                ⚡ Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Keywords footer (SEO preview) */}
        {output?.keywords?.length > 0 && (
          <div className="pc-keywords">
            <span className="pc-keywords__label">🔍 Search Keywords:</span>
            <div className="pc-keywords__list">
              {output.keywords.slice(0, 6).map((k) => (
                <span key={k} className="pc-keyword">{k}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="pc-disclaimer">
        * This is a visual mock-up only. Actual listing appearance varies by platform.
      </p>

      <style>{`
        /* ── Header ── */
        .pc-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          flex-wrap: wrap; gap: .875rem; margin-bottom: 1.25rem;
          padding-bottom: 1rem; border-bottom: 1px solid #edf7f1;
        }
        .pc-header__title { font-size: 1.1rem; font-weight: 800; color: #1a3a2a; margin: 0 0 .15rem; }
        .pc-header__sub   { font-size: .78rem; color: #6b9e82; margin: 0; }

        .pc-platform-tabs { display: flex; gap: .4rem; flex-wrap: wrap; }
        .pc-tab {
          padding: .3rem .7rem; font-size: .78rem; font-weight: 700;
          border: 1.5px solid #d5e8d4; border-radius: 999px;
          background: #f7faf8; color: #6b9e82; cursor: pointer;
          transition: all .14s;
        }
        .pc-tab:hover { border-color: #b5d9c5; }
        .pc-tab--active { font-weight: 800; }

        /* ── Frame ── */
        .pc-frame {
          border: 1.5px solid #e6e6e6; border-radius: 12px;
          overflow: hidden; background: #fff;
        }
        .pc-frame__topbar {
          padding: .5rem .875rem; background: #fafafa;
          border-bottom: 1px solid #eee;
        }
        .pc-frame__chip {
          font-size: .72rem; font-weight: 700; color: var(--pc-accent);
          background: color-mix(in srgb, var(--pc-accent) 12%, white);
          padding: .2rem .6rem; border-radius: 999px;
        }

        /* ── Listing layout ── */
        .pc-listing {
          display: grid; grid-template-columns: 200px 1fr;
          gap: 1.5rem; padding: 1.25rem;
        }

        /* Image placeholder */
        .pc-image {
          aspect-ratio: 1; border-radius: 10px;
          background: linear-gradient(135deg, #f0faf4, #e0f2e9);
          border: 1.5px dashed #b5d9c5;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: .35rem; text-align: center;
          overflow: hidden;
        }
        .pc-image--photo {
          border: 1.5px solid #e6e6e6;
          background: #fafafa;
          padding: 0;
        }
        .pc-image__photo {
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .pc-image__icon   { font-size: 2.5rem; }
        .pc-image__text   { font-size: .8rem; font-weight: 700; color: #2d6a4f; }
        .pc-image__weight {
          font-size: .7rem; color: #6b9e82;
          background: #fff; padding: .15rem .55rem;
          border-radius: 999px; border: 1px solid #d5e8d4;
        }

        /* Details */
        .pc-details { display: flex; flex-direction: column; gap: .4rem; min-width: 0; }

        .pc-brand {
          font-size: .75rem; font-weight: 700; color: #2d6a4f;
          text-transform: uppercase; letter-spacing: .06em;
        }
        .pc-title {
          font-size: 1.05rem; font-weight: 700; color: #0f1111;
          margin: 0; line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Rating */
        .pc-rating { display: flex; align-items: center; gap: .4rem; font-size: .85rem; }
        .pc-stars { font-size: .85rem; letter-spacing: -1px; }
        .pc-star--half { filter: grayscale(.5) opacity(.55); }
        .pc-rating__score { font-weight: 700; color: #1a3a2a; }
        .pc-rating__count { color: #6b9e82; font-size: .78rem; }

        /* Price */
        .pc-price-row { display: flex; align-items: baseline; gap: .5rem; margin-top: .35rem; }
        .pc-price     { font-size: 1.4rem; font-weight: 800; color: #1a3a2a; }
        .pc-price__mrp { font-size: .85rem; color: #999; text-decoration: line-through; }
        .pc-price__off { font-size: .8rem; font-weight: 700; color: #c0392b; }
        .pc-price__note { font-size: .72rem; color: #999; margin: 0; }

        /* Short description */
        .pc-shortdesc {
          font-size: .85rem; color: #4a4a4a; line-height: 1.6;
          margin: .4rem 0 0;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Bullets */
        .pc-bullets {
          margin: .4rem 0 0; padding-left: 1.1rem;
          font-size: .82rem; color: #333; line-height: 1.65;
        }
        .pc-bullets li { margin-bottom: .15rem; }

        /* Delivery info */
        .pc-delivery {
          display: flex; gap: .9rem; flex-wrap: wrap;
          font-size: .75rem; color: #4a7c5e; font-weight: 600;
          margin-top: .5rem;
        }

        /* Action buttons */
        .pc-actions { display: flex; gap: .65rem; margin-top: .75rem; }
        .pc-btn {
          flex: 1; padding: .6rem 1rem; font-size: .85rem; font-weight: 700;
          border-radius: 8px; border: none; cursor: not-allowed;
          font-family: inherit; opacity: .85;
        }
        .pc-btn--cart {
          background: #f0f0f0; color: #555; border: 1.5px solid #ddd;
        }
        .pc-btn--buy { color: #fff; }

        /* Keywords */
        .pc-keywords {
          padding: .875rem 1.25rem; background: #fafafa;
          border-top: 1px solid #eee;
          display: flex; align-items: center; gap: .6rem; flex-wrap: wrap;
        }
        .pc-keywords__label { font-size: .75rem; font-weight: 700; color: #6b9e82; }
        .pc-keywords__list { display: flex; gap: .4rem; flex-wrap: wrap; }
        .pc-keyword {
          font-size: .72rem; color: #2d6a4f; background: #edf7f1;
          border: 1px solid #d5e8d4; padding: .15rem .55rem; border-radius: 999px;
        }

        /* Disclaimer */
        .pc-disclaimer {
          font-size: .72rem; color: #a0b8a8; text-align: center;
          margin: .875rem 0 0; font-style: italic;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .pc-listing { grid-template-columns: 1fr; }
          .pc-image { aspect-ratio: 16/10; max-width: 240px; margin: 0 auto; width: 100%; }
          .pc-header { flex-direction: column; }
          .pc-actions { flex-direction: column; }
        }
      `}</style>
    </SectionCard>
  );
}
