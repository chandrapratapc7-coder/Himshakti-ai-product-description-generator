// components/Modal.jsx
/**
 * Modal — accessible dialog overlay.
 *
 * @prop {boolean}  isOpen   — controls visibility
 * @prop {function} onClose  — called when modal should close
 * @prop {string}   title    — modal heading text
 * @prop {string}   size     — "sm" | "md" | "lg"  (default "md")
 * @prop {node}     children — modal body content
 */

import { useEffect, useRef } from "react";

export default function Modal({
  isOpen,
  onClose,
  title = "",
  size = "md",
  children,
}) {
  const overlayRef = useRef(null);
  const firstFocusRef = useRef(null);

  // ── Close on Escape key ───────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // ── Focus trap — focus first focusable element when modal opens ───────
  useEffect(() => {
    if (isOpen && firstFocusRef.current) {
      firstFocusRef.current.focus();
    }
  }, [isOpen]);

  // ── Prevent background scroll when open ──────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  // Click on overlay (not dialog) → close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={`modal-box modal-box--${size}`}>
        {/* Header */}
        <div className="modal-header">
          {title && (
            <h2 id="modal-title" className="modal-title">{title}</h2>
          )}
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
            ref={firstFocusRef}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">{children}</div>
      </div>

      <style>{`
        /* Overlay */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(15,36,25,.55);
          backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
          animation: modal-fade-in .18s ease;
        }
        @keyframes modal-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Dialog box */
        .modal-box {
          background: #ffffff;
          border: 1px solid #d5e8d4;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(15,36,25,.25);
          width: 100%; max-height: 90vh;
          display: flex; flex-direction: column;
          overflow: hidden;
          animation: modal-slide-up .2s ease;
        }
        @keyframes modal-slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* Sizes */
        .modal-box--sm { max-width: 380px; }
        .modal-box--md { max-width: 560px; }
        .modal-box--lg { max-width: 780px; }

        /* Header */
        .modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #edf7f1;
          flex-shrink: 0;
        }
        .modal-title {
          font-size: 1.05rem; font-weight: 800; color: #1a3a2a; margin: 0;
        }
        .modal-close {
          width: 2rem; height: 2rem;
          display: flex; align-items: center; justify-content: center;
          background: #f4f9f6; border: 1px solid #d5e8d4;
          border-radius: 50%; cursor: pointer;
          font-size: .85rem; color: #4a7c5e;
          transition: background .14s, color .14s;
          flex-shrink: 0;
        }
        .modal-close:hover { background: #e0f2e9; color: #1a3a2a; }
        .modal-close:focus-visible { outline: 3px solid #2d6a4f; outline-offset: 2px; }

        /* Body */
        .modal-body {
          padding: 1.5rem;
          overflow-y: auto;
          font-size: .9rem; color: #4a7c5e; line-height: 1.65;
        }
      `}</style>
    </div>
  );
}
