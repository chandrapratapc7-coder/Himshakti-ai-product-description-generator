// pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

          {/* Functional form */}
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="rf-field">
              <label className="rf-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                className="rf-input"
                placeholder="Chandra Pratap Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="rf-field">
              <label className="rf-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="rf-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="rf-field">
              <label className="rf-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="rf-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <div className="rf-field">
              <label className="rf-label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="rf-input"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <button className="rf-btn" type="submit" disabled={submitting}>
              {submitting ? "Creating Account..." : "Create Account"}
            </button>

            <div className="rf-divider">
              <span className="rf-divider-line" />
              <span className="rf-divider-text">or</span>
              <span className="rf-divider-line" />
            </div>

            <button
              type="button"
              className="rf-google-btn"
              onClick={loginWithGoogle}
            >
              Continue with Google
            </button>

            <p className="rf-login">
              Already have an account?{" "}
              <Link to="/login" className="rf-link">Sign in here</Link>
            </p>
          </form>

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
          color: #1a3a2a;
        }
        .rf-input:focus { border-color: #2d6a4f; background: #fff; }

        /* Divider */
        .rf-divider { display: flex; align-items: center; gap: .75rem; margin: .25rem 0; }
        .rf-divider-line { flex: 1; height: 1px; background: #d5e8d4; }
        .rf-divider-text { font-size: .8rem; color: #6b9e82; }

        /* Button */
        .rf-btn {
          width: 100%; padding: .75rem;
          background: #2d6a4f; color: #fff;
          font-size: .95rem; font-weight: 700;
          border: none; border-radius: 9px;
          cursor: pointer; font-family: inherit;
          transition: opacity .15s ease;
        }
        .rf-btn:hover:not(:disabled) { opacity: .9; }
        .rf-btn:disabled { opacity: .6; cursor: not-allowed; }

        .rf-google-btn {
          width: 100%; padding: .75rem;
          background: #fff; color: #1a3a2a;
          font-size: .9rem; font-weight: 600;
          border: 1.5px solid #c8dfc8; border-radius: 9px;
          cursor: pointer; font-family: inherit;
          transition: background .15s ease;
        }
        .rf-google-btn:hover { background: #f7faf8; }

        /* Login link */
        .rf-login { text-align: center; font-size: .82rem; color: #6b9e82; margin: 0; }
        .rf-link { color: #2d6a4f; font-weight: 700; text-decoration: none; }
        .rf-link:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
