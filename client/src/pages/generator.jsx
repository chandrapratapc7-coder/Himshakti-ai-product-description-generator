// Generator.jsx (Week 4 update)
// Now uses real Axios API calls to the Express backend.
// Shows Loader while generating, Toast on errors.

import { useState } from "react";
import ProductForm   from "../components/ProductForm";
import OutputEditor  from "../components/OutputEditor";
import PreviewCard   from "../components/PreviewCard";
import Navbar        from "../components/Navbar";
import Footer        from "../components/Footer";
import Loader        from "../components/Loader";
import { useToast }  from "../components/Toast";
import { generateDescription, saveProduct } from "../services/api";

// ── Initial form state ──────────────────────────────────────────────────
const INITIAL_FORM = {
  productName: "",
  ingredients: "",
  category:    "",
  weight:      "",
  features:    "",
  tone:        "Health-focused",
  platforms:   [],
  keywords:    "",
};

// ── Validation ──────────────────────────────────────────────────────────
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

// ── Main Generator Page ─────────────────────────────────────────────────
export default function Generator() {
  const [formData, setFormData]         = useState(INITIAL_FORM);
  const [errors, setErrors]             = useState({});
  const [isLoading, setIsLoading]       = useState(false);
  const [isSaving, setIsSaving]         = useState(false);
  const [output, setOutput]             = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [activeTab, setActiveTab]       = useState("content");

  const { showToast } = useToast();

  // ── Generate ──────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const foundErrors = validate(formData);
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      const firstError = document.querySelector(
        ".hsif__input--error, .hssf__select--error, .field-input--error"
      );
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setIsLoading(true);
    setHasSubmitted(true);
    setOutput(null);

    try {
      // ── Real API call to Express backend ──────────────────────────────
      const response = await generateDescription({
        productName: formData.productName,
        ingredients: formData.ingredients,
        weight:      formData.weight,
        category:    formData.category,
        features:    formData.features,
        platform:    formData.platforms[0] || "Amazon",
        tone:        formData.tone,
        keywords:    formData.keywords,
      });

      // Map backend response fields to OutputEditor expected shape
      const data = response.data;
      setOutput({
        title:     data.title,
        shortDesc: data.shortDescription,
        longDesc:  data.longDescription,
        bullets:   data.bulletPoints,
        keywords:  data.keywords,
        usage:     data.usage,
      });

      showToast("Description generated successfully!", "success");

    } catch (err) {
      console.error("Generation failed:", err);

      if (err.response) {
        // Server responded with error
        showToast(
          err.response.data?.error || "Generation failed. Please try again.",
          "error"
        );
      } else if (err.request) {
        // No response — backend not running
        showToast(
          "Cannot connect to server. Make sure the backend is running on port 5000.",
          "error",
          5000
        );
      } else {
        showToast("Something went wrong. Please try again.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Save listing ──────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!output) {
      showToast("Generate a description first before saving.", "warning");
      return;
    }

    setIsSaving(true);
    try {
      await saveProduct({
        productName: formData.productName,
        category:    formData.category,
        weight:      formData.weight,
        tone:        formData.tone,
        platforms:   formData.platforms,
        ingredients: formData.ingredients,
        features:    formData.features,
        keywords:    formData.keywords,
        output,
      });
      showToast("Listing saved successfully!", "success");
    } catch (err) {
      console.error("Save failed:", err);
      showToast("Failed to save listing. Please try again.", "error");
    } finally {
      setIsSaving(false);
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

        {/* Mobile tab switcher */}
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

            {/* Save button — shows after output generated */}
            {output && (
              <button
                className="gen-save-btn"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <><Loader type="spinner" size="sm" /> Saving…</>
                ) : (
                  "💾 Save This Listing"
                )}
              </button>
            )}
          </section>

          {/* Right — Output + Preview */}
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

        .gen-mobile-tabs { display: none; }

        .gen-grid {
          display: grid; grid-template-columns: 1fr 1.05fr;
          gap: 1.5rem; align-items: start;
        }
        .gen-col--right { display: flex; flex-direction: column; gap: 1.5rem; }

        /* Save button */
        .gen-save-btn {
          width: 100%; margin-top: .875rem;
          padding: .75rem; border: 2px solid #2d6a4f;
          background: transparent; color: #2d6a4f;
          font-size: .95rem; font-weight: 700;
          border-radius: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: .5rem;
          transition: background .15s, color .15s;
          font-family: inherit;
        }
        .gen-save-btn:hover:not(:disabled) { background: #edf7f1; }
        .gen-save-btn:disabled { opacity: .6; cursor: not-allowed; }

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
