// components/Footer.jsx
// Site-wide footer with branding, navigation links, and copyright.

export default function Footer() {
    const year = new Date().getFullYear();
  
    const links = {
      Product: [
        { label: "Generator",  href: "/generator"  },
        { label: "Saved",      href: "/saved"       },
        { label: "Dashboard",  href: "/dashboard"   },
      ],
      Company: [
        { label: "About",      href: "/about"   },
        { label: "Login",      href: "/login"   },
        { label: "Register",   href: "/register" },
      ],
      Platforms: [
        { label: "Amazon",     href: "#" },
        { label: "Flipkart",   href: "#" },
        { label: "Meesho",     href: "#" },
        { label: "Instagram",  href: "#" },
      ],
    };
  
    return (
      <footer className="hs-footer">
        <div className="hs-footer__inner">
  
          {/* Brand column */}
          <div className="hs-footer__brand">
            <a href="/" className="hs-footer__logo">
              <span className="hs-footer__logo-icon">🏔</span>
              <span className="hs-footer__logo-name">HimShakti</span>
            </a>
            <p className="hs-footer__tagline">
              AI-powered product content for Himalayan food brands.
              From Uttarakhand to every e-commerce platform.
            </p>
            <div className="hs-footer__badges">
              <span className="hs-footer__badge">⚡ AI-Powered</span>
              <span className="hs-footer__badge">🌿 Made in Uttarakhand</span>
            </div>
          </div>
  
          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading} className="hs-footer__col">
              <h4 className="hs-footer__col-heading">{heading}</h4>
              <ul className="hs-footer__col-list">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hs-footer__link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
  
        {/* Bottom bar */}
        <div className="hs-footer__bottom">
          <p className="hs-footer__copy">
            © {year} HimShakti Food Processing Unit. All rights reserved.
          </p>
          <p className="hs-footer__intern">
            Built by <strong>Chandra Pratap Singh</strong> · Internship Project · TBI-GEU
          </p>
        </div>
  
        <style>{`
          .hs-footer {
            background: #0f2419;
            color: #a8c8b4;
            margin-top: auto;
          }
  
          .hs-footer__inner {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 1.5rem 2rem;
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 2.5rem;
          }
  
          /* Brand */
          .hs-footer__logo {
            display: flex;
            align-items: center;
            gap: .5rem;
            text-decoration: none;
            margin-bottom: .875rem;
          }
          .hs-footer__logo-icon { font-size: 1.5rem; }
          .hs-footer__logo-name {
            font-size: 1.1rem;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -.01em;
          }
          .hs-footer__tagline {
            font-size: .82rem;
            line-height: 1.65;
            color: #7a9e8a;
            margin: 0 0 1rem;
            max-width: 260px;
          }
          .hs-footer__badges {
            display: flex;
            gap: .5rem;
            flex-wrap: wrap;
          }
          .hs-footer__badge {
            padding: .25rem .65rem;
            background: rgba(45,106,79,.3);
            border: 1px solid rgba(45,106,79,.5);
            border-radius: 999px;
            font-size: .7rem;
            font-weight: 600;
            color: #7dcca0;
          }
  
          /* Link columns */
          .hs-footer__col-heading {
            font-size: .75rem;
            font-weight: 800;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: .08em;
            margin: 0 0 1rem;
          }
          .hs-footer__col-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: .55rem;
          }
          .hs-footer__link {
            font-size: .85rem;
            color: #7a9e8a;
            text-decoration: none;
            transition: color .14s;
          }
          .hs-footer__link:hover { color: #7dcca0; }
  
          /* Bottom bar */
          .hs-footer__bottom {
            border-top: 1px solid rgba(255,255,255,.07);
            padding: 1.25rem 1.5rem;
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: .5rem;
          }
          .hs-footer__copy, .hs-footer__intern {
            font-size: .78rem;
            color: #4d7a60;
            margin: 0;
          }
          .hs-footer__intern strong { color: #7a9e8a; }
  
          /* Responsive */
          @media (max-width: 768px) {
            .hs-footer__inner {
              grid-template-columns: 1fr 1fr;
              gap: 2rem;
            }
            .hs-footer__brand { grid-column: 1 / -1; }
          }
          @media (max-width: 480px) {
            .hs-footer__inner { grid-template-columns: 1fr; }
            .hs-footer__bottom { flex-direction: column; text-align: center; }
          }
        `}</style>
      </footer>
    );
  }
  