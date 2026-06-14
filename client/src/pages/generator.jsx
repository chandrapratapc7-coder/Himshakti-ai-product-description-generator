// Generator.jsx
// Main Generator page: left input form, right output panel.
// Manages all form state, validation, and API call (mock for now).

import { useState } from "react";
import ProductForm from "../components/ProductForm";
import Navbar from "../components/Navbar";

// ── Initial form state ──────────────────────────────────────────────────────
const INITIAL_FORM = {
  productName: "",
  ingredients: "",
  category: "",
  weight: "",
  features: "",
  tone: "Health-focused",
  platforms: [],
  keywords: "",
};

// ── Validation ──────────────────────────────────────────────────────────────
function validate(form) {
  const errors = {};
  if (!form.productName || form.productName.trim().length < 3)
    errors.productName = "Product name must be at least 3 characters";
  if (!form.ingredients || form.ingredients.trim().length < 5)
    errors.ingredients = "Please list at least one ingredient";
  if (!form.category)
    errors.category = "Please select a category";
  if (!form.weight)
    errors.weight = "Please select a weight or quantity";
  if (!form.features || form.features.trim().length < 5)
    errors.features = "Please describe at least one key feature";
  if (!form.tone)
    errors.tone = "Please select a writing tone";
  if (form.platforms.length === 0)
    errors.platforms = "Select at least one target platform";
  return errors;
}

// ── Mock AI output (replace with real API call in Week 7) ───────────────────
function mockGenerate(form) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: `${form.productName} │ ${form.category} │ ${form.weight}`,
        shortDesc: `A premium Himalayan product crafted from ${form.ingredients.split(",")[0].trim()} and other natural ingredients. Perfect for the health-conscious consumer seeking authentic Pahadi flavours.`,
        longDesc: `Introducing ${form.productName} — a ${form.tone.toLowerCase()} offering from the heart of Uttarakhand. Made with ${form.ingredients}, this product embodies the rich culinary heritage of the Himalayas. ${form.features}. Ideal for all age groups and available on ${form.platforms.join(", ")}.`,
        bullets: [
          `✔ Made with ${form.ingredients.split(",")[0].trim()} sourced from Himalayan farms`,
          `✔ ${form.features.split(",")[0].trim()}`,
          "✔ No artificial preservatives or colours",
          "✔ Traditional Pahadi recipe — authentic mountain taste",
          "✔ Suitable for health-conscious snackers and families",
        ],
        keywords: [
          form.productName.toLowerCase(),
          "Himalayan food",
          "Uttarakhand products",
          "natural ingredients",
          "Pahadi food",
          ...(form.keywords ? form.keywords.split(",").map((k) => k.trim()) : []),
        ].slice(0, 10),
        usage: `Store in a cool, dry place away from direct sunlight. Best consumed within 30 days of opening. Reseal the pack after each use to retain freshness.`,
      });
    }, 1800);
  });
}

