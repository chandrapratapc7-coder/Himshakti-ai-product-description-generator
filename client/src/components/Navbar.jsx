// Navbar.jsx
// Top navigation bar with HimShakti branding and nav links.

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* ── Brand ── */}
        <a href="/" className="brand">
          <span className="brand-icon">🏔</span>
          <div className="brand-text">
            <span className="brand-name">HimShakti</span>
            <span className="brand-tagline">AI Content Generator</span>
          </div>
        </a>

        {/* ── Desktop links ── */}
        <ul className="nav-links">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/generator" className="nav-link nav-link--active">Generator</a></li>
          <li><a href="/saved" className="nav-link">Saved</a></li>
          <li><a href="/dashboard" className="nav-link">Dashboard</a></li>
        </ul>

        {/* ── CTA ── */}
        <a href="/generator" className="nav-cta">
          ✦ Generate
        </a>

        {/* ── Mobile hamburger ── */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${menuOpen ? "hamburger-line--open-1" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "hamburger-line--open-2" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "hamburger-line--open-3" : ""}`} />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="mobile-menu">
          {["Home", "Generator", "Saved", "Dashboard"].map((item) => (
            <a
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #d5e8d4;
          box-shadow: 0 1px 8px rgba(45,106,79,0.07);
        }
        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
          height: 62px;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        /* Brand */
        .brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          flex-shrink: 0;
        }
        .brand-icon { font-size: 1.6rem; }
        .brand-text { display: flex; flex-direction: column; line-height: 1.1; }
        .brand-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: #1a3a2a;
          letter-spacing: -0.01em;
        }
        .brand-tagline {
          font-size: 0.65rem;
          color: #6b9e82;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* Desktop nav */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
        }
        .nav-link {
          padding: 0.4rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #4a7c5e;
          text-decoration: none;
          border-radius: 6px;
          transition: background 0.14s, color 0.14s;
        }
        .nav-link:hover { background: #f0faf4; color: #1a3a2a; }
        .nav-link--active {
          color: #2d6a4f;
          background: #e8f5ee;
        }

        /* CTA */
        .nav-cta {
          flex-shrink: 0;
          padding: 0.45rem 1.1rem;
          background: #2d6a4f;
          color: #fff;
          font-size: 0.875rem;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.14s, transform 0.1s;
        }
        .nav-cta:hover { background: #1a4a34; transform: translateY(-1px); }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          margin-left: auto;
        }
        .hamburger-line {
          width: 22px;
          height: 2px;
          background: #2d6a4f;
          border-radius: 2px;
          transition: transform 0.2s, opacity 0.2s;
        }
        .hamburger-line--open-1 { transform: translateY(7px) rotate(45deg); }
        .hamburger-line--open-2 { opacity: 0; }
        .hamburger-line--open-3 { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile menu */
        .mobile-menu {
          display: flex;
          flex-direction: column;
          border-top: 1px solid #d5e8d4;
          padding: 0.5rem 1.25rem 1rem;
          background: #fff;
        }
        .mobile-link {
          padding: 0.7rem 0;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1a3a2a;
          text-decoration: none;
          border-bottom: 1px solid #edf7f0;
        }
        .mobile-link:last-child { border-bottom: none; }

        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
    </nav>
  );
}
