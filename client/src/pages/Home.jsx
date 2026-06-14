// pages/Home.jsx
// Landing page — uses Navbar, Hero, Card (×6 in grid), and Footer.

import Navbar from "../components/Navbar";
import Hero   from "../components/Hero";
import Card   from "../components/Card";
import Footer from "../components/Footer";

// ── Feature cards data ──────────────────────────────────────────────────────
const FEATURES = [
  {
    icon:   "🤖",
    title:  "AI-Generated Descriptions",
    body:   "Instantly generate professional product titles, short descriptions, long descriptions, and bullet points using AI.",
    tag:    "Core Feature",
    accent: "green",
  },
  {
    icon:   "🎨",
    title:  "Three Writing Tones",
    body:   "Choose Premium, Traditional, or Health-focused tone to match your brand voice and target audience.",
    tag:    "Customisable",
    accent: "saffron",
  },
  {
    icon:   "📱",
    title:  "Multi-Platform Ready",
    body:   "Generate content optimised for Amazon, Flipkart, Meesho, Instagram, WhatsApp, and D2C websites.",
    tag:    "6+ Platforms",
    accent: "blue",
  },
  {
    icon:   "✏️",
    title:  "Fully Editable Output",
    body:   "Every generated section is editable directly in the app. Tweak the copy before copying to your listing.",
    accent: "green",
  },
  {
    icon:   "💾",
    title:  "Save Your Listings",
    body:   "Save generated product descriptions locally and access them anytime from your Saved Listings page.",
    accent: "saffron",
  },
  {
    icon:   "🔍",
    title:  "SEO Keywords Included",
    body:   "The generator also produces 8–12 relevant SEO keywords to improve your product's visibility on search.",
    accent: "blue",
  },
];

// ── Product category cards ──────────────────────────────────────────────────
const CATEGORIES = [
  { icon: "🌾", title: "Millet Snacks",    body: "Mandua cookies, ragi chips, and finger millet-based healthy snacks.", accent: "green"   },
  { icon: "🫙", title: "Pickles & Achaar", body: "Traditional Pahadi pickles made with mountain herbs and spices.",      accent: "saffron" },
  { icon: "🍹", title: "Juices & Drinks",  body: "Natural buransh (rhododendron) juice, herbal squashes, and more.",    accent: "blue"    },
  { icon: "🍯", title: "Jams & Preserves", body: "Himalayan fruit jams — apricot, wild strawberry, and kafal.",         accent: "green"   },
];

