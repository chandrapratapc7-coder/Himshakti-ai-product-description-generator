// pages/Register.jsx
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  return (
    <div className="register-page">
      <Navbar />

      <main className="register-main">
        <div className="register-card">

          {/* Icon + heading */}
          <div className="register-header">
            <span className="register-logo">🏔</span>
            <h1 className="register-title">Create Your Account</h1>
            <p className="register-subtitle">
              Sign up to save your listings and access your dashboard from any device.
            </p>
          </div>

          {/* Placeholder form */}
          <div className="register-form">
            <div className="rf-field">
              <label className="rf-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                className="rf-input"
                placeholder="Chandra Pratap Singh"
                disabled
              />
            </div>

            <div className="rf-field">
              <label className="rf-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="rf-input"
                placeholder="you@example.com"
                disabled
              />
            </div>

            <div className="rf-field">
              <label className="rf-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="rf-input"
                placeholder="••••••••"
                disabled
              />
            </div>

            <div className="rf-field">
              <label className="rf-label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="rf-input"
                placeholder="••••••••"
                disabled
              />
            </div>

            {/* Coming soon notice */}
            <div className="register-notice">
              🔒 Authentication will be enabled in Week 8.
              Registration is currently a UI placeholder — your data
              is saved locally in your browser for now, no account needed.
            </div>

            <button className="rf-btn" disabled>
              Create Account (Coming Soon)
            </button>

            <p className="rf-login">
              Already have an account?{" "}
              <Link to="/login" className="rf-link">Sign in here</Link>
            </p>
          </div>

        </div>
      </main>

      <Footer />

      <style>{`
        .register-page {
          min-height: 100vh; display: flex; flex-direction: column;
          background: linear-gradient(160deg, #f0faf4, #e8f5ee);
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }
        .register-main {
          flex: 1; display: flex; align-items: center;
          justify-content: center; padding: 2rem 1.25rem;
        }

        .register-card {
          width: 100%; max-width: 440px;
          background: #fff; border: 1px solid #d5e8d4;
          border-radius: 16px; padding: 2.5rem 2rem;
          box-shadow: 0 8px 32px rgba(45,106,79,.1);
        }

        /* Header */
        .register-header { text-align: center; margin-bottom: 1.75rem; }
        .register-logo   { font-size: 2.5rem; display: block; margin-bottom: .5rem; }
        .register-title  {
          font-size: 1.4rem; font-weight: 900; color: #1a3a2a; margin: 0 0 .4rem;
        }
        .register-subtitle { font-size: .875rem; color: #6b9e82; margin: 0; line-height: 1.5; }

        /* Form */
        .register-form { display: flex; flex-direction: column; gap: .875rem; }
        .rf-field   { display: flex; flex-direction: column; gap: .35rem; }
        .rf-label   { font-size: .82rem; font-weight: 600; color: #1a3a2a; }
        .rf-input {
          padding: .6rem .875rem; font-size: .9rem;
          background: #f7faf8; border: 1.5px solid #c8dfc8;
          border-radius: 8px; outline: none; font-family: inherit;
          color: #1a3a2a; opacity: .6; cursor: not-allowed;
        }

        /* Notice */
        .register-notice {
          padding: .75rem 1rem;
          background: #fff8ed; border: 1px solid #f4d4a0;
          border-radius: 8px; font-size: .8rem; color: #8a5a1a;
          line-height: 1.55;
        }

        /* Button */
        .rf-btn {
          width: 100%; padding: .75rem;
          background: #2d6a4f; color: #fff;
          font-size: .95rem; font-weight: 700;
          border: none; border-radius: 9px;
          cursor: not-allowed; opacity: .5;
          font-family: inherit;
        }

        /* Login link */
        .rf-login { text-align: center; font-size: .82rem; color: #6b9e82; margin: 0; }
        .rf-link { color: #2d6a4f; font-weight: 700; text-decoration: none; }
        .rf-link:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
