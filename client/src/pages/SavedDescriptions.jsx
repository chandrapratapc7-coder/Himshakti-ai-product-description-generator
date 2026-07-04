// pages/SavedDescriptions.jsx
// Displays all saved product listings fetched from MongoDB backend.
// Features: search, delete, pagination, expand/collapse, copy all.

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar    from "../components/Navbar";
import Footer    from "../components/Footer";
import Button    from "../components/Button";
import Loader    from "../components/Loader";
import { useToast } from "../components/Toast";
import { getProducts, deleteProduct } from "../services/api";

// Platform colours
const PLATFORM_COLORS = {
  Amazon:    "#ff9900",
  Flipkart:  "#2874f0",
  Meesho:    "#9c27b0",
  Instagram: "#e1306c",
  WhatsApp:  "#25d366",
  D2C:       "#2d6a4f",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ── Single listing card ──────────────────────────────────────────────────
function ListingCard({ product, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [copied,   setCopied]   = useState(false);
  const { showToast } = useToast();

  const handleDelete = async () => {
    try {
      await onDelete(product._id);
      showToast("Listing deleted", "success");
    } catch {
      showToast("Failed to delete listing", "error");
    }
  };

  const copyAll = () => {
    const text = [
      `Product: ${product.productName}`,
      `Category: ${product.category} | Weight: ${product.weight}`,
      `Tone: ${product.tone}`,
      `Keywords: ${(product.keywords || []).join(", ")}`,
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="lc-card">
      {/* Header */}
      <div className="lc-header">
        <div className="lc-heading">
          <h3 className="lc-title">{product.productName}</h3>
          <span className="lc-date">Saved {formatDate(product.createdAt)}</span>
        </div>
        <div className="lc-chips">
          <span className="lc-chip">{product.category}</span>
          <span className="lc-chip">{product.weight}</span>
          <span className="lc-chip lc-chip--tone">{product.tone}</span>
        </div>
      </div>

      {/* Platforms */}
      {product.platforms?.length > 0 && (
        <div className="lc-platforms">
          {product.platforms.map((p) => (
            <span
              key={p}
              className="lc-platform-pill"
              style={{
                borderColor: PLATFORM_COLORS[p] || "#ccc",
                color:       PLATFORM_COLORS[p] || "#555",
                background: (PLATFORM_COLORS[p] || "#ccc") + "14",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      )}

      {/* Ingredients preview (collapsed) */}
      {!expanded && (
        <p className="lc-preview">
          <strong>Ingredients:</strong> {product.ingredients}
        </p>
      )}

      {/* Expanded details */}
      {expanded && (
        <div className="lc-details">
          <div className="lc-field">
            <span className="lc-field__label">Ingredients</span>
            <p className="lc-field__value">{product.ingredients}</p>
          </div>
          {product.features?.length > 0 && (
            <div className="lc-field">
              <span className="lc-field__label">Features</span>
              <p className="lc-field__value">{product.features.join(", ")}</p>
            </div>
          )}
          {product.keywords?.length > 0 && (
            <div className="lc-field">
              <span className="lc-field__label">Keywords</span>
              <div className="lc-keywords">
                {product.keywords.map((k) => (
                  <span key={k} className="lc-keyword">{k}</span>
                ))}
              </div>
            </div>
          )}
          <div className="lc-field">
            <span className="lc-field__label">ID</span>
            <p className="lc-field__value lc-id">{product._id}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="lc-actions">
        <Button variant="secondary" size="sm" onClick={() => setExpanded((e) => !e)}>
          {expanded ? "▲ Hide" : "▼ View Details"}
        </Button>
        <Button variant="primary" size="sm" onClick={copyAll}>
          {copied ? "✓ Copied" : "⎘ Copy"}
        </Button>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          🗑 Delete
        </Button>
      </div>

      <style>{`
        .lc-card {
          background:#fff; border:1px solid #d5e8d4;
          border-radius:14px; padding:1.25rem 1.5rem;
          box-shadow:0 2px 10px rgba(45,106,79,.06);
          transition:box-shadow .18s;
        }
        .lc-card:hover { box-shadow:0 6px 20px rgba(45,106,79,.1); }
        .lc-header {
          display:flex; justify-content:space-between; align-items:flex-start;
          flex-wrap:wrap; gap:.75rem; margin-bottom:.75rem;
        }
        .lc-heading { display:flex; flex-direction:column; gap:.15rem; }
        .lc-title { font-size:1.05rem; font-weight:800; color:#1a3a2a; margin:0; }
        .lc-date  { font-size:.75rem; color:#a0b8a8; }
        .lc-chips { display:flex; gap:.4rem; flex-wrap:wrap; }
        .lc-chip {
          font-size:.72rem; font-weight:700; color:#4a7c5e;
          background:#edf7f1; border:1px solid #d5e8d4;
          padding:.2rem .6rem; border-radius:999px;
        }
        .lc-chip--tone { color:#2d6a4f; background:#e0f2e9; }
        .lc-platforms { display:flex; gap:.4rem; flex-wrap:wrap; margin-bottom:.75rem; }
        .lc-platform-pill {
          font-size:.72rem; font-weight:700; padding:.2rem .65rem;
          border-radius:999px; border:1.5px solid;
        }
        .lc-preview {
          font-size:.875rem; color:#4a7c5e; line-height:1.6;
          margin:0 0 1rem;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;
          overflow:hidden;
        }
        .lc-details { display:flex; flex-direction:column; gap:.75rem; margin-bottom:1rem; }
        .lc-field { border-top:1px solid #edf7f0; padding-top:.65rem; }
        .lc-field:first-child { border-top:none; padding-top:0; }
        .lc-field__label {
          display:block; font-size:.72rem; font-weight:800; color:#2d6a4f;
          text-transform:uppercase; letter-spacing:.06em; margin-bottom:.25rem;
        }
        .lc-field__value { font-size:.875rem; color:#1a3a2a; margin:0; line-height:1.65; }
        .lc-id { font-family:monospace; font-size:.78rem; color:#6b9e82; }
        .lc-keywords { display:flex; flex-wrap:wrap; gap:.35rem; }
        .lc-keyword {
          font-size:.75rem; color:#2d6a4f; background:#edf7f1;
          border:1px solid #d5e8d4; padding:.15rem .55rem; border-radius:999px;
        }
        .lc-actions { display:flex; gap:.5rem; flex-wrap:wrap; }
        @media(max-width:480px){
          .lc-actions { flex-direction:column; }
          .lc-actions .hs-btn { width:100%; }
        }
      `}</style>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function SavedDescriptions() {
  const [products,    setProducts]    = useState([]);
  const [isLoading,   setIsLoading]   = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page,        setPage]        = useState(1);
  const [pagination,  setPagination]  = useState(null);
  const [confirmClear,setConfirmClear]= useState(false);
  const { showToast } = useToast();
  const LIMIT = 10;

  // ── Fetch products from MongoDB backend ────────────────────────────────
  const fetchProducts = useCallback(async (currentPage = 1) => {
    setIsLoading(true);
    try {
      const res  = await getProducts({ page: currentPage, limit: LIMIT });
      const data = res.data;
      setProducts(data.products || data);
      if (data.pagination) setPagination(data.pagination);
    } catch (err) {
      showToast("Failed to load saved listings. Is the backend running?", "error", 5000);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchProducts(page); }, [page, fetchProducts]);

  // ── Delete ─────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
    if (pagination) setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
  };

  // ── Search (client-side filter for now) ───────────────────────────────
  const filtered = searchQuery.trim()
    ? products.filter((p) =>
        p.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="sd-page">
      <Navbar />

      <main className="sd-main">
        <div className="sd-inner">

          {/* Header */}
          <div className="sd-header">
            <div>
              <span className="page-eyebrow">Your Library</span>
              <h1 className="page-title">Saved Descriptions</h1>
              <p className="page-subtitle">
                {pagination
                  ? `${pagination.total} listing${pagination.total !== 1 ? "s" : ""} saved in database`
                  : "All your generated product descriptions"}
              </p>
            </div>
            <Link to="/generator">
              <Button variant="primary" size="sm">✦ Generate New</Button>
            </Link>
          </div>

          {/* Search bar */}
          <div className="sd-search-bar">
            <input
              type="text"
              className="sd-search-input"
              placeholder="🔍 Search by product name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="sd-loading">
              <Loader type="spinner" size="md" text="Loading saved listings..." />
            </div>
          )}

          {/* Empty state */}
          {!isLoading && filtered.length === 0 && (
            <div className="sd-empty">
              <span className="sd-empty__icon">💾</span>
              <h2 className="sd-empty__title">
                {searchQuery ? "No results found" : "No saved listings yet"}
              </h2>
              <p className="sd-empty__body">
                {searchQuery
                  ? `No listings match "${searchQuery}". Try a different search.`
                  : "Generate a product description and save it — it will appear here."}
              </p>
              {!searchQuery && (
                <Link to="/generator">
                  <Button variant="primary">✦ Go to Generator</Button>
                </Link>
              )}
            </div>
          )}

          {/* Listings */}
          {!isLoading && filtered.length > 0 && (
            <div className="sd-list">
              {filtered.map((product) => (
                <ListingCard
                  key={product._id}
                  product={product}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && pagination && pagination.totalPages > 1 && (
            <div className="sd-pagination">
              <Button
                variant="secondary" size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Previous
              </Button>
              <span className="sd-page-info">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="secondary" size="sm"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </Button>
            </div>
          )}

        </div>
      </main>

      <Footer />

      <style>{`
        .sd-page {
          min-height:100vh; display:flex; flex-direction:column;
          background:#f4f9f6; font-family:'Inter','Segoe UI',system-ui,sans-serif;
        }
        .sd-main { flex:1; padding:2.5rem 1.5rem; }
        .sd-inner { max-width:900px; margin:0 auto; }

        /* Header */
        .sd-header {
          display:flex; justify-content:space-between; align-items:flex-start;
          flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;
        }
        .page-eyebrow {
          display:inline-block; font-size:.75rem; font-weight:700;
          letter-spacing:.08em; text-transform:uppercase; color:#2d6a4f;
          background:#e0f2e9; padding:.25rem .75rem; border-radius:999px; margin-bottom:.6rem;
        }
        .page-title {
          font-size:clamp(1.5rem,4vw,2rem); font-weight:900; color:#1a3a2a;
          margin:0 0 .4rem; letter-spacing:-.02em;
        }
        .page-subtitle { font-size:.9rem; color:#6b9e82; margin:0; }

        /* Search */
        .sd-search-bar { margin-bottom:1.5rem; }
        .sd-search-input {
          width:100%; padding:.65rem 1rem; font-size:.9rem;
          background:#fff; border:1.5px solid #d5e8d4; border-radius:10px;
          outline:none; font-family:inherit; color:#1a3a2a;
          transition:border-color .15s, box-shadow .15s; box-sizing:border-box;
        }
        .sd-search-input:focus {
          border-color:#2d6a4f; box-shadow:0 0 0 3px rgba(45,106,79,.1);
        }

        /* Loading */
        .sd-loading {
          display:flex; justify-content:center; padding:4rem 0;
        }

        /* List */
        .sd-list { display:flex; flex-direction:column; gap:1.25rem; }

        /* Empty */
        .sd-empty {
          text-align:center; padding:3.5rem 2rem;
          background:#fff; border:1.5px dashed #b5d9c5; border-radius:14px;
        }
        .sd-empty__icon { font-size:3rem; display:block; margin-bottom:1rem; }
        .sd-empty__title { font-size:1.15rem; font-weight:800; color:#1a3a2a; margin:0 0 .6rem; }
        .sd-empty__body {
          font-size:.9rem; color:#6b9e82; max-width:400px;
          margin:0 auto 1.5rem; line-height:1.7;
        }

        /* Pagination */
        .sd-pagination {
          display:flex; align-items:center; justify-content:center;
          gap:1rem; margin-top:2rem;
        }
        .sd-page-info { font-size:.875rem; color:#6b9e82; font-weight:600; }

        @media(max-width:480px){
          .sd-main { padding:1.5rem 1rem; }
          .sd-header { flex-direction:column; }
        }
      `}</style>
    </div>
  );
}
