// ProductForm.jsx
// Collects all product details needed for AI description generation.

import { useRef } from "react";
import ToneSelector from "./ToneSelector";
import PlatformSelector from "./PlatformSelector";

const CATEGORIES = [
  "Snacks / Baked Goods",
  "Juices / Drinks",
  "Jams / Preserves",
  "Pickles / Achaar",
  "Chutneys / Sauces",
  "Namkeen / Trail Mix",
];

const WEIGHTS = [
  "50g", "100g", "150g", "200g", "250g",
  "400g", "500g", "1kg",
  "200ml", "500ml", "1L",
];

const MAX_IMAGE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ProductForm({ formData, onChange, errors, onSubmit, isLoading }) {
  const fileInputRef = useRef(null);

  const handleField = (field) => (e) =>
    onChange({ ...formData, [field]: e.target.value });

  const handleTone = (tone) =>
    onChange({ ...formData, tone });

  const handlePlatforms = (platforms) =>
    onChange({ ...formData, platforms });

  // ── Image upload: read file → base64 data URL, store on formData.image ──
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      onChange({ ...formData, imageError: "Please upload a JPEG, PNG, or WebP image" });
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      onChange({ ...formData, imageError: `Image must be under ${MAX_IMAGE_MB}MB` });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange({ ...formData, image: reader.result, imageError: null });
    };
    reader.readAsDataURL(file);

    // Reset input so selecting the same file again still fires onChange
    e.target.value = "";
  };

  const handleRemoveImage = () => {
    onChange({ ...formData, image: null, imageError: null });
  };

  return (
    <form className="product-form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div className="form-header">
        <h2 className="form-title">Product Details</h2>
        <p className="form-subtitle">Fill in your product info to generate optimised content</p>
      </div>

      {/* ── Product Name ── */}
      <div className="field-group">
        <label className="field-label" htmlFor="productName">
          Product Name <span className="required-star">*</span>
        </label>
        <input
          id="productName"
          type="text"
          className={`field-input ${errors.productName ? "field-input--error" : ""}`}
          placeholder="e.g. HimShakti Mandua Cookies"
          value={formData.productName}
          onChange={handleField("productName")}
        />
        {errors.productName && <p className="field-error">{errors.productName}</p>}
      </div>

      {/* ── Key Ingredients ── */}
      <div className="field-group">
        <label className="field-label" htmlFor="ingredients">
          Key Ingredients <span className="required-star">*</span>
        </label>
        <textarea
          id="ingredients"
          rows={3}
          className={`field-input field-textarea ${errors.ingredients ? "field-input--error" : ""}`}
          placeholder="e.g. Finger millet (mandua), jaggery, ghee, cardamom, almonds"
          value={formData.ingredients}
          onChange={handleField("ingredients")}
        />
        {errors.ingredients && <p className="field-error">{errors.ingredients}</p>}
      </div>

      {/* ── Category & Weight ── */}
      <div className="field-row">
        <div className="field-group field-group--half">
          <label className="field-label" htmlFor="category">
            Category <span className="required-star">*</span>
          </label>
          <select
            id="category"
            className={`field-input field-select ${errors.category ? "field-input--error" : ""}`}
            value={formData.category}
            onChange={handleField("category")}
          >
            <option value="">Select category…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p className="field-error">{errors.category}</p>}
        </div>

        <div className="field-group field-group--half">
          <label className="field-label" htmlFor="weight">
            Weight / Qty <span className="required-star">*</span>
          </label>
          <select
            id="weight"
            className={`field-input field-select ${errors.weight ? "field-input--error" : ""}`}
            value={formData.weight}
            onChange={handleField("weight")}
          >
            <option value="">Select weight…</option>
            {WEIGHTS.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
          {errors.weight && <p className="field-error">{errors.weight}</p>}
        </div>
      </div>

      {/* ── Product Features ── */}
      <div className="field-group">
        <label className="field-label" htmlFor="features">
          Key Features <span className="required-star">*</span>
        </label>
        <textarea
          id="features"
          rows={3}
          className={`field-input field-textarea ${errors.features ? "field-input--error" : ""}`}
          placeholder="e.g. No maida, no refined sugar, high fibre, traditional Uttarakhand recipe"
          value={formData.features}
          onChange={handleField("features")}
        />
        {errors.features && <p className="field-error">{errors.features}</p>}
      </div>

      {/* ── Product Image (optional) ── */}
      <div className="field-group">
        <label className="field-label" htmlFor="productImage">
          Product Image <span className="field-optional">(optional)</span>
        </label>
        <p className="field-hint">Used in the preview card and saved listings. JPEG, PNG, WebP up to {MAX_IMAGE_MB}MB.</p>

        <input
          ref={fileInputRef}
          id="productImage"
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleImageSelect}
          className="image-input-hidden"
        />

        {!formData.image ? (
          <button
            type="button"
            className="image-dropzone"
            onClick={() => fileInputRef.current?.click()}
          >
            Click to upload product image
          </button>
        ) : (
          <div className="image-preview">
            <img src={formData.image} alt="Product preview" className="image-preview__img" />
            <button
              type="button"
              className="image-preview__remove"
              onClick={handleRemoveImage}
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
        )}
        {formData.imageError && <p className="field-error">{formData.imageError}</p>}
      </div>

      {/* ── Tone Selector ── */}
      <ToneSelector
        value={formData.tone}
        onChange={handleTone}
        error={errors.tone}
      />

      {/* ── Platform Selector ── */}
      <PlatformSelector
        selected={formData.platforms}
        onChange={handlePlatforms}
        error={errors.platforms}
      />

      {/* ── Optional Keywords ── */}
      <div className="field-group">
        <label className="field-label" htmlFor="keywords">
          Optional Keywords
          <span className="field-optional"> — helps focus SEO output</span>
        </label>
        <input
          id="keywords"
          type="text"
          className="field-input"
          placeholder="e.g. millet cookies, mandua, gluten-free, Uttarakhand"
          value={formData.keywords}
          onChange={handleField("keywords")}
        />
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        className={`submit-btn ${isLoading ? "submit-btn--loading" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner" />
            Generating…
          </>
        ) : (
          <>✦ Generate Description</>
        )}
      </button>

      <style>{`
        .product-form {
          background: #ffffff;
          border: 1px solid #d5e8d4;
          border-radius: 14px;
          padding: 1.75rem;
          height: 100%;
        }

        .form-header { margin-bottom: 1.5rem; }
        .form-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #1a3a2a;
          margin: 0 0 0.25rem;
        }
        .form-subtitle {
          font-size: 0.82rem;
          color: #6b9e82;
          margin: 0;
        }

        .field-group { margin-bottom: 1.1rem; }
        .field-row {
          display: flex;
          gap: 0.875rem;
          margin-bottom: 1.1rem;
        }
        .field-group--half { flex: 1; margin-bottom: 0; }

        .field-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a3a2a;
          margin-bottom: 0.4rem;
          letter-spacing: 0.01em;
        }
        .required-star { color: #c0392b; margin-left: 2px; }
        .field-optional {
          font-weight: 400;
          color: #7a9e8a;
          font-size: 0.8rem;
        }
        .field-hint {
          font-size: 0.78rem;
          color: #7a9e8a;
          margin: -0.15rem 0 0.6rem;
        }

        .field-input {
          width: 100%;
          padding: 0.6rem 0.875rem;
          font-size: 0.9rem;
          color: #1a3a2a;
          background: #f7faf8;
          border: 1.5px solid #c8dfc8;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
          font-family: inherit;
        }
        .field-input:focus {
          border-color: #2d6a4f;
          box-shadow: 0 0 0 3px rgba(45,106,79,0.1);
          background: #fff;
        }
        .field-input--error {
          border-color: #c0392b;
          background: #fff8f8;
        }
        .field-input--error:focus {
          box-shadow: 0 0 0 3px rgba(192,57,43,0.1);
        }
        .field-textarea { resize: vertical; min-height: 75px; }
        .field-select { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234a7c5e' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.875rem center; padding-right: 2.25rem; }

        .field-error {
          margin-top: 0.35rem;
          font-size: 0.78rem;
          color: #c0392b;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .field-error::before { content: "⚠"; }

        /* ── Image upload ── */
        .image-input-hidden { display: none; }
        .image-dropzone {
          width: 100%;
          padding: 1.5rem 1rem;
          background: #f7faf8;
          border: 1.5px dashed #c8dfc8;
          border-radius: 10px;
          color: #6b9e82;
          font-size: 0.875rem;
          font-family: inherit;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
        }
        .image-dropzone:hover {
          border-color: #2d6a4f;
          background: #edf7f1;
        }
        .image-preview {
          position: relative;
          display: inline-block;
        }
        .image-preview__img {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 10px;
          border: 1.5px solid #d5e8d4;
          display: block;
        }
        .image-preview__remove {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1a3a2a;
          color: #fff;
          border: 2px solid #fff;
          font-size: 0.7rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          padding: 0;
        }
        .image-preview__remove:hover { background: #c0392b; }

        .submit-btn {
          width: 100%;
          margin-top: 0.5rem;
          padding: 0.85rem 1.5rem;
          background: linear-gradient(135deg, #2d6a4f 0%, #1a4a34 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: opacity 0.15s, transform 0.12s, box-shadow 0.15s;
          box-shadow: 0 4px 14px rgba(45,106,79,0.3);
        }
        .submit-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(45,106,79,0.38);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn--loading { opacity: 0.75; cursor: not-allowed; }

        .spinner {
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 520px) {
          .product-form { padding: 1.25rem; }
          .field-row { flex-direction: column; gap: 1.1rem; }
        }
      `}</style>
    </form>
  );
}
