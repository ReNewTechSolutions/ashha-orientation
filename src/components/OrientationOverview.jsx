// src/OrientationOverview.jsx
import React, { useEffect, useState, useMemo } from "react";
import {
  FaFireExtinguisher,
  FaHandshake,
  FaBookOpen,
  FaClipboardList,
  FaHeart,
  FaVolumeUp,
  FaStop,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./OrientationOverview.css";

export default function OrientationOverview() {
  const navigate = useNavigate();
  const [isReading, setIsReading] = useState(false);
  const [progress, setProgress] = useState({
    welcome: false,
    ethics: false,
    policies: false,
    emergency: false,
    reporting: false,
  });

  // ✅ Load stored progress from localStorage
  useEffect(() => {
    setProgress({
      welcome: localStorage.getItem("ackWelcome") === "true",
      ethics: localStorage.getItem("ackEthics") === "true",
      policies: localStorage.getItem("ackPolicies") === "true",
      emergency: localStorage.getItem("ackEmergency") === "true",
      reporting: localStorage.getItem("ackReporting") === "true",
    });
  }, []);

  // ✅ Define orientation modules
  const modules = useMemo(
    () => [
      {
        key: "welcome",
        title: "Welcome",
        description:
          "Introduction to All Services and our mission of compassionate care.",
        icon: <FaHeart />,
        accent: "rgba(156,28,28,0.25)",
        route: "/orientation/welcome",
      },
      {
        key: "ethics",
        title: "Code of Ethics",
        description: "Core professional values and the Patient Bill of Rights.",
        icon: <FaHandshake />,
        accent: "rgba(255,165,0,0.22)",
        route: "/orientation/ethics",
      },
      {
        key: "policies",
        title: "Policy Acknowledgment",
        description:
          "Agency standards, confidentiality, and employment expectations.",
        icon: <FaBookOpen />,
        accent: "rgba(0,150,255,0.22)",
        route: "/orientation/policies",
      },
      {
        key: "emergency",
        title: "Emergency Procedures",
        description:
          "Fire, tornado, flood, and power outage safety training.",
        icon: <FaFireExtinguisher />,
        accent: "rgba(255,90,95,0.24)",
        route: "/orientation/emergency",
      },
      {
        key: "reporting",
        title: "Reporting & Safety",
        description:
          "Incident reporting, abuse prevention, and client protections.",
        icon: <FaClipboardList />,
        accent: "rgba(140,255,160,0.22)",
        route: "/orientation/reporting",
      },
    ],
    []
  );

  // ✅ Progress tracking
  const total = modules.length;
  const completed = Object.values(progress).filter(Boolean).length;
  const percent = Math.round((completed / total) * 100);
  const next = modules.find((m) => !progress[m.key]) || modules[0];

  // ✅ Progress ring constants
  const size = 68;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const offset = C * (1 - percent / 100);

  // 🔈 Reader logic
  const handleRead = () => {
    const synth = window.speechSynthesis;
    if (!synth) return alert("Text-to-speech not supported on this browser.");

    if (isReading) {
      synth.cancel();
      setIsReading(false);
      return;
    }

    const text = `
      Orientation Modules Overview.
      You have completed ${percent} percent.
      ${completed < total ? `Next module: ${next.title}.` : "All modules complete!"}
      ${modules.map((m) => `${m.title}: ${m.description}`).join(". ")}
    `;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = "en-US";

    utterance.onend = () => setIsReading(false);

    synth.speak(utterance);
    setIsReading(true);
  };

  return (
    <div className="orientation-overview">
      <div className="overview-header">
        <h1 className="overview-title">Orientation Modules</h1>

        {/* Progress Ring */}
        <div className="progress-ring" aria-label={`Progress ${percent}%`}>
          <svg width={size} height={size}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={stroke}
              fill="none"
            />
            <circle
              className="progress-circle"
              cx={size / 2}
              cy={size / 2}
              r={r}
              strokeDasharray={C}
              strokeDashoffset={offset}
              strokeWidth={stroke}
              fill="none"
            />
          </svg>
          <div className="progress-number">{percent}%</div>
        </div>

        {/* Reader Button */}
        <button
          className={`reader-btn ${isReading ? "active" : ""}`}
          onClick={handleRead}
          aria-label={isReading ? "Stop reading" : "Read page aloud"}
        >
          {isReading ? <FaStop /> : <FaVolumeUp />}
        </button>
      </div>

      <p className="overview-intro">
        Complete each module to finish your All Services Orientation.
        Progress is saved automatically.
      </p>

      {completed < total && (
        <div className="continue-banner">
          <span>
            You’re <strong>{percent}%</strong> complete — next up:{" "}
            <strong>{next.title}</strong>.
          </span>
          <button onClick={() => navigate(next.route)}>Continue →</button>
        </div>
      )}

      <div className="modules-grid">
        {modules.map((m) => {
          const done = !!progress[m.key];
          return (
            <button
              key={m.key}
              type="button"
              className={`module-card ${done ? "completed" : ""}`}
              style={{ "--accent": m.accent }}
              onClick={() => navigate(m.route)}
            >
              <span className="module-icon">{m.icon}</span>
              <h3>{m.title}</h3>
              <p>{m.description}</p>
              {done && <span className="checkmark">✔</span>}
            </button>
          );
        })}
      </div>

      {completed === total && (
        <div className="overview-complete">
          ✅ All modules complete — proceed to the final quiz.
          <div className="complete-actions">
            <button
              className="btn-go-final"
              onClick={() => navigate("/orientation/final-quiz")}
            >
              Start Final Quiz →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}