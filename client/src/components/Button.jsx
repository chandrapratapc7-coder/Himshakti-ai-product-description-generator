// Button.jsx
// Reusable button — variant: "primary" | "secondary" | "danger"
// size: "sm" | "md" | "lg"   isLoading: bool   fullWidth: bool

export default function Button({
    variant = "primary",
    size = "md",
    isLoading = false,
    disabled = false,
    fullWidth = false,
    onClick,
    type = "button",
    children,
  }) {
    const cls = [
      "hs-btn",
      `hs-btn--${variant}`,
      `hs-btn--${size}`,
      fullWidth   ? "hs-btn--full"    : "",
      isLoading   ? "hs-btn--loading" : "",
    ].filter(Boolean).join(" ");
  
    return (
      <>
        <button
          type={type}
          onClick={onClick}
          disabled={disabled || isLoading}
          className={cls}
        >
          {isLoading && <span className="hs-btn__spinner" aria-hidden />}
          <span className={isLoading ? "hs-btn__label--hidden" : ""}>
            {children}
          </span>
        </button>
  
        <style>{`
          .hs-btn {
            display: inline-flex; align-items: center; justify-content: center;
            gap: 0.45rem; position: relative;
            font-family: inherit; font-weight: 700; letter-spacing: 0.01em;
            border: 2px solid transparent; border-radius: 9px;
            cursor: pointer; white-space: nowrap;
            transition: background .15s, border-color .15s, color .15s,
                        box-shadow .15s, transform .1s, opacity .15s;
          }
          .hs-btn:focus-visible { outline: 3px solid #2d6a4f; outline-offset: 3px; }
          .hs-btn:active:not(:disabled) { transform: translateY(1px) scale(.99); }
          .hs-btn:disabled { opacity: .52; cursor: not-allowed; }
          .hs-btn--full { width: 100%; }
  
          /* Sizes */
          .hs-btn--sm { padding: .35rem .85rem; font-size: .8rem;  border-radius: 7px; }
          .hs-btn--md { padding: .6rem  1.2rem; font-size: .9rem;  }
          .hs-btn--lg { padding: .8rem  1.75rem; font-size: 1rem;  border-radius: 11px; }
  
          /* Primary */
          .hs-btn--primary {
            background: linear-gradient(135deg,#2d6a4f,#1b4d38);
            color:#fff; box-shadow:0 3px 12px rgba(45,106,79,.28);
          }
          .hs-btn--primary:hover:not(:disabled) {
            background: linear-gradient(135deg,#3a8060,#245f47);
            box-shadow:0 5px 18px rgba(45,106,79,.38); transform:translateY(-1px);
          }
  
          /* Secondary */
          .hs-btn--secondary {
            background:transparent; color:#2d6a4f; border-color:#2d6a4f;
          }
          .hs-btn--secondary:hover:not(:disabled) {
            background:#edf7f1; border-color:#1b4d38; color:#1b4d38; transform:translateY(-1px);
          }
  
          /* Danger */
          .hs-btn--danger {
            background:linear-gradient(135deg,#c0392b,#962d22);
            color:#fff; box-shadow:0 3px 12px rgba(192,57,43,.22);
          }
          .hs-btn--danger:hover:not(:disabled) {
            background:linear-gradient(135deg,#d44332,#a83226);
            box-shadow:0 5px 16px rgba(192,57,43,.32); transform:translateY(-1px);
          }
  
          /* Spinner */
          .hs-btn__spinner {
            position:absolute; width:1em; height:1em;
            border:2px solid rgba(255,255,255,.35); border-top-color:#fff;
            border-radius:50%; animation:hs-spin .65s linear infinite;
          }
          .hs-btn--secondary .hs-btn__spinner {
            border-color:rgba(45,106,79,.3); border-top-color:#2d6a4f;
          }
          .hs-btn__label--hidden { visibility:hidden; }
  
          @keyframes hs-spin { to { transform:rotate(360deg); } }
          @media(prefers-reduced-motion:reduce){
            .hs-btn { transition:none; }
            .hs-btn__spinner { animation:none; opacity:.6; }
          }
        `}</style>
      </>
    );
  }
  