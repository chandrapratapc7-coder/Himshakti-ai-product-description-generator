// InputField.jsx
// Generic labelled input or textarea.
// Props:
//   id, label, type ("text"|"email"|"password"), placeholder
//   value, onChange
//   multiline (bool) — renders <textarea> instead of <input>
//   rows (number)    — textarea rows, default 3
//   required (bool)
//   hint (string)    — small helper text below label
//   error (string)   — red error message
//   disabled (bool)

export default function InputField({
    id,
    label,
    type = "text",
    placeholder = "",
    value,
    onChange,
    multiline = false,
    rows = 3,
    required = false,
    hint = "",
    error = "",
    disabled = false,
  }) {
    const inputClass = [
      "hsif__input",
      error    ? "hsif__input--error"    : "",
      disabled ? "hsif__input--disabled" : "",
    ].filter(Boolean).join(" ");
  
    return (
      <div className="hsif__wrapper">
        {label && (
          <label className="hsif__label" htmlFor={id}>
            {label}
            {required && <span className="hsif__required" aria-hidden>*</span>}
            {hint && <span className="hsif__hint">{hint}</span>}
          </label>
        )}
  
        {multiline ? (
          <textarea
            id={id}
            rows={rows}
            className={`${inputClass} hsif__textarea`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        ) : (
          <input
            id={id}
            type={type}
            className={inputClass}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        )}
  
        {error && (
          <p id={`${id}-error`} className="hsif__error" role="alert">
            <span aria-hidden>⚠</span> {error}
          </p>
        )}
  
        <style>{`
          .hsif__wrapper { display:flex; flex-direction:column; gap:.35rem; margin-bottom:1.1rem; }
  
          /* Label */
          .hsif__label {
            display:flex; align-items:center; gap:.4rem; flex-wrap:wrap;
            font-size:.875rem; font-weight:600; color:#1a3a2a; letter-spacing:.01em;
          }
          .hsif__required { color:#c0392b; font-weight:700; }
          .hsif__hint {
            font-size:.78rem; font-weight:400; color:#7a9e8a; margin-left:.1rem;
          }
  
          /* Input & Textarea */
          .hsif__input {
            width:100%; padding:.6rem .875rem;
            font-size:.9rem; font-family:inherit; color:#1a3a2a;
            background:#f7faf8; border:1.5px solid #c8dfc8;
            border-radius:8px; outline:none; box-sizing:border-box;
            transition:border-color .15s, box-shadow .15s, background .15s;
          }
          .hsif__input:focus {
            border-color:#2d6a4f;
            box-shadow:0 0 0 3px rgba(45,106,79,.12);
            background:#fff;
          }
          .hsif__input:hover:not(:focus):not(:disabled) { border-color:#4a9b6f; }
  
          .hsif__input--error {
            border-color:#c0392b !important;
            background:#fff8f8;
          }
          .hsif__input--error:focus {
            box-shadow:0 0 0 3px rgba(192,57,43,.1) !important;
          }
  
          .hsif__input--disabled {
            opacity:.55; cursor:not-allowed; background:#f0f0f0;
          }
  
          .hsif__textarea { resize:vertical; min-height:72px; line-height:1.55; }
  
          /* Error message */
          .hsif__error {
            display:flex; align-items:center; gap:.3rem;
            font-size:.78rem; color:#c0392b; margin:0;
            animation:hsif-shake .3s ease;
          }
          @keyframes hsif-shake {
            0%,100%{transform:translateX(0)}
            25%{transform:translateX(-4px)}
            75%{transform:translateX(4px)}
          }
        `}</style>
      </div>
    );
  }
  