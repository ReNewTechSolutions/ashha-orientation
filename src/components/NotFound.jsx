// ✅ src/components/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        color: "#fff",
        padding: "80px 20px",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>404 — Page Not Found</h1>
      <p style={{ opacity: 0.85, marginBottom: "2rem" }}>
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <button
        className="btn-primary"
        onClick={() => navigate("/")}
        style={{ padding: "10px 20px", borderRadius: "10px" }}
      >
        Return to Dashboard
      </button>
    </div>
  );
}