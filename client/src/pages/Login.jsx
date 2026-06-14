// pages/Login.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <div className="login-page">
      <Navbar />

      <main className="login-main">
        <div className="login-card">

          {/* Icon + heading */}
          <div className="login-header">
            <span className="login-logo">🏔</span>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">
              Sign in to access your saved listings and dashboard.
            </p>
          </div>

          {/* Placeholder form */}
          <div className="login-form">
            <div className="lf-field">
              <label className="lf-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="lf-input"
                placeholder="you@example.com"
                disabled
              />
            </div>

            <div className="lf-field">
              <label className="lf-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="lf-input"
                placeholder="••••••••"
                disabled
              />
            </div>

            {/* Coming soon notice */}
            <div className="login-notice">
              🔒 Authentication will be enabled in Week 8.
              Login functionality is currently a UI placeholder.
            </div>

            <button className="lf-btn" disabled>
              Sign In (Coming Soon)
            </button>

            <p className="lf-register">
              Don't have an account?{" "}
              <a href="/register" className="lf-link">Register here</a>
            </p>
          </div>

        </div>
      </main>

      <Footer />

      <style>{`
        .login-page {
          min-height: 100vh; display: flex; flex-direction: column;
          background: linear-gradient(160deg, #f0faf4, #e8f5ee);
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }
        .login-main {
          flex: 1; display: flex; align-items: center;
          justify-content: center; padding: 2rem 1.25rem;
        }

        .login-card {
          width: 100%; max-width: 420px;
          background: #fff; border: 1px solid #d5e8d4;
          border-radius: 16px; padding: 2.5rem 2rem;
          box-shadow: 0 8px 32px rgba(45,106,79,.1);
        }

        /* Header */
        .login-header { text-align: center; margin-bottom: 1.75rem; }
        .login-logo   { font-size: 2.5rem; display: block; margin-bottom: .5rem; }
        .login-title  {
          font-size: 1.4rem; font-weight: 900; color: #1a3a2a; margin: 0 0 .4rem;
        }
        .login-subtitle { font-size: .875rem; color: #6b9e82; margin: 0; }

        /* Form */
        .login-form { display: flex; flex-direction: column; gap: .875rem; }
        .lf-field   { display: flex; flex-direction: column; gap: .35rem; }
        .lf-label   { font-size: .82rem; font-weight: 600; color: #1a3a2a; }
        .lf-input {
          padding: .6rem .875rem; font-size: .9rem;
          background: #f7faf8; border: 1.5px solid #c8dfc8;
          border-radius: 8px; outline: none; font-family: inherit;
          color: #1a3a2a; opacity: .6; cursor: not-allowed;
        }

        /* Notice */
        .login-notice {
          padding: .75rem 1rem;
          background: #fff8ed; border: 1px solid #f4d4a0;
          border-radius: 8px; font-size: .8rem; color: #8a5a1a;
          line-height: 1.55;
        }

        /* Button */
        .lf-btn {
          width: 100%; padding: .75rem;
          background: #2d6a4f; color: #fff;
          font-size: .95rem; font-weight: 700;
          border: none; border-radius: 9px;
          cursor: not-allowed; opacity: .5;
          font-family: inherit;
        }

        /* Register link */
        .lf-register { text-align: center; font-size: .82rem; color: #6b9e82; margin: 0; }
        .lf-link { color: #2d6a4f; font-weight: 700; text-decoration: none; }
        .lf-link:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
