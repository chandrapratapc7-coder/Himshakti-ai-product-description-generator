// SelectField.jsx
// Generic labelled <select> dropdown with error display.
// Props:
//   id, label, value, onChange
//   options  — array of strings OR { value, label } objects
//   placeholder — greyed-out first option text (default "Select…")
//   required, hint, error, disabled

export default function SelectField({
    id,
    label,
    value,
    onChange,
    options = [],
    placeholder = "Select…",
    required = false,
    hint = "",
    error = "",
    disabled = false,
  }) {
    // Normalise options to { value, label }
    const normalised = options.map((o) =>
      typeof o === "string" ? { value: o, label: o } : o
    );
  
    const cls = [
      "hssf__select",
      error    ? "hssf__select--error"    : "",
      disabled ? "hssf__select--disabled" : "",
    ].filter(Boolean).join(" ");
  
    return (
      <div className="hssf__wrapper">
        {label && (
          <label className="hssf__label" htmlFor={id}>
            {label}
            {required && <span className="hssf__required" aria-hidden>*</span>}
            {hint && <span className="hssf__hint">{hint}</span>}
          </label>
        )}
  
        <div className="hssf__control">
          <select
            id={id}
            className={cls}
            value={value}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          >
            <option value="" disabled>{placeholder}</option>
            {normalised.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
  
          {/* Custom dropdown arrow */}
          <span className="hssf__arrow" aria-hidden>
            <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
              <path d="M1 1l4.5 4.5L10 1" stroke="#4a7c5e" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
  
        {error && (
          <p id={`${id}-error`} className="hssf__error" role="alert">
            <span aria-hidden>⚠</span> {error}
          </p>
        )}
  
        <style>{`
          .hssf__wrapper { display:flex; flex-direction:column; gap:.35rem; margin-bottom:1.1rem; }
  
          .hssf__label {
            display:flex; align-items:center; gap:.4rem; flex-wrap:wrap;
            font-size:.875rem; font-weight:600; color:#1a3a2a; letter-spacing:.01em;
          }
          .hssf__required { color:#c0392b; font-weight:700; }
          .hssf__hint { font-size:.78rem; font-weight:400; color:#7a9e8a; }
  
          .hssf__control { position:relative; }
  
          .hssf__select {
            width:100%; padding:.6rem 2.25rem .6rem .875rem;
            font-size:.9rem; font-family:inherit; color:#1a3a2a;
            background:#f7faf8; border:1.5px solid #c8dfc8;
            border-radius:8px; outline:none; appearance:none;
            box-sizing:border-box; cursor:pointer;
            transition:border-color .15s, box-shadow .15s, background .15s;
          }
          .hssf__select:focus {
            border-color:#2d6a4f;
            box-shadow:0 0 0 3px rgba(45,106,79,.12);
            background:#fff;
          }
          .hssf__select:hover:not(:focus):not(:disabled) { border-color:#4a9b6f; }
  
          .hssf__select--error {
            border-color:#c0392b !important; background:#fff8f8;
          }
          .hssf__select--error:focus {
            box-shadow:0 0 0 3px rgba(192,57,43,.1) !important;
          }
          .hssf__select--disabled { opacity:.55; cursor:not-allowed; }
  
          /* selected placeholder appears dimmed */
          .hssf__select option[value=""] { color:#7a9e8a; }
  
          .hssf__arrow {
            position:absolute; right:.875rem; top:50%;
            transform:translateY(-50%); pointer-events:none;
            display:flex; align-items:center;
          }
  
          .hssf__error {
            display:flex; align-items:center; gap:.3rem;
            font-size:.78rem; color:#c0392b; margin:0;
          }
        `}</style>
      </div>
    );
  }
  