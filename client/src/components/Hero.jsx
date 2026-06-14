// components/Hero.jsx
// Hero section displayed on the Home page.

export default function Hero() {
    return (
      <section className="hero-section">
        <div className="hero-inner">
          {/* Badge */}
          <span className="hero-badge">🏔 Himalayan Food Tech</span>
  
          {/* Headline */}
          <h1 className="hero-title">
            Generate Product Descriptions <br />
            <span className="hero-title--accent">Powered by AI</span>
          </h1>
  
          {/* Subheading */}
          <p className="hero-subtitle">
            HimShakti AI helps Himalayan food brands create professional,
            platform-ready product listings for Amazon, Flipkart, Instagram,
            and more — in seconds.
          </p>
  
          {/* CTA Buttons */}
          <div className="hero-cta-row">
            <a href="/generator" className="hero-btn hero-btn--primary">
              ✦ Start Generating
            </a>
            <a href="/about" className="hero-btn hero-btn--secondary">
              Learn More →
            </a>
          </div>
  
          {/* Stats row */}
          <div className="hero-stats">
            {[
              { value: "6+",    label: "Platforms Supported" },
              { value: "3",     label: "Writing Tones" },
              { value: "100%",  label: "Free to Use" },
              { value: "10s",   label: "Avg. Generation Time" },
            ].map((s) => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat__value">{s.value}</span>
                <span className="hero-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Decorative mountain silhouette */}
        <div className="hero-decor" aria-hidden="true">
          <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
            <polygon points="0,200 200,60 400,140 600,20 800,120 1000,50 1200,110 1200,200"
              fill="rgba(45,106,79,0.06)" />
            <polygon points="0,200 300,80 550,160 750,40 950,130 1200,70 1200,200"
              fill="rgba(45,106,79,0.04)" />
          </svg>
        </div>
  
        <style>{`
          .hero-section {
            position: relative;
            background: linear-gradient(160deg, #f0faf4 0%, #e8f5ee 50%, #f4f9f6 100%);
            border-bottom: 1px solid #d5e8d4;
            overflow: hidden;
            padding: 4rem 1.5rem 3rem;
          }
          .hero-inner {
            max-width: 780px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            z-index: 1;
          }
  
          /* Badge */
          .hero-badge {
            display: inline-block;
            padding: .35rem .9rem;
            background: #e0f2e9;
            border: 1px solid #b5d9c5;
            border-radius: 999px;
            font-size: .78rem;
            font-weight: 700;
            color: #2d6a4f;
            letter-spacing: .04em;
            text-transform: uppercase;
            margin-bottom: 1.25rem;
          }
  
          /* Title */
          .hero-title {
            font-size: clamp(1.8rem, 5vw, 3rem);
            font-weight: 900;
            color: #1a3a2a;
            line-height: 1.18;
            margin: 0 0 1rem;
            letter-spacing: -.02em;
          }
          .hero-title--accent {
            color: #2d6a4f;
            position: relative;
          }
          .hero-title--accent::after {
            content: '';
            position: absolute;
            bottom: -3px; left: 0; right: 0;
            height: 3px;
            background: linear-gradient(90deg, #f4a261, #2d6a4f);
            border-radius: 2px;
          }
  
          /* Subtitle */
          .hero-subtitle {
            font-size: 1.05rem;
            color: #4a7c5e;
            line-height: 1.7;
            margin: 0 auto 2rem;
            max-width: 600px;
          }
  
          /* CTA */
          .hero-cta-row {
            display: flex;
            gap: .875rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 2.5rem;
          }
          .hero-btn {
            display: inline-flex;
            align-items: center;
            gap: .4rem;
            padding: .75rem 1.75rem;
            border-radius: 10px;
            font-size: .95rem;
            font-weight: 700;
            text-decoration: none;
            transition: transform .15s, box-shadow .15s, background .15s;
          }
          .hero-btn:hover { transform: translateY(-2px); }
          .hero-btn--primary {
            background: linear-gradient(135deg, #2d6a4f, #1b4d38);
            color: #fff;
            box-shadow: 0 4px 16px rgba(45,106,79,.3);
          }
          .hero-btn--primary:hover { box-shadow: 0 7px 22px rgba(45,106,79,.4); }
          .hero-btn--secondary {
            background: #fff;
            color: #2d6a4f;
            border: 2px solid #2d6a4f;
          }
          .hero-btn--secondary:hover { background: #edf7f1; }
  
          /* Stats */
          .hero-stats {
            display: flex;
            justify-content: center;
            gap: 2.5rem;
            flex-wrap: wrap;
          }
          .hero-stat { text-align: center; }
          .hero-stat__value {
            display: block;
            font-size: 1.6rem;
            font-weight: 900;
            color: #1a3a2a;
            line-height: 1;
          }
          .hero-stat__label {
            font-size: .75rem;
            color: #6b9e82;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .04em;
          }
  
          /* Decor */
          .hero-decor {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 100px;
            pointer-events: none;
          }
          .hero-decor svg { width: 100%; height: 100%; }
  
          @media (max-width: 480px) {
            .hero-section { padding: 3rem 1rem 2rem; }
            .hero-stats { gap: 1.5rem; }
          }
        `}</style>
      </section>
    );
  }
  