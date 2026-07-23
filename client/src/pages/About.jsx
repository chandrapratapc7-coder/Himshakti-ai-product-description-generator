import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="about-page">
      <Navbar />

      <main className="about-main">
        <div className="about-inner">

          {/* Page heading */}
          <div className="page-header">
            <span className="page-eyebrow">Our Story</span>
            <h1 className="page-title">About HimShakti</h1>
            <p className="page-subtitle">
              Learn about the HimShakti Food Processing Unit and the mission
              behind this AI-powered description generator.
            </p>
          </div>

          {/* Content blocks */}
          <div className="about-grid">
            <div className="about-block">
              <h2 className="about-block__title">🏔 Who We Are</h2>
              <p className="about-block__text">
                HimShakti is a Himalayan food processing unit based in
                Uttarakhand, India. We produce traditional mountain food
                products including millet snacks, pickles, jams, juices, and
                chutneys — crafted using age-old Pahadi recipes and locally
                sourced ingredients.
              </p>
            </div>

            <div className="about-block">
              <h2 className="about-block__title">🤖 About This Project</h2>
              <p className="about-block__text">
                This web application was built as an internship project to help
                HimShakti generate professional, platform-optimised product
                descriptions using artificial intelligence. The tool reduces
                the time and effort needed to create listings for Amazon,
                Flipkart, Meesho, Instagram, WhatsApp, and D2C storefronts,
                with every generated description saved automatically to your
                account.
              </p>
            </div>

            <div className="about-block">
              <h2 className="about-block__title">🎯 Our Goal</h2>
              <p className="about-block__text">
                Our goal is to empower small-scale Himalayan food producers
                with modern digital tools — making it easy for them to reach
                customers across India and beyond through well-written,
                SEO-optimised product content.
              </p>
            </div>

            <div className="about-block">
              <h2 className="about-block__title">👨‍💻 Built By</h2>
              <p className="about-block__text">
                This project was built by <strong>Chandra Pratap Singh</strong>,
                an intern at TBI-GEU, as part of a 10-week full-stack
                development programme covering authentication, database design,
                AI API integration, and production-grade frontend polish.
              </p>
            </div>
          </div>

          {/* Tech stack pills */}
          <div className="about-tech">
            <h3 className="about-tech__heading">Tech Stack Used</h3>
            <div className="about-tech__pills">
              {["React.js + Vite", "Node.js + Express", "MongoDB Atlas",
                "JWT + bcrypt Auth", "Google OAuth (Passport.js)",
                "Gemini AI (@google/genai)", "OpenAI (fallback)"].map((t) => (
                <span key={t} className="about-tech__pill">{t}</span>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <style>{`
        .about-page {
          min-height: 100vh; display: flex; flex-direction: column;
          background: #f4f9f6;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }
        .about-main { flex: 1; padding: 3rem 1.5rem; }
        .about-inner { max-width: 960px; margin: 0 auto; }

        .page-header { text-align: center; margin-bottom: 2.5rem; }
        .page-eyebrow {
          display: inline-block; font-size: .75rem; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase; color: #2d6a4f;
          background: #e0f2e9; padding: .25rem .75rem;
          border-radius: 999px; margin-bottom: .75rem;
        }
        .page-title {
          font-size: clamp(1.6rem, 4vw, 2.2rem); font-weight: 900;
          color: #1a3a2a; margin: 0 0 .75rem; letter-spacing: -.02em;
        }
        .page-subtitle {
          font-size: .95rem; color: #4a7c5e;
          max-width: 520px; margin: 0 auto; line-height: 1.65;
        }

        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1.25rem; margin-bottom: 2rem;
        }
        .about-block {
          background: #fff; border: 1px solid #d5e8d4;
          border-radius: 12px; padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(45,106,79,.06);
        }
        .about-block__title {
          font-size: 1rem; font-weight: 800; color: #1a3a2a; margin: 0 0 .65rem;
        }
        .about-block__text {
          font-size: .875rem; color: #4a7c5e; margin: 0; line-height: 1.7;
        }

        .about-tech {
          background: #fff; border: 1px solid #d5e8d4;
          border-radius: 12px; padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(45,106,79,.06);
        }
        .about-tech__heading {
          font-size: .875rem; font-weight: 700; color: #1a3a2a; margin: 0 0 .875rem;
        }
        .about-tech__pills { display: flex; flex-wrap: wrap; gap: .5rem; }
        .about-tech__pill {
          padding: .35rem .85rem;
          background: #edf7f1; border: 1px solid #c8dfc8;
          border-radius: 999px; font-size: .8rem; font-weight: 600; color: #2d6a4f;
        }

        /* ── Responsive pass: 768px / 375px ── */
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-main { padding: 2rem 1.25rem; }
        }
        @media (max-width: 375px) {
          .about-main { padding: 1.5rem 1rem; }
          .about-block { padding: 1.15rem; }
        }
      `}</style>
    </div>
  );
}
