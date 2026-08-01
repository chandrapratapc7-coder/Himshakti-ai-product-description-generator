// Navbar.jsx
// Top navigation bar with HimShakti branding, nav links, and dark/light toggle.

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home",      path: "/"          },
    { label: "Generator", path: "/generator" },
    { label: "Saved",     path: "/saved"     },
    { label: "Dashboard", path: "/dashboard" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* -- Brand -- */}
        <Link to="/" className="brand">
          <span className="brand-icon">🏔</span>
          <div className="brand-text">
            <span className="brand-name">HimShakti</span>
            <span className="brand-tagline">AI Content Generator</span>
          </div>
        </Link>

        {/* -- Desktop links -- */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "nav-link--active" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* -- Right side: theme toggle + CTA -- */}
        <div className="nav-right">
          <ThemeToggle size="sm" />
          <Link to="/generator" className="nav-cta">
            ✦ Generate
          </Link>
        </div>

        {/* -- Mobile: theme toggle + hamburger -- */}
        <div className="nav-mobile-right">
          <ThemeToggle size="sm" />
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
      </div>

      {/* -- Mobile menu -- */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .navbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #d5e8d4;
          box-shadow: 0 1px 8px rgba(45,106,79,0.07);
          transition: background .2s, border-color .2s;
        }

        /* Dark mode -- neutral charcoal, green reserved for active link + CTA */
        .dark .navbar {
          background: rgba(15,17,21,0.97);
          border-bottom-color: #30363D;
          box-shadow: 0 1px 8px rgba(0,0,0,0.45);
        }

        .navbar-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 1.25rem; height: 62px;
          display: flex; align-items: center; gap: 1.5rem;
        }

        /* Brand */
        .brand {
          display: flex; align-items: center; gap: .6rem;
          text-decoration: none; flex-shrink: 0;
        }
        .brand-icon { font-size: 1.6rem; }
        .brand-text { display: flex; flex-direction: column; line-height: 1.1; }
        .brand-name {
          font-size: 1.05rem; font-weight: 800; color: #1a3a2a; letter-spacing: -.01em;
        }
        .dark .brand-name { color: #F3F4F6; }
        .brand-tagline {
          font-size: .65rem; color: #6b9e82; font-weight: 500;
          letter-spacing: .04em; text-transform: uppercase;
        }
        .dark .brand-tagline { color: #8B949E; }

        /* Desktop nav links */
        .nav-links {
          display: flex; align-items: center; gap: .25rem;
          list-style: none; margin: 0; padding: 0; flex: 1;
        }
        .nav-link {
          padding: .4rem .75rem; font-size: .875rem; font-weight: 600;
          color: #4a7c5e; text-decoration: none;
          border-radius: 6px; transition: background .14s, color .14s;
        }
        .nav-link:hover { background: #f0faf4; color: #1a3a2a; }
        .dark .nav-link { color: #C9D1D9; }
        .dark .nav-link:hover { background: #1C2128; color: #F3F4F6; }
        .nav-link--active { color: #2d6a4f; background: #e8f5ee; }
        /* Active link is the one deliberate green accent in the nav -- matches
           spec's "active states" carve-out, not a general background tint */
        .dark .nav-link--active { color: #22C55E; background: rgba(34, 197, 94, .12); }

        /* Right group */
        .nav-right {
          display: flex; align-items: center; gap: .875rem; flex-shrink: 0;
        }
        .nav-cta {
          padding: .45rem 1.1rem;
          background: #2d6a4f; color: #fff;
          font-size: .875rem; font-weight: 700;
          border-radius: 8px; text-decoration: none;
          transition: background .14s, transform .1s;
          white-space: nowrap;
        }
        .nav-cta:hover { background: #1a4a34; transform: translateY(-1px); }
        /* Primary CTA button -- legitimate green use per spec, shifted to the
           dark-mode accent shade for correct contrast against the dark navbar */
        .dark .nav-cta { background: #22C55E; color: #0F1115; }
        .dark .nav-cta:hover { background: #16A34A; }

        /* Mobile right group */
        .nav-mobile-right {
          display: none; align-items: center; gap: .75rem; margin-left: auto;
        }
        .hamburger {
          display: flex; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger-line {
          width: 22px; height: 2px; background: #2d6a4f;
          border-radius: 2px; transition: transform .2s, opacity .2s;
        }
        .dark .hamburger-line { background: #F3F4F6; }
        .hamburger-line--open-1 { transform: translateY(7px) rotate(45deg); }
        .hamburger-line--open-2 { opacity: 0; }
        .hamburger-line--open-3 { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile dropdown menu */
        .mobile-menu {
          display: flex; flex-direction: column;
          border-top: 1px solid #d5e8d4;
          padding: .5rem 1.25rem 1rem;
          background: #fff;
        }
        .dark .mobile-menu { background: #0F1115; border-top-color: #30363D; }
        .mobile-link {
          padding: .7rem 0; font-size: .95rem; font-weight: 600;
          color: #1a3a2a; text-decoration: none;
          border-bottom: 1px solid #edf7f0;
        }
        .dark .mobile-link { color: #F3F4F6; border-bottom-color: #30363D; }
        .mobile-link:last-child { border-bottom: none; }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-links, .nav-right { display: none; }
          .nav-mobile-right { display: flex; }
        }
      `}</style>
    </nav>
  );
}
