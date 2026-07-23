// App.jsx
// React Router setup — defines all page routes for the app.

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/Toast";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

import Saved         from "./pages/Saved";
import Home          from "./pages/Home";
import Generator     from "./pages/Generator";
import About         from "./pages/About";
import Dashboard     from "./pages/Dashboard";
import Login         from "./pages/Login";
import Register      from "./pages/Register";
import OAuthCallback from "./pages/OAuthCallback";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* ToastProvider must wrap anything that calls useToast() —
            Saved.jsx and Dashboard.jsx both depend on this. */}
        <ToastProvider>
          {/* ErrorBoundary sits inside Auth/Toast context so a render
              crash on any single page doesn't lose auth state or toasts,
              but still shows a friendly fallback instead of a blank screen. */}
          <ErrorBoundary>
            <Routes>
              <Route path="/"          element={<Home />}      />
              <Route path="/about"     element={<About />}     />
              <Route path="/login"     element={<Login />}     />
              <Route path="/register"  element={<Register />}  />
              <Route path="/oauth/callback" element={<OAuthCallback />} />

              {/* Protected — require login */}
              <Route path="/generator" element={
                <ProtectedRoute><Generator /></ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
              } />
              <Route path="/saved" element={
                <ProtectedRoute><Saved /></ProtectedRoute>
              } />

              {/* 404 fallback */}
              <Route path="*" element={
                <div style={{
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "system-ui",
                  background: "#f4f9f6",
                  color: "#1a3a2a",
                }}>
                  <span style={{ fontSize: "3rem" }}>🏔</span>
                  <h1 style={{ margin: ".5rem 0" }}>404 — Page Not Found</h1>
                  <p style={{ color: "#6b9e82" }}>This trail doesn't exist.</p>
                  <a href="/" style={{ marginTop: "1rem", color: "#2d6a4f", fontWeight: 700 }}>
                    ← Go Home
                  </a>
                </div>
              } />
            </Routes>
          </ErrorBoundary>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
