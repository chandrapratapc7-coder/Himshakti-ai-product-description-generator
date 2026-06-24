// components/Toast.jsx
/**
 * Toast — brief auto-dismissing notification.
 *
 * USAGE — two parts:
 *   1. Wrap your app (or page) with <ToastProvider>
 *   2. Call the useToast() hook to show toasts from anywhere
 *
 * @example
 *   const { showToast } = useToast();
 *   showToast("Listing saved!", "success");
 *   showToast("Something went wrong", "error");
 *   showToast("Copied to clipboard", "info");
 *   showToast("Delete this?", "warning");
 *
 * Toast types: "success" | "error" | "info" | "warning"
 * Duration: default 3000ms, pass as 3rd arg: showToast("msg","success",5000)
 */

import { createContext, useContext, useState, useCallback, useEffect } from "react";

// ── Context ──────────────────────────────────────────────────────────────
const ToastContext = createContext(null);

const ICONS = {
  success: "✅",
  error:   "❌",
  info:    "ℹ️",
  warning: "⚠️",
};

const COLORS = {
  success: { bg: "#f0faf4", border: "#b5d9c5", title: "#2d6a4f" },
  error:   { bg: "#fff8f8", border: "#f4b8b5", title: "#c0392b" },
  info:    { bg: "#f0f6ff", border: "#b5ccf5", title: "#2563eb" },
  warning: { bg: "#fff8ed", border: "#f4d4a0", title: "#b45309" },
};

// ── Single Toast item ────────────────────────────────────────────────────
function ToastItem({ toast, onRemove }) {
  const { id, message, type = "info", duration = 3000 } = toast;
  const color = COLORS[type] || COLORS.info;

  // Auto-dismiss
  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  return (
    <div
      className="toast-item"
      style={{ background: color.bg, borderColor: color.border }}
      role="alert"
      aria-live="polite"
    >
      <span className="toast-icon">{ICONS[type] || ICONS.info}</span>
      <span className="toast-message" style={{ color: color.title }}>
        {message}
      </span>
      <button
        className="toast-dismiss"
        onClick={() => onRemove(id)}
        aria-label="Dismiss notification"
      >
        ✕
      </button>

      {/* Progress bar */}
      <div
        className="toast-progress"
        style={{
          background: color.border,
          animationDuration: `${duration}ms`,
        }}
      />

      <style>{`
        .toast-item {
          position: relative; display: flex; align-items: flex-start;
          gap: .6rem; padding: .875rem 1rem .875rem .875rem;
          border: 1.5px solid; border-radius: 10px;
          box-shadow: 0 4px 16px rgba(0,0,0,.08);
          min-width: 280px; max-width: 380px;
          overflow: hidden;
          animation: toast-in .22s ease;
        }
        @keyframes toast-in {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }

        .toast-icon   { font-size: 1rem; flex-shrink: 0; margin-top: .05rem; }
        .toast-message {
          flex: 1; font-size: .875rem; font-weight: 600;
          font-family: 'Inter', system-ui, sans-serif; line-height: 1.45;
        }
        .toast-dismiss {
          flex-shrink: 0; background: none; border: none;
          font-size: .78rem; color: #9eb8a4; cursor: pointer;
          padding: 0 .1rem; line-height: 1;
          transition: color .12s;
        }
        .toast-dismiss:hover { color: #1a3a2a; }

        /* Progress bar — shrinks from full width to 0 */
        .toast-progress {
          position: absolute; bottom: 0; left: 0;
          height: 3px; border-radius: 0 0 10px 10px;
          width: 100%;
          animation: toast-progress linear forwards;
        }
        @keyframes toast-progress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}

// ── ToastProvider — wrap around App or a page ────────────────────────────
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container — fixed top-right */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
          <style>{`
            .toast-container {
              position: fixed; top: 1.25rem; right: 1.25rem;
              z-index: 9999;
              display: flex; flex-direction: column; gap: .6rem;
              pointer-events: none;
            }
            .toast-container > * { pointer-events: all; }
            @media (max-width: 480px) {
              .toast-container { left: 1rem; right: 1rem; }
            }
          `}</style>
        </div>
      )}
    </ToastContext.Provider>
  );
}

// ── useToast hook ────────────────────────────────────────────────────────
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

// Default export for direct import of the item (rare use)
export default ToastItem;
