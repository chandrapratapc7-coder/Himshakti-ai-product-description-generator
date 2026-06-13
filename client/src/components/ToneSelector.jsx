// ToneSelector.jsx
// Lets the user pick one of three writing tones for AI generation.

const TONES = [
    {
      value: "Premium",
      icon: "✦",
      label: "Premium",
      description: "Sophisticated & artisanal",
      example: '"Handcrafted in the Himalayas..."',
      color: "tone-premium",
    },
    {
      value: "Traditional",
      icon: "🏔",
      label: "Traditional",
      description: "Heritage & cultural warmth",
      example: '"Age-old Pahadi recipe..."',
      color: "tone-traditional",
    },
    {
      value: "Health-focused",
      icon: "🌿",
      label: "Health-focused",
      description: "Nutrition & wellness first",
      example: '"Nutrient-dense superfood..."',
      color: "tone-health",
    },
  ];
  
  export default function ToneSelector({ value, onChange, error }) {
    return (
      <div className="tone-selector-wrapper">
        <label className="field-label">
          Writing Tone <span className="required-star">*</span>
        </label>
  
        <div className="tone-grid">
          {TONES.map((tone) => {
            const isSelected = value === tone.value;
            return (
              <button
                key={tone.value}
                type="button"
                onClick={() => onChange(tone.value)}
                className={`tone-card ${isSelected ? "tone-card--selected" : ""}`}
                aria-pressed={isSelected}
              >
                <span className="tone-icon">{tone.icon}</span>
                <span className="tone-label">{tone.label}</span>
                <span className="tone-description">{tone.description}</span>
                <span className="tone-example">{tone.example}</span>
                {isSelected && <span className="tone-check">✓</span>}
              </button>
            );
          })}
        </div>
  
        {error && <p className="field-error">{error}</p>}
  
        <style>{`
          .tone-selector-wrapper { margin-bottom: 1.25rem; }
  
          .field-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
            color: #1a3a2a;
            margin-bottom: 0.625rem;
            letter-spacing: 0.01em;
          }
          .required-star { color: #c0392b; margin-left: 2px; }
  
          .tone-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }
          @media (max-width: 600px) {
            .tone-grid { grid-template-columns: 1fr; }
          }
  
          .tone-card {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
            padding: 0.875rem 1rem;
            background: #ffffff;
            border: 2px solid #d5e8d4;
            border-radius: 10px;
            cursor: pointer;
            text-align: left;
            transition: border-color 0.18s, box-shadow 0.18s, transform 0.12s;
          }
          .tone-card:hover {
            border-color: #4a9b6f;
            box-shadow: 0 2px 10px rgba(74,155,111,0.15);
            transform: translateY(-1px);
          }
          .tone-card--selected {
            border-color: #2d6a4f;
            background: #f0faf4;
            box-shadow: 0 0 0 3px rgba(45,106,79,0.12);
          }
  
          .tone-icon { font-size: 1.3rem; margin-bottom: 0.1rem; }
          .tone-label {
            font-size: 0.9rem;
            font-weight: 700;
            color: #1a3a2a;
          }
          .tone-description {
            font-size: 0.78rem;
            color: #4a7c5e;
            font-weight: 500;
          }
          .tone-example {
            font-size: 0.72rem;
            color: #7a9e8a;
            font-style: italic;
            margin-top: 0.15rem;
          }
          .tone-check {
            position: absolute;
            top: 0.6rem;
            right: 0.75rem;
            background: #2d6a4f;
            color: #fff;
            border-radius: 50%;
            width: 1.2rem;
            height: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            font-weight: 700;
          }
          .field-error {
            margin-top: 0.4rem;
            font-size: 0.8rem;
            color: #c0392b;
            display: flex;
            align-items: center;
            gap: 0.3rem;
          }
          .field-error::before { content: "⚠ "; }
        `}</style>
      </div>
    );
  }
  