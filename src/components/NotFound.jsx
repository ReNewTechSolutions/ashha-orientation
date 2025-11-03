// ✅ src/components/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="notfound-container">
      <div className="glass-panel notfound-card">
        <h1 className="notfound-title">404 — Page Not Found</h1>
        <p className="notfound-text">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button className="btn-primary" onClick={() => navigate("/")}>
          ← Return to Dashboard
        </button>
      </div>
    </main>
  );
}