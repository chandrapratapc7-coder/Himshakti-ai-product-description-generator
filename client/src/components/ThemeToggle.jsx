// components/ThemeToggle.jsx
// A toggle button that switches between dark and light mode.
// Uses the useTheme() hook from ThemeContext.
//
// @prop {string} size — "sm" | "md"  (default "md")

import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ size = "md" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className={`theme-toggle theme-toggle--${size} ${isDark ? "theme-toggle--dark" : ""}`}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__thumb">
          {isDark ? "🌙" : "☀️"}
        </span>
      </span>

      <style>{`
        .theme-toggle {
          display: inline-flex; align-items: center;
          background: none; border: none; cursor: pointer;
          padding: 0; border-radius: 999px;
        }
        .theme-toggle:focus-visible {
          outline: 3px solid #2d6a4f; outline-offset: 3px;
        }

        /* Track */
        .theme-toggle__track {
          display: flex; align-items: center;
          width: 3rem; height: 1.6rem;
          background: #d5e8d4; border-radius: 999px;
          padding: .15rem;
          transition: background .2s;
          position: relative;
          border: 1.5px solid #b5d9c5;
        }
        .theme-toggle--dark .theme-toggle__track {
          background: #1a3a2a; border-color: #2d6a4f;
        }

        /* Thumb */
        .theme-toggle__thumb {
          width: 1.25rem; height: 1.25rem;
          background: #fff; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: .75rem; line-height: 1;
          box-shadow: 0 1px 4px rgba(0,0,0,.15);
          transition: transform .2s;
          position: absolute; left: .15rem;
        }
        .theme-toggle--dark .theme-toggle__thumb {
          transform: translateX(1.35rem);
          background: #2d6a4f;
        }

        /* Sizes */
        .theme-toggle--sm .theme-toggle__track {
          width: 2.4rem; height: 1.3rem;
        }
        .theme-toggle--sm .theme-toggle__thumb {
          width: 1rem; height: 1rem; font-size: .6rem;
        }
        .theme-toggle--sm.theme-toggle--dark .theme-toggle__thumb {
          transform: translateX(1.05rem);
        }
      `}</style>
    </button>
  );
}