// ── Component ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />

      {/* ── Features Section ── */}
      <section className="home-section">
        <div className="home-section__inner">
          <div className="home-section__header">
            <span className="home-section__eyebrow">What It Does</span>
            <h2 className="home-section__title">Everything You Need for Better Listings</h2>
            <p className="home-section__subtitle">
              HimShakti AI handles all the copywriting so you can focus on making great products.
            </p>
          </div>
          <div className="home-grid home-grid--3">
            {FEATURES.map((f) => (
              <Card key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Categories Section ── */}
      <section className="home-section home-section--alt">
        <div className="home-section__inner">
          <div className="home-section__header">
            <span className="home-section__eyebrow">Supported Products</span>
            <h2 className="home-section__title">Made for Himalayan Food Categories</h2>
            <p className="home-section__subtitle">
              Designed specifically for the product range of HimShakti Food Processing Unit.
            </p>
          </div>
          <div className="home-grid home-grid--4">
            {CATEGORIES.map((c) => (
              <Card key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="home-section">
        <div className="home-section__inner">
          <div className="home-section__header">
            <span className="home-section__eyebrow">Simple Process</span>
            <h2 className="home-section__title">How It Works</h2>
          </div>
          <div className="home-steps">
            {[
              { step: "01", title: "Enter Product Details",    desc: "Fill in the product name, ingredients, category, weight, and key features." },
              { step: "02", title: "Choose Tone & Platforms",  desc: "Select your writing tone and the platforms you want to publish on." },
              { step: "03", title: "Generate & Edit",          desc: "Click Generate — review and edit the AI output in the editable sections." },
              { step: "04", title: "Copy & Publish",           desc: "Copy individual sections or everything at once and paste into your listing." },
            ].map((s) => (
              <div key={s.step} className="home-step">
                <span className="home-step__num">{s.step}</span>
                <h3 className="home-step__title">{s.title}</h3>
                <p className="home-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="home-cta-banner">
        <div className="home-section__inner home-cta-inner">
          <h2 className="home-cta__title">Ready to Write Better Listings?</h2>
          <p className="home-cta__sub">
            Start generating AI-powered product descriptions for your HimShakti products today.
          </p>
          <a href="/generator" className="home-cta__btn">✦ Open the Generator</a>
        </div>
      </section>

      <Footer />

      <style>{`
        .home-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f4f9f6;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }

        /* Section wrapper */
        .home-section { padding: 4rem 1.5rem; }
        .home-section--alt { background: #edf7f1; }
        .home-section__inner { max-width: 1200px; margin: 0 auto; }

        /* Section header */
        .home-section__header { text-align: center; margin-bottom: 2.5rem; }
        .home-section__eyebrow {
          display: inline-block;
          font-size: .75rem; font-weight: 700; letter-spacing: .08em;
          text-transform: uppercase; color: #2d6a4f;
          background: #e0f2e9; padding: .25rem .75rem;
          border-radius: 999px; margin-bottom: .75rem;
        }
        .home-section__title {
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 900; color: #1a3a2a;
          margin: 0 0 .75rem; letter-spacing: -.02em;
        }
        .home-section__subtitle {
          font-size: .95rem; color: #4a7c5e;
          max-width: 520px; margin: 0 auto; line-height: 1.6;
        }

        /* Grids */
        .home-grid { display: grid; gap: 1.25rem; }
        .home-grid--3 { grid-template-columns: repeat(3, 1fr); }
        .home-grid--4 { grid-template-columns: repeat(4, 1fr); }

        /* Steps */
        .home-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          position: relative;
        }
        .home-steps::before {
          content: '';
          position: absolute;
          top: 1.5rem; left: 10%; right: 10%;
          height: 2px;
          background: linear-gradient(90deg, #2d6a4f, #f4a261);
          z-index: 0;
        }
        .home-step {
          text-align: center;
          padding: 1.25rem;
          background: #fff;
          border: 1px solid #d5e8d4;
          border-radius: 12px;
          position: relative;
          z-index: 1;
        }
        .home-step__num {
          display: inline-flex; align-items: center; justify-content: center;
          width: 2.5rem; height: 2.5rem;
          background: #2d6a4f; color: #fff;
          border-radius: 50%;
          font-size: .85rem; font-weight: 800;
          margin-bottom: .75rem;
          box-shadow: 0 3px 10px rgba(45,106,79,.3);
        }
        .home-step__title {
          font-size: .9rem; font-weight: 800; color: #1a3a2a; margin: 0 0 .4rem;
        }
        .home-step__desc { font-size: .8rem; color: #4a7c5e; margin: 0; line-height: 1.55; }

        /* CTA Banner */
        .home-cta-banner {
          background: linear-gradient(135deg, #1a3a2a, #2d6a4f);
          padding: 4rem 1.5rem;
        }
        .home-cta-inner { text-align: center; }
        .home-cta__title {
          font-size: clamp(1.5rem, 3.5vw, 2.2rem);
          font-weight: 900; color: #fff;
          margin: 0 0 .75rem;
        }
        .home-cta__sub {
          font-size: .95rem; color: #a8d8b4;
          margin: 0 0 1.75rem; max-width: 480px; margin-left: auto; margin-right: auto;
        }
        .home-cta__btn {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .85rem 2rem;
          background: #f4a261; color: #1a3a2a;
          font-size: 1rem; font-weight: 800;
          border-radius: 10px; text-decoration: none;
          transition: transform .15s, box-shadow .15s;
          box-shadow: 0 4px 16px rgba(244,162,97,.35);
        }
        .home-cta__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 22px rgba(244,162,97,.45);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .home-grid--3 { grid-template-columns: 1fr 1fr; }
          .home-grid--4 { grid-template-columns: 1fr 1fr; }
          .home-steps   { grid-template-columns: 1fr 1fr; }
          .home-steps::before { display: none; }
        }
        @media (max-width: 540px) {
          .home-grid--3, .home-grid--4, .home-steps { grid-template-columns: 1fr; }
          .home-section { padding: 2.5rem 1rem; }
        }
      `}</style>
    </div>
  );
}
