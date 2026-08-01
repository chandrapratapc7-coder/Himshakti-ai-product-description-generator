// pages/Saved.jsx
// Fetches saved AI-generated descriptions via services/api.js (GET /api/generate).
// These are the auto-saved outputs from the Generator (Week 7), not the Product catalog.

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar        from "../components/Navbar";
import Footer         from "../components/Footer";
import Button          from "../components/Button";
import Loader           from "../components/Loader";
import Modal              from "../components/Modal";
import { useToast }        from "../components/Toast";
import { getSavedDescriptions, deleteSavedDescription, updateSavedDescription } from "../services/api";

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

// ── Single listing card ───────────────────────────────────────────────────
function ListingCard({ item, onRequestDelete, onRequestEdit }) {
  const [expanded, setExpanded] = useState(false);
  const [copied,   setCopied]   = useState(false);

  const copyAll = () => {
    const text = [
      `Title: ${item.title}`,
      `Category: ${item.category} | Tone: ${item.tone}`,
      item.shortDescription ? `Short: ${item.shortDescription}` : "",
      item.longDescription  ? `Long: ${item.longDescription}`   : "",
      item.bulletPoints?.length ? `Bullets: ${item.bulletPoints.join(" | ")}` : "",
      item.platform?.length ? `Platforms: ${item.platform.join(", ")}` : "",
      item.seoKeywords?.length ? `Keywords: ${item.seoKeywords.join(", ")}` : "",
    ].filter(Boolean).join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div className="sl-card">
      {/* Header */}
      <div className="sl-card__header">
        {item.image && (
          <img src={item.image} alt={item.title} className="sl-card__thumb" />
        )}
        <div className="sl-card__heading">
          <h3 className="sl-card__title">{item.title}</h3>
          <span className="sl-card__date">Saved {formatDate(item.createdAt)}</span>
        </div>
        <div className="sl-card__meta">
          {[item.category, item.tone].filter(Boolean).map((tag) => (
            <span key={tag} className={`sl-chip ${tag === item.tone ? "sl-chip--tone" : ""}`}>
              {tag}
            </span>
          ))}
          {item.usedFallback && (
            <span className="sl-chip sl-chip--fallback" title="Generated using mock fallback, not live AI">
              ⚠ Fallback
            </span>
          )}
        </div>
      </div>

      {/* Platforms */}
      {item.platform?.length > 0 && (
        <div className="sl-platforms">
          {item.platform.map((p) => (
            <span
              key={p}
              className="sl-platform-pill"
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

      {/* Preview (collapsed) */}
      {!expanded && (
        <p className="sl-preview">{item.shortDescription}</p>
      )}

      {/* Full details (expanded) */}
      {expanded && (
        <div className="sl-full">
          <div className="sl-section">
            <span className="sl-section__label">Short Description</span>
            <p className="sl-section__text">{item.shortDescription}</p>
          </div>
          <div className="sl-section">
            <span className="sl-section__label">Long Description</span>
            <p className="sl-section__text">{item.longDescription}</p>
          </div>
          {item.bulletPoints?.length > 0 && (
            <div className="sl-section">
              <span className="sl-section__label">Bullet Points</span>
              <ul className="sl-bullets">
                {item.bulletPoints.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          )}
          {item.usageStorage && (
            <div className="sl-section">
              <span className="sl-section__label">Usage & Storage</span>
              <p className="sl-section__text">{item.usageStorage}</p>
            </div>
          )}
          {item.seoKeywords?.length > 0 && (
            <div className="sl-section">
              <span className="sl-section__label">SEO Keywords</span>
              <div className="sl-keywords">
                {item.seoKeywords.map((k) => (
                  <span key={k} className="sl-keyword">{k}</span>
                ))}
              </div>
            </div>
          )}
          <div className="sl-section">
            <span className="sl-section__label">MongoDB ID</span>
            <p className="sl-section__text sl-id">{item._id}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="sl-actions">
        <Button variant="secondary" size="sm" onClick={() => setExpanded((e) => !e)}>
          {expanded ? "▲ Hide Details" : "▼ View Details"}
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onRequestEdit(item)}>
          ✏️ Edit
        </Button>
        <Button variant="primary" size="sm" onClick={copyAll}>
          {copied ? "✓ Copied!" : "⎘ Copy"}
        </Button>
        <Button variant="danger" size="sm" onClick={() => onRequestDelete(item)}>
          🗑 Delete
        </Button>
      </div>

      <style>{`
        .sl-card {
          background:#fff; border:1px solid #d5e8d4; border-radius:14px;
          padding:1.25rem 1.5rem; box-shadow:0 2px 10px rgba(45,106,79,.06);
          transition:box-shadow .18s;
        }
        .sl-card:hover { box-shadow:0 6px 20px rgba(45,106,79,.1); }
        .sl-card__header {
          display:flex; justify-content:space-between; align-items:flex-start;
          flex-wrap:wrap; gap:.75rem; margin-bottom:.75rem;
        }
        .sl-card__thumb {
          width:64px; height:64px; object-fit:cover;
          border-radius:10px; border:1px solid #d5e8d4;
          flex-shrink:0;
        }
        .sl-card__heading { display:flex; flex-direction:column; gap:.15rem; flex:1; min-width:160px; }
        .sl-card__title { font-size:1.05rem; font-weight:800; color:#1a3a2a; margin:0; }
        .sl-card__date  { font-size:.75rem; color:#a0b8a8; }
        .sl-card__meta  { display:flex; gap:.4rem; flex-wrap:wrap; }
        .sl-chip {
          font-size:.72rem; font-weight:700; color:#4a7c5e;
          background:#edf7f1; border:1px solid #d5e8d4;
          padding:.2rem .6rem; border-radius:999px;
        }
        .sl-chip--tone { color:#2d6a4f; background:#e0f2e9; }
        .sl-chip--fallback { color:#b45309; background:#fff8ed; border-color:#f4d4a0; }
        .sl-platforms { display:flex; gap:.4rem; flex-wrap:wrap; margin-bottom:.75rem; }
        .sl-platform-pill {
          font-size:.72rem; font-weight:700; padding:.2rem .65rem;
          border-radius:999px; border:1.5px solid;
        }
        .sl-preview {
          font-size:.875rem; color:#4a7c5e; line-height:1.6; margin:0 0 1rem;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;
          overflow:hidden;
        }
        .sl-full { display:flex; flex-direction:column; gap:.75rem; margin-bottom:1rem; }
        .sl-section { border-top:1px solid #edf7f1; padding-top:.65rem; }
        .sl-section:first-child { border-top:none; padding-top:0; }
        .sl-section__label {
          display:block; font-size:.72rem; font-weight:800; color:#2d6a4f;
          text-transform:uppercase; letter-spacing:.06em; margin-bottom:.25rem;
        }
        .sl-section__text { font-size:.875rem; color:#1a3a2a; margin:0; line-height:1.7; }
        .sl-bullets { margin:0; padding-left:1.1rem; font-size:.875rem; color:#1a3a2a; line-height:1.8; }
        .sl-id { font-family:monospace; font-size:.78rem; color:#6b9e82; }
        .sl-keywords { display:flex; flex-wrap:wrap; gap:.4rem; }
        .sl-keyword {
          font-size:.75rem; color:#2d6a4f; background:#edf7f1;
          border:1px solid #d5e8d4; padding:.15rem .55rem; border-radius:999px;
        }
        .sl-actions { display:flex; gap:.5rem; flex-wrap:wrap; }
        @media(max-width:480px){
          .sl-actions { flex-direction:column; }
          .sl-actions .hs-btn { width:100%; }
        }
      `}</style>
    </div>
  );
}

// ── Edit form fields config (drives the modal below) ──────────────────────
const EDIT_FIELDS = [
  { key: "title",             label: "Title",              type: "text" },
  { key: "shortDescription",  label: "Short Description",  type: "textarea", rows: 3 },
  { key: "longDescription",   label: "Long Description",   type: "textarea", rows: 5 },
  { key: "bulletPoints",      label: "Bullet Points",      type: "list",     hint: "One per line" },
  { key: "seoKeywords",       label: "SEO Keywords",        type: "list",     hint: "Comma-separated" },
  { key: "usageStorage",      label: "Usage & Storage",    type: "textarea", rows: 2 },
];

// ── Main page ─────────────────────────────────────────────────────────────
export default function Saved() {
  const [items,       setItems]       = useState([]);
  const [isLoading,    setIsLoading]  = useState(true);
  const [error,        setError]      = useState(null);
  const [searchQuery,  setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); // item pending delete confirmation
  const [deleting,     setDeleting]    = useState(false);
  const [editTarget,   setEditTarget]  = useState(null); // item currently being edited
  const [editForm,     setEditForm]    = useState({});
  const [saving,        setSaving]     = useState(false);
  const { showToast } = useToast();

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await getSavedDescriptions();
      setItems(Array.isArray(data) ? data : (data.data || data.descriptions || []));
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to load saved listings. Is the backend running?";
      setError(message);
      showToast(message, "error", 5000);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteSavedDescription(deleteTarget._id);
      setItems((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      showToast("Listing deleted", "success");
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to delete listing", "error");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  // ── Edit flow ──────────────────────────────────────────────────────────
  const openEdit = (item) => {
    setEditTarget(item);
    setEditForm({
      title: item.title || "",
      shortDescription: item.shortDescription || "",
      longDescription: item.longDescription || "",
      bulletPoints: (item.bulletPoints || []).join("\n"),
      seoKeywords: (item.seoKeywords || []).join(", "),
      usageStorage: item.usageStorage || "",
    });
  };

  const closeEdit = () => {
    if (saving) return;
    setEditTarget(null);
    setEditForm({});
  };

  const handleEditField = (key) => (e) =>
    setEditForm((prev) => ({ ...prev, [key]: e.target.value }));

  const saveEdit = async () => {
    if (!editTarget) return;
    setSaving(true);
    try {
      const payload = {
        title: editForm.title,
        shortDescription: editForm.shortDescription,
        longDescription: editForm.longDescription,
        bulletPoints: editForm.bulletPoints.split("\n").map((s) => s.trim()).filter(Boolean),
        seoKeywords: editForm.seoKeywords.split(",").map((s) => s.trim()).filter(Boolean),
        usageStorage: editForm.usageStorage,
      };
      const { data } = await updateSavedDescription(editTarget._id, payload);
      const updated = data.data || data;
      setItems((prev) => prev.map((it) => (it._id === updated._id ? updated : it)));
      showToast("Listing updated", "success");
      setEditTarget(null);
      setEditForm({});
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to update listing", "error");
    } finally {
      setSaving(false);
    }
  };

  const filtered = searchQuery.trim()
    ? items.filter((p) =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

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
                {isLoading
                  ? "Loading..."
                  : `${items.length} listing${items.length !== 1 ? "s" : ""} generated so far`}
              </p>
            </div>
            <Link to="/generator">
              <Button variant="primary" size="sm">✦ Generate New</Button>
            </Link>
          </div>

          {/* Search */}
          {items.length > 0 && (
            <div className="saved-search">
              <input
                type="text"
                className="saved-search__input"
                placeholder="🔍 Search by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="saved-loading">
              <Loader type="spinner" size="md" text="Loading your saved listings..." />
            </div>
          )}

          {/* Error state (distinct from empty state) */}
          {!isLoading && error && items.length === 0 && (
            <div className="saved-empty">
              <span className="saved-empty__icon">⚠️</span>
              <h2 className="saved-empty__title">Couldn't load your listings</h2>
              <p className="saved-empty__body">{error}</p>
              <Button variant="primary" onClick={fetchItems}>↻ Try Again</Button>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !error && filtered.length === 0 && (
            <div className="saved-empty">
              <span className="saved-empty__icon">💾</span>
              <h2 className="saved-empty__title">
                {searchQuery ? "No results found" : "No saved listings yet"}
              </h2>
              <p className="saved-empty__body">
                {searchQuery
                  ? `No listings match "${searchQuery}". Try a different search.`
                  : "Generate a product description and it'll be saved here automatically."}
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
            <div className="saved-list">
              {filtered.map((item) => (
                <ListingCard
                  key={item._id}
                  item={item}
                  onRequestDelete={setDeleteTarget}
                  onRequestEdit={openEdit}
                />
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => !deleting && setDeleteTarget(null)}
        title="Delete this listing?"
        size="sm"
      >
        <p style={{ margin: "0 0 1.25rem" }}>
          {deleteTarget && (
            <>This will permanently delete <strong>{deleteTarget.title}</strong>. This can't be undone.</>
          )}
        </p>
        <div style={{ display: "flex", gap: ".5rem", justifyContent: "flex-end" }}>
          <Button variant="secondary" size="sm" onClick={() => setDeleteTarget(null)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={confirmDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "🗑 Delete"}
          </Button>
        </div>
      </Modal>

      {/* Edit modal -- Week 8 Update flow */}
      <Modal
        isOpen={!!editTarget}
        onClose={closeEdit}
        title="Edit Listing"
        size="lg"
      >
        <div className="sl-edit-form">
          {EDIT_FIELDS.map((field) => (
            <div key={field.key} className="sl-edit-field">
              <label className="sl-edit-label" htmlFor={`edit-${field.key}`}>
                {field.label}
                {field.hint && <span className="sl-edit-hint"> — {field.hint}</span>}
              </label>
              {field.type === "textarea" || field.type === "list" ? (
                <textarea
                  id={`edit-${field.key}`}
                  className="sl-edit-input"
                  rows={field.rows || 3}
                  value={editForm[field.key] || ""}
                  onChange={handleEditField(field.key)}
                />
              ) : (
                <input
                  id={`edit-${field.key}`}
                  type="text"
                  className="sl-edit-input"
                  value={editForm[field.key] || ""}
                  onChange={handleEditField(field.key)}
                />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: ".5rem", justifyContent: "flex-end", marginTop: "1.25rem" }}>
          <Button variant="secondary" size="sm" onClick={closeEdit} disabled={saving}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={saveEdit} disabled={saving}>
            {saving ? "Saving..." : "✓ Save Changes"}
          </Button>
        </div>
      </Modal>

      <style>{`
        .saved-page {
          min-height:100vh; display:flex; flex-direction:column;
          background:var(--color-bg, #f4f9f6); font-family:var(--font-family, 'Inter','Segoe UI',system-ui,sans-serif);
        }
        .saved-main { flex:1; padding:2.5rem 1.5rem; }
        .saved-inner { max-width:900px; margin:0 auto; }
        .saved-header {
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
        .saved-search { margin-bottom:1.5rem; }
        .saved-search__input {
          width:100%; padding:.65rem 1rem; font-size:.9rem;
          background:#fff; border:1.5px solid #d5e8d4; border-radius:10px;
          outline:none; font-family:inherit; color:#1a3a2a;
          transition:border-color .15s, box-shadow .15s; box-sizing:border-box;
        }
        .saved-search__input:focus {
          border-color:#2d6a4f; box-shadow:0 0 0 3px rgba(45,106,79,.1);
        }
        .saved-loading { display:flex; justify-content:center; padding:4rem 0; }
        .saved-list { display:flex; flex-direction:column; gap:1.25rem; }
        .saved-empty {
          text-align:center; padding:3.5rem 2rem;
          background:#fff; border:1.5px dashed #b5d9c5; border-radius:14px;
        }
        .saved-empty__icon { font-size:3rem; display:block; margin-bottom:1rem; }
        .saved-empty__title { font-size:1.15rem; font-weight:800; color:#1a3a2a; margin:0 0 .6rem; }
        .saved-empty__body {
          font-size:.9rem; color:#6b9e82; max-width:420px;
          margin:0 auto 1.5rem; line-height:1.7;
        }

        /* Edit modal form */
        .sl-edit-form { display:flex; flex-direction:column; gap:1rem; max-height:60vh; overflow-y:auto; }
        .sl-edit-field { display:flex; flex-direction:column; gap:.35rem; }
        .sl-edit-label { font-size:.85rem; font-weight:700; color:#1a3a2a; }
        .sl-edit-hint { font-weight:400; color:#7a9e8a; font-size:.78rem; }
        .sl-edit-input {
          width:100%; padding:.6rem .8rem; font-size:.875rem;
          background:#f7faf8; border:1.5px solid #c8dfc8; border-radius:8px;
          outline:none; font-family:inherit; color:#1a3a2a; resize:vertical;
          box-sizing:border-box;
        }
        .sl-edit-input:focus { border-color:#2d6a4f; background:#fff; }

        @media(max-width:768px){ .saved-main { padding:2rem 1.25rem; } }
        @media(max-width:375px){ .saved-main { padding:1.5rem 1rem; } }
      `}</style>
    </div>
  );
}
