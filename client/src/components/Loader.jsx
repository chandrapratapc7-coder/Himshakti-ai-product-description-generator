// components/Loader.jsx
/**
 * Loader — spinner or skeleton for data fetching states.
 *
 * @prop {string}  type    — "spinner" | "skeleton" | "dots"  (default "spinner")
 * @prop {string}  size    — "sm" | "md" | "lg"               (default "md")
 * @prop {string}  text    — optional label below spinner
 * @prop {number}  lines   — number of skeleton lines          (default 3, skeleton only)
 * @prop {boolean} fullPage — centres loader in full viewport  (default false)
 */

export default function Loader({
    type = "spinner",
    size = "md",
    text = "",
    lines = 3,
    fullPage = false,
  }) {
    return (
      <div className={`loader-wrap ${fullPage ? "loader-wrap--full" : ""}`}>
  
        {/* ── Spinner ── */}
        {type === "spinner" && (
          <div className={`loader-spinner loader-spinner--${size}`} aria-label="Loading" />
        )}
  
        {/* ── Dots ── */}
        {type === "dots" && (
          <div className="loader-dots" aria-label="Loading">
            <span /><span /><span />
          </div>
        )}
  
        {/* ── Skeleton ── */}
        {type === "skeleton" && (
          <div className="loader-skeleton">
            {Array.from({ length: lines }).map((_, i) => (
              <div
                key={i}
                className="loader-skeleton__bar"
                style={{ width: `${100 - (i % 3) * 15}%` }}
              />
            ))}
          </div>
        )}
  
        {/* Optional label */}
        {text && type !== "skeleton" && (
          <p className="loader-text">{text}</p>
        )}
  
        <style>{`
          /* Wrapper */
          .loader-wrap {
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            gap: .75rem;
          }
          .loader-wrap--full {
            position: fixed; inset: 0; z-index: 500;
            background: rgba(244,249,246,.85);
            backdrop-filter: blur(2px);
          }
  
          /* ── Spinner ── */
          .loader-spinner {
            border-radius: 50%;
            border: 3px solid #d5e8d4;
            border-top-color: #2d6a4f;
            animation: loader-spin .7s linear infinite;
            flex-shrink: 0;
          }
          .loader-spinner--sm { width: 1.25rem; height: 1.25rem; border-width: 2px; }
          .loader-spinner--md { width: 2.25rem; height: 2.25rem; }
          .loader-spinner--lg { width: 3.5rem;  height: 3.5rem;  border-width: 4px; }
  
          @keyframes loader-spin { to { transform: rotate(360deg); } }
  
          /* ── Dots ── */
          .loader-dots {
            display: flex; align-items: center; gap: .4rem;
          }
          .loader-dots span {
            width: .65rem; height: .65rem;
            background: #2d6a4f; border-radius: 50%;
            animation: loader-bounce .7s ease-in-out infinite;
          }
          .loader-dots span:nth-child(2) { animation-delay: .15s; }
          .loader-dots span:nth-child(3) { animation-delay: .3s;  }
          @keyframes loader-bounce {
            0%,80%,100% { transform: scale(0.7); opacity: .5; }
            40%          { transform: scale(1.1); opacity: 1;  }
          }
  
          /* ── Skeleton ── */
          .loader-skeleton {
            width: 100%; display: flex; flex-direction: column; gap: .6rem;
          }
          .loader-skeleton__bar {
            height: 14px; border-radius: 6px;
            background: linear-gradient(
              90deg,
              #e8f5ee 25%,
              #d5e8d4 50%,
              #e8f5ee 75%
            );
            background-size: 200% 100%;
            animation: loader-shimmer 1.4s infinite;
          }
          @keyframes loader-shimmer {
            to { background-position: -200% 0; }
          }
  
          /* Label */
          .loader-text {
            font-size: .85rem; font-weight: 600; color: #6b9e82;
            margin: 0; font-family: 'Inter', system-ui, sans-serif;
          }
  
          /* Reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .loader-spinner,
            .loader-dots span,
            .loader-skeleton__bar {
              animation: none;
            }
          }
        `}</style>
      </div>
    );
  }
  