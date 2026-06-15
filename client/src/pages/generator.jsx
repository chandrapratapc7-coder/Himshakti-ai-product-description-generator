// Generator.jsx (Week 3 update)
// Main Generator page — now uses OutputEditor and PreviewCard components.

import { useState } from "react";
import ProductForm from "../components/ProductForm";
import OutputEditor from "../components/OutputEditor";
import PreviewCard from "../components/PreviewCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        title: `${form.productName} | ${form.category} | ${form.weight}`,
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

// ── Main Generator Page ──────────────────────────────────────────────────────
export default function Generator() {
  const [formData, setFormData]   = useState(INITIAL_FORM);
  const [errors, setErrors]       = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput]       = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("content"); // mobile tab: content | preview

  const handleSubmit = async () => {
    const foundErrors = validate(formData);
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      const firstError = document.querySelector(".hsif__input--error, .hssf__select--error, .field-input--error");
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
    <div className="gen-page">
      <Navbar />

      <main className="gen-main">
        <div className="gen-header">
          <h1 className="gen-title">AI Description Generator</h1>
          <p className="gen-subtitle">
            Enter your HimShakti product details and get platform-optimised content instantly
          </p>
        </div>

        {/* Mobile tab switcher — shows form vs output/preview */}
        <div className="gen-mobile-tabs">
          <button
            className={`gen-tab ${activeTab === "content" ? "gen-tab--active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            ✏️ Output
          </button>
          <button
            className={`gen-tab ${activeTab === "preview" ? "gen-tab--active" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            🛒 Preview
          </button>
        </div>

        <div className="gen-grid">
          {/* Left — Input Form */}
          <section className="gen-col gen-col--form">
            <ProductForm
              formData={formData}
              onChange={setFormData}
              errors={errors}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </section>

          {/* Right — Output + Preview stacked */}
          <section className="gen-col gen-col--right">
            <div className={`gen-right-block ${activeTab === "content" ? "gen-right-block--show" : ""}`}>
              <OutputEditor
                output={output}
                isLoading={isLoading}
                onRegenerate={handleSubmit}
              />
            </div>

            <div className={`gen-right-block ${activeTab === "preview" ? "gen-right-block--show" : ""}`}>
              <PreviewCard formData={formData} output={output} />
            </div>
          </section>
        </div>
      </main>

      <Footer />

      <style>{`
        .gen-page {
          min-height: 100vh; display: flex; flex-direction: column;
          background: #f4f9f6;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }

        .gen-main {
          flex: 1; max-width: 1300px; margin: 0 auto;
          padding: 2rem 1.25rem 3rem; width: 100%;
        }

        .gen-header { text-align: center; margin-bottom: 1.5rem; }
        .gen-title {
          font-size: 1.75rem; font-weight: 800; color: #1a3a2a;
          margin: 0 0 .5rem; letter-spacing: -.02em;
        }
        .gen-subtitle { font-size: .95rem; color: #6b9e82; margin: 0; }

        /* Mobile tabs — hidden on desktop */
        .gen-mobile-tabs { display: none; }

        /* Grid layout */
        .gen-grid {
          display: grid; grid-template-columns: 1fr 1.05fr;
          gap: 1.5rem; align-items: start;
        }
        .gen-col--right { display: flex; flex-direction: column; gap: 1.5rem; }

        /* Responsive: stack + tab switcher on mobile */
        @media (max-width: 980px) {
          .gen-grid { grid-template-columns: 1fr; }

          .gen-mobile-tabs {
            display: flex; gap: .5rem; margin-bottom: 1.25rem;
            background: #fff; border: 1px solid #d5e8d4;
            border-radius: 10px; padding: .25rem;
          }
          .gen-tab {
            flex: 1; padding: .55rem; border: none; background: transparent;
            border-radius: 8px; font-size: .85rem; font-weight: 700;
            color: #6b9e82; cursor: pointer; transition: all .15s;
          }
          .gen-tab--active { background: #2d6a4f; color: #fff; }

          /* Only show the active right-block on mobile */
          .gen-right-block { display: none; }
          .gen-right-block--show { display: block; }
        }

        @media (max-width: 520px) {
          .gen-main { padding: 1rem .875rem 2rem; }
          .gen-title { font-size: 1.4rem; }
        }
      `}</style>
    </div>
  );
}
