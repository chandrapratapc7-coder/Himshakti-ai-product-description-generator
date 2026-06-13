// PlatformSelector.jsx
// Multi-select pill selector for target e-commerce platforms.

const PLATFORMS = [
    { value: "Amazon",    icon: "📦", color: "#ff9900" },
    { value: "Flipkart",  icon: "🛒", color: "#2874f0" },
    { value: "Meesho",    icon: "🛍️", color: "#9c27b0" },
    { value: "Instagram", icon: "📸", color: "#e1306c" },
    { value: "WhatsApp",  icon: "💬", color: "#25d366" },
    { value: "D2C",       icon: "🌐", color: "#2d6a4f" },
  ];
  
  export default function PlatformSelector({ selected = [], onChange, error }) {
    const toggle = (platformValue) => {
      const updated = selected.includes(platformValue)
        ? selected.filter((p) => p !== platformValue)
        : [...selected, platformValue];
      onChange(updated);
    };
  
    const selectAll = () => onChange(PLATFORMS.map((p) => p.value));
    const clearAll  = () => onChange([]);
  
    return (
      <div className="platform-wrapper">
        <div className="platform-header">
          <label className="field-label">
            Target Platforms <span className="required-star">*</span>
          </label>
          <div className="platform-actions">
            <button type="button" className="action-btn" onClick={selectAll}>
              All
            </button>
            <span className="action-divider">|</span>
            <button type="button" className="action-btn" onClick={clearAll}>
              Clear
            </button>
          </div>
        </div>
  
        <div className="platform-pills">
          {PLATFORMS.map((platform) => {
            const isSelected = selected.includes(platform.value);
            return (
              <button
                key={platform.value}
                type="button"
                onClick={() => toggle(platform.value)}
                className={`platform-pill ${isSelected ? "platform-pill--selected" : ""}`}
                style={isSelected ? { borderColor: platform.color, color: platform.color, background: platform.color + "14" } : {}}
                aria-pressed={isSelected}
              >
                <span className="pill-icon">{platform.icon}</span>
                <span className="pill-label">{platform.value}</span>
                {isSelected && <span className="pill-check" style={{ background: platform.color }}>✓</span>}
              </button>
            );
          })}
        </div>
  
        {selected.length > 0 && (
          <p className="platform-count">
            {selected.length} platform{selected.length > 1 ? "s" : ""} selected
          </p>
        )}
  
        {error && <p className="field-error">{error}</p>}
  
        <style>{`
          .platform-wrapper { margin-bottom: 1.25rem; }
  
          .platform-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.625rem;
          }
          .field-label {
            font-size: 0.875rem;
            font-weight: 600;
            color: #1a3a2a;
            letter-spacing: 0.01em;
          }
          .required-star { color: #c0392b; margin-left: 2px; }
  
          .platform-actions {
            display: flex;
            align-items: center;
            gap: 0.4rem;
          }
          .action-btn {
            background: none;
            border: none;
            font-size: 0.78rem;
            color: #2d6a4f;
            font-weight: 600;
            cursor: pointer;
            padding: 0 0.1rem;
            text-decoration: underline;
            text-underline-offset: 2px;
          }
          .action-btn:hover { color: #1a4a34; }
          .action-divider { color: #b0c4b8; font-size: 0.8rem; }
  
          .platform-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
          }
  
          .platform-pill {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.45rem 0.85rem;
            background: #f7faf8;
            border: 2px solid #d5e8d4;
            border-radius: 999px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            color: #4a7c5e;
            transition: border-color 0.15s, background 0.15s, transform 0.1s;
          }
          .platform-pill:hover {
            border-color: #4a9b6f;
            transform: scale(1.03);
          }
          .platform-pill--selected {
            font-weight: 700;
          }
  
          .pill-icon { font-size: 1rem; line-height: 1; }
          .pill-label { white-space: nowrap; }
  
          .pill-check {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.1rem;
            height: 1.1rem;
            border-radius: 50%;
            color: #fff;
            font-size: 0.65rem;
            font-weight: 800;
            margin-left: 0.1rem;
          }
  
          .platform-count {
            margin-top: 0.5rem;
            font-size: 0.78rem;
            color: #4a7c5e;
            font-weight: 500;
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
  