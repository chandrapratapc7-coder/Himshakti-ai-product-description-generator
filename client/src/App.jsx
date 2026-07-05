// App.jsx
// React Router setup — defines all page routes for the app.

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SavedDescriptions from "./pages/SavedDescriptions";
import Home      from "./pages/Home";
import Generator from "./pages/Generator";
import About     from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login     from "./pages/Login";
import Register  from "./pages/Register";
import Saved from "./pages/Saved";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Home />}      />
        <Route path="/generator" element={<Generator />} />
        <Route path="/about"     element={<About />}     />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login"     element={<Login />}     />
        <Route path="/register"  element={<Register />}  />
        <Route path="/saved-descriptions" element={<SavedDescriptions />} />
        <Route path="/saved" element={<Saved />} />

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
    </BrowserRouter>
  );
}
