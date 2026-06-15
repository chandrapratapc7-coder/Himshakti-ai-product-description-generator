// SectionCard.jsx
// White card wrapper used throughout the app.
// Props:
//   title     — card heading (optional)
//   subtitle  — smaller text below heading (optional)
//   accent    — "green" | "saffron" | "blue" | "none"  (left-border colour, default "none")
//   padding   — "sm" | "md" | "lg"                     (default "md")
//   shadow    — bool: adds drop shadow                  (default true)
//   className — extra class names
//   children  — card body content

export default function SectionCard({
    title,
    subtitle,
    accent = "none",
    padding = "md",
    shadow = true,
    className = "",
    children,
  }) {
    const cls = [
      "hscard",
      `hscard--pad-${padding}`,
      accent !== "none" ? `hscard--accent-${accent}` : "",
      shadow ? "hscard--shadow" : "",
      className,
    ].filter(Boolean).join(" ");
  
    return (
      <div className={cls}>
        {(title || subtitle) && (
          <div className="hscard__header">
            {title    && <h3 className="hscard__title">{title}</h3>}
            {subtitle && <p  className="hscard__subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="hscard__body">{children}</div>
  
        <style>{`
          /* Base card */
          .hscard {
            background:#ffffff;
            border:1px solid #d5e8d4;
            border-radius:14px;
            overflow:hidden;
            transition:box-shadow .2s, transform .15s;
          }
          .hscard--shadow { box-shadow:0 2px 12px rgba(45,106,79,.07); }
          .hscard--shadow:hover { box-shadow:0 6px 24px rgba(45,106,79,.11); }
  
          /* Padding */
          .hscard--pad-sm .hscard__body  { padding:.875rem; }
          .hscard--pad-md .hscard__body  { padding:1.5rem;  }
          .hscard--pad-lg .hscard__body  { padding:2rem;    }
          .hscard--pad-sm .hscard__header { padding:.875rem .875rem 0; }
          .hscard--pad-md .hscard__header { padding:1.5rem  1.5rem  0; }
          .hscard--pad-lg .hscard__header { padding:2rem    2rem    0; }
  
          /* Accent borders */
          .hscard--accent-green   { border-left:4px solid #2d6a4f; }
          .hscard--accent-saffron { border-left:4px solid #f4a261; }
          .hscard--accent-blue    { border-left:4px solid #457b9d; }
  
          /* Header */
          .hscard__header { margin-bottom:.875rem; }
          .hscard__title {
            font-size:1rem; font-weight:800; color:#1a3a2a;
            margin:0 0 .2rem; letter-spacing:-.01em;
          }
          .hscard__subtitle {
            font-size:.8rem; color:#6b9e82; margin:0; font-weight:500;
          }
        `}</style>
      </div>
    );
  }
  