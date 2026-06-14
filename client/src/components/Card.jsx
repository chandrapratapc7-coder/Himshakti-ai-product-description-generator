// components/Card.jsx
// Reusable card — used for features, products, or any info block.
// Props:
//   icon     — emoji or icon string
//   title    — card heading
//   body     — description paragraph
//   tag      — optional small tag (e.g. "New", "AI-Powered")
//   accent   — "green" | "saffron" | "blue"  (top border colour)
//   onClick  — optional click handler

export default function Card({
    icon = "📦",
    title = "",
    body = "",
    tag = "",
    accent = "green",
    onClick,
  }) {
    const accentColors = {
      green:   "#2d6a4f",
      saffron: "#f4a261",
      blue:    "#457b9d",
    };
    const color = accentColors[accent] || accentColors.green;
  
    return (
      <div
        className={`hs-card ${onClick ? "hs-card--clickable" : ""}`}
        style={{ "--accent": color }}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      >
        {/* Top accent bar */}
        <div className="hs-card__bar" />
  
        {/* Tag */}
        {tag && <span className="hs-card__tag">{tag}</span>}
  
        {/* Icon */}
        <div className="hs-card__icon">{icon}</div>
  
        {/* Text */}
        <h3 className="hs-card__title">{title}</h3>
        <p className="hs-card__body">{body}</p>
  
        <style>{`
          .hs-card {
            position: relative;
            background: #ffffff;
            border: 1px solid #d5e8d4;
            border-radius: 14px;
            padding: 1.5rem 1.25rem 1.25rem;
            overflow: hidden;
            transition: transform .18s, box-shadow .18s;
            box-shadow: 0 2px 10px rgba(45,106,79,.06);
          }
          .hs-card--clickable { cursor: pointer; }
          .hs-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 24px rgba(45,106,79,.12);
          }
          .hs-card:focus-visible { outline: 3px solid #2d6a4f; outline-offset: 3px; }
  
          /* Accent top bar */
          .hs-card__bar {
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 4px;
            background: var(--accent);
            border-radius: 14px 14px 0 0;
          }
  
          /* Tag */
          .hs-card__tag {
            display: inline-block;
            padding: .2rem .65rem;
            background: #e0f2e9;
            border-radius: 999px;
            font-size: .7rem;
            font-weight: 700;
            color: #2d6a4f;
            text-transform: uppercase;
            letter-spacing: .05em;
            margin-bottom: .75rem;
          }
  
          /* Icon */
          .hs-card__icon {
            font-size: 2rem;
            margin-bottom: .75rem;
            line-height: 1;
          }
  
          /* Text */
          .hs-card__title {
            font-size: 1rem;
            font-weight: 800;
            color: #1a3a2a;
            margin: 0 0 .5rem;
            line-height: 1.3;
          }
          .hs-card__body {
            font-size: .875rem;
            color: #4a7c5e;
            margin: 0;
            line-height: 1.65;
          }
        `}</style>
      </div>
    );
  }
  