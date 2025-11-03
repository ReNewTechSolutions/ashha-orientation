// ✅ src/components/OrientationOverview.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrientationOverview.css";

export default function OrientationOverview() {
  const navigate = useNavigate();

  const sections = [
    {
      key: "welcome",
      title: "Welcome",
      desc: "Introduction to All Services Home Healthcare and our mission.",
      path: "/orientation/welcome",
    },
    {
      key: "ethics",
      title: "Code of Ethics",
      desc: "Professional standards, client respect, and confidentiality.",
      path: "/orientation/ethics",
    },
    {
      key: "policies",
      title: "Policy Acknowledgment",
      desc: "Review of core agency policies and employee responsibilities.",
      path: "/orientation/policies",
    },
    {
      key: "emergency",
      title: "Emergency Procedures",
      desc: "Preparedness and response protocols for all emergency situations.",
      path: "/orientation/emergency",
    },
    {
      key: "reporting",
      title: "Reporting & Safety",
      desc: "Incident reporting, workplace safety, and compliance procedures.",
      path: "/orientation/reporting",
    },
    {
      key: "final-quiz",
      title: "Final Quiz",
      desc: "A short assessment to confirm understanding of orientation materials.",
      path: "/orientation/final-quiz",
    },
  ];

  return (
    <main className="overview-container">
      <div className="glass-panel overview-card">
        <h1 className="overview-title">Orientation Training Overview</h1>
        <p className="overview-intro">
          Welcome to your training journey. Please complete each section below in order.
          Your progress is saved automatically.
        </p>

        <div className="overview-grid">
          {sections.map((s) => (
            <div key={s.key} className="overview-item">
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
              <button
                className="btn-primary"
                onClick={() => navigate(s.path)}
              >
                Start →
              </button>
            </div>
          ))}
        </div>

        <div className="overview-footer">
          <button
            className="btn-ghost"
            onClick={() => navigate("/")}
          >
            ← Return to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}