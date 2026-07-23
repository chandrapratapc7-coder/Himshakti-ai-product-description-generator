// components/ErrorBoundary.jsx
// Catches unexpected render errors anywhere in the tree below it and shows
// a friendly fallback instead of a blank white screen (Week 8 requirement).
//
// USAGE — wrap around App.jsx's routed content (inside AuthProvider/Router):
//   <ErrorBoundary>
//     <Routes>...</Routes>
//   </ErrorBoundary>
//
// Must be a class component — React error boundaries require
// getDerivedStateFromError / componentDidCatch, which have no Hook equivalent.

import { Component } from "react";
import Button from "./Button";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In production this is where you'd send to an error-tracking service.
    // Keeping console.error so it's visible during PowerShell/dev testing.
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="eb-wrap">
          <div className="eb-card">
            <span className="eb-icon">🏔</span>
            <h1 className="eb-title">Something went wrong</h1>
            <p className="eb-body">
              An unexpected error occurred while rendering this page.
              You can try again, or head back to the homepage.
            </p>

            {/* Dev-only error detail — safe to leave since it's not sensitive, but easy to strip for production */}
            {import.meta.env.DEV && this.state.error && (
              <pre className="eb-detail">{String(this.state.error.message || this.state.error)}</pre>
            )}

            <div className="eb-actions">
              <Button variant="secondary" size="sm" onClick={this.handleReset}>
                ↻ Try Again
              </Button>
              <Button variant="primary" size="sm" onClick={this.handleReload}>
                🏠 Back to Home
              </Button>
            </div>
          </div>

          <style>{`
            .eb-wrap {
              min-height: 100vh; display: flex; align-items: center; justify-content: center;
              background: var(--color-bg, #f4f9f6);
              font-family: var(--font-family, 'Inter','Segoe UI',system-ui,sans-serif);
              padding: 1.5rem;
            }
            .eb-card {
              max-width: 460px; width: 100%; text-align: center;
              background: #fff; border: 1.5px solid #d5e8d4; border-radius: 16px;
              padding: 2.5rem 2rem; box-shadow: 0 8px 30px rgba(45,106,79,.1);
            }
            .eb-icon { font-size: 2.75rem; display: block; margin-bottom: 1rem; }
            .eb-title { font-size: 1.3rem; font-weight: 900; color: #1a3a2a; margin: 0 0 .6rem; }
            .eb-body {
              font-size: .9rem; color: #6b9e82; line-height: 1.7;
              margin: 0 0 1.25rem;
            }
            .eb-detail {
              text-align: left; font-size: .75rem; color: #c0392b;
              background: #fff8f8; border: 1px solid #f4b8b5; border-radius: 8px;
              padding: .75rem; margin: 0 0 1.25rem; overflow-x: auto;
              white-space: pre-wrap; word-break: break-word;
            }
            .eb-actions { display: flex; gap: .6rem; justify-content: center; flex-wrap: wrap; }

            @media (max-width: 480px) {
              .eb-card { padding: 2rem 1.5rem; }
              .eb-actions { flex-direction: column; }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}