// ── OutputPanel ─────────────────────────────────────────────────────────────
function OutputPanel({ output, isLoading, hasSubmitted }) {
  const [copied, setCopied] = useState("");

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  const copyAll = () => {
    if (!output) return;
    const all = [
      `TITLE:\n${output.title}`,
      `\nSHORT DESCRIPTION:\n${output.shortDesc}`,
      `\nLONG DESCRIPTION:\n${output.longDesc}`,
      `\nBULLET POINTS:\n${output.bullets.join("\n")}`,
      `\nSEO KEYWORDS:\n${output.keywords.join(", ")}`,
      `\nUSAGE / STORAGE:\n${output.usage}`,
    ].join("\n");
    copy(all, "all");
  };

  // Empty state
  if (!hasSubmitted && !isLoading) {
    return (
      <div className="output-panel output-panel--empty">
        <div className="empty-state">
          <span className="empty-icon">🏔</span>
          <h3 className="empty-title">Your content will appear here</h3>
          <p className="empty-body">
            Fill in your product details on the left and click{" "}
            <strong>Generate Description</strong> to get started.
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="output-panel output-panel--loading">
        <div className="loading-state">
          <div className="loading-spinner" />
          <p className="loading-text">Crafting your content…</p>
          <p className="loading-sub">This usually takes a few seconds</p>
        </div>
        {[120, 80, 150, 60, 90].map((w, i) => (
          <div key={i} className="skeleton" style={{ width: `${w}%`.replace("150%","100%"), marginBottom: "0.75rem" }} />
        ))}
      </div>
    );
  }

  // Output state
  return (
    <div className="output-panel">
      <div className="output-header">
        <h2 className="output-title">Generated Content</h2>
        <button className="copy-all-btn" onClick={copyAll}>
          {copied === "all" ? "✓ Copied!" : "⎘ Copy All"}
        </button>
      </div>

      {[
        { key: "title",     label: "Product Title",       value: output.title,             rows: 2 },
        { key: "shortDesc", label: "Short Description",    value: output.shortDesc,         rows: 3 },
        { key: "longDesc",  label: "Long Description",     value: output.longDesc,          rows: 5 },
        { key: "bullets",   label: "Bullet Points",        value: output.bullets.join("\n"),rows: 5 },
        { key: "keywords",  label: "SEO Keywords",         value: output.keywords.join(", "), rows: 2 },
        { key: "usage",     label: "Usage / Storage",      value: output.usage,             rows: 2 },
      ].map(({ key, label, value, rows }) => (
        <div className="output-section" key={key}>
          <div className="section-header">
            <label className="section-label">{label}</label>
            <button
              className="copy-btn"
              onClick={() => copy(value, key)}
            >
              {copied === key ? "✓ Copied" : "⎘ Copy"}
            </button>
          </div>
          <textarea
            className="output-textarea"
            rows={rows}
            defaultValue={value}
          />
        </div>
      ))}

      <style>{`
        /* Output panel base */
        .output-panel {
          background: #ffffff;
          border: 1px solid #d5e8d4;
          border-radius: 14px;
          padding: 1.75rem;
          height: 100%;
          box-sizing: border-box;
        }
        .output-panel--empty, .output-panel--loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 420px;
        }

        /* Empty */
        .empty-state { text-align: center; max-width: 280px; }
        .empty-icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
        .empty-title { font-size: 1.05rem; font-weight: 700; color: #1a3a2a; margin: 0 0 0.5rem; }
        .empty-body { font-size: 0.875rem; color: #6b9e82; margin: 0; line-height: 1.6; }

        /* Loading */
        .loading-state { text-align: center; margin-bottom: 1.5rem; }
        .loading-spinner {
          width: 2.5rem; height: 2.5rem;
          border: 3px solid #d5e8d4;
          border-top-color: #2d6a4f;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }
        .loading-text { font-size: 1rem; font-weight: 700; color: #1a3a2a; margin: 0 0 0.3rem; }
        .loading-sub { font-size: 0.8rem; color: #6b9e82; margin: 0; }
        .skeleton {
          height: 14px;
          background: linear-gradient(90deg, #e8f5ee 25%, #d5e8d4 50%, #e8f5ee 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 6px;
          width: 100%;
        }
        @keyframes shimmer { to { background-position: -200% 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Output header */
        .output-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .output-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #1a3a2a;
          margin: 0;
        }
        .copy-all-btn {
          padding: 0.4rem 0.875rem;
          background: #2d6a4f;
          color: #fff;
          border: none;
          border-radius: 7px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.14s;
        }
        .copy-all-btn:hover { background: #1a4a34; }

        /* Sections */
        .output-section { margin-bottom: 1rem; }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.35rem;
        }
        .section-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #4a7c5e;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .copy-btn {
          background: none;
          border: 1px solid #c8dfc8;
          color: #4a7c5e;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.12s, color 0.12s;
        }
        .copy-btn:hover { background: #f0faf4; color: #1a3a2a; }

        .output-textarea {
          width: 100%;
          padding: 0.6rem 0.875rem;
          font-size: 0.875rem;
          color: #1a3a2a;
          background: #f7faf8;
          border: 1.5px solid #d5e8d4;
          border-radius: 8px;
          resize: vertical;
          font-family: inherit;
          line-height: 1.6;
          box-sizing: border-box;
          transition: border-color 0.15s;
        }
        .output-textarea:focus {
          outline: none;
          border-color: #2d6a4f;
          background: #fff;
        }
      `}</style>
    </div>
  );
}

// ── Main Generator Page ──────────────────────────────────────────────────────
export default function Generator() {
  const [formData, setFormData]     = useState(INITIAL_FORM);
  const [errors, setErrors]         = useState({});
  const [isLoading, setIsLoading]   = useState(false);
  const [output, setOutput]         = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async () => {
    const foundErrors = validate(formData);
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      // Scroll to first error on mobile
      const firstError = document.querySelector(".field-input--error, .field-error");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setIsLoading(true);
    setHasSubmitted(true);
    setOutput(null);

    try {
      // ── Replace mockGenerate() with real API call in Week 7 ──
      const result = await mockGenerate(formData);
      setOutput(result);
    } catch (err) {
      console.error("Generation failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="generator-main">
        <div className="generator-header">
          <h1 className="page-title">AI Description Generator</h1>
          <p className="page-subtitle">
            Enter your HimShakti product details and get platform-optimised content instantly
          </p>
        </div>

        <div className="generator-grid">
          {/* Left — Input Form */}
          <section className="form-column">
            <ProductForm
              formData={formData}
              onChange={setFormData}
              errors={errors}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </section>

          {/* Right — Output Panel */}
          <section className="output-column">
            <OutputPanel
              output={output}
              isLoading={isLoading}
              hasSubmitted={hasSubmitted}
            />
          </section>
        </div>
      </main>

      <style>{`
        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          background: #f4f9f6;
          color: #1a3a2a;
        }

        .page-wrapper { min-height: 100vh; }

        .generator-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.25rem 3rem;
        }

        .generator-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .page-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: #1a3a2a;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
        }
        .page-subtitle {
          font-size: 0.95rem;
          color: #6b9e82;
          margin: 0;
        }

        .generator-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        /* Responsive: stack on tablet/mobile */
        @media (max-width: 900px) {
          .generator-grid {
            grid-template-columns: 1fr;
          }
          .output-column {
            order: -1; /* show output above form on mobile only when content exists */
          }
        }
        @media (max-width: 520px) {
          .generator-main { padding: 1rem 0.875rem 2rem; }
          .page-title { font-size: 1.4rem; }
        }
      `}</style>
    </div>
  );
}
