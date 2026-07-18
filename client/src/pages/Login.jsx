// pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

          {/* Functional form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="lf-field">
              <label className="lf-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="lf-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="lf-field">
              <label className="lf-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="lf-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="lf-btn" type="submit" disabled={submitting}>
              {submitting ? "Signing In..." : "Sign In"}
            </button>

            <div className="lf-divider">
              <span className="lf-divider-line" />
              <span className="lf-divider-text">or</span>
              <span className="lf-divider-line" />
            </div>

            <button
              type="button"
              className="lf-google-btn"
              onClick={loginWithGoogle}
            >
              Continue with Google
            </button>

            <p className="lf-register">
              Don't have an account?{" "}
              <Link to="/register" className="lf-link">Register here</Link>
            </p>
          </form>

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
          color: #1a3a2a;
        }
        .lf-input:focus { border-color: #2d6a4f; background: #fff; }

        /* Divider */
        .lf-divider { display: flex; align-items: center; gap: .75rem; margin: .25rem 0; }
        .lf-divider-line { flex: 1; height: 1px; background: #d5e8d4; }
        .lf-divider-text { font-size: .8rem; color: #6b9e82; }

        /* Button */
        .lf-btn {
          width: 100%; padding: .75rem;
          background: #2d6a4f; color: #fff;
          font-size: .95rem; font-weight: 700;
          border: none; border-radius: 9px;
          cursor: pointer; font-family: inherit;
          transition: opacity .15s ease;
        }
        .lf-btn:hover:not(:disabled) { opacity: .9; }
        .lf-btn:disabled { opacity: .6; cursor: not-allowed; }

        .lf-google-btn {
          width: 100%; padding: .75rem;
          background: #fff; color: #1a3a2a;
          font-size: .9rem; font-weight: 600;
          border: 1.5px solid #c8dfc8; border-radius: 9px;
          cursor: pointer; font-family: inherit;
          transition: background .15s ease;
        }
        .lf-google-btn:hover { background: #f7faf8; }

        /* Register link */
        .lf-register { text-align: center; font-size: .82rem; color: #6b9e82; margin: 0; }
        .lf-link { color: #2d6a4f; font-weight: 700; text-decoration: none; }
        .lf-link:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
