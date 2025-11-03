import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [modules, setModules] = useState([
    {
      key: "orientation",
      title: "Orientation Training",
      desc: "Agency mission, ethics, policies, and safety procedures.",
      path: "/orientation/overview",
      progress: 0,
    },
    {
      key: "pca",
      title: "PCA Training Part 1",
      desc: "Core caregiver competencies & client care fundamentals.",
      path: "/pca/overview",
      progress: 0,
    },
    {
      key: "annual",
      title: "Annual Training",
      desc: "Yearly refreshers & compliance updates.",
      path: "/annual/overview",
      progress: 0,
    },
    {
      key: "apc",
      title: "APC Training",
      desc: "Advanced personal care instruction and specialized techniques.",
      path: "/apc/overview",
      progress: 0,
    },
  ]);

  const [overallProgress, setOverallProgress] = useState(0);

  // ✅ Load stored progress
  useEffect(() => {
    const stored = localStorage.getItem("ashh-progress");
    if (stored) {
      const saved = JSON.parse(stored);
      setModules((prev) =>
        prev.map((m) => (saved[m.key] ? { ...m, progress: 100 } : m))
      );
    }
  }, []);

  // ✅ Save progress
  useEffect(() => {
    const data = {};
    modules.forEach((m) => (data[m.key] = m.progress === 100));
    localStorage.setItem("ashh-progress", JSON.stringify(data));
  }, [modules]);

  // ✅ Calculate total progress
  useEffect(() => {
    const total = modules.reduce((sum, m) => sum + m.progress, 0);
    setOverallProgress(total / modules.length);
  }, [modules]);

  // ✅ Dynamic navigation
  const handleStart = (key) => {
    try {
      const selectedModule = modules.find((m) => m.key === key);
      if (selectedModule?.path) {
        navigate(selectedModule.path);
      } else {
        console.warn(`⚠️ No path found for module key: ${key}`);
      }
    } catch (err) {
      console.error("❌ Navigation error:", err);
    }
  };

  // ✅ Dark background
  useEffect(() => {
    document.body.classList.add("dashboard-bg");
    return () => document.body.classList.remove("dashboard-bg");
  }, []);

  return (
    <main className="dashboard-container">
      <motion.header
        className="dashboard-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>
          Welcome to Your <span className="highlight">Training Portal</span>
        </h1>
        <p>
          Empowering caregivers through continuous learning and compassionate
          excellence.
        </p>
      </motion.header>

      <section className="dashboard-progress glass-panel">
        <div className="progress-header">
          <span>Overall Progress</span>
          <span>{Math.round(overallProgress)}%</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      <section className="dashboard-modules glass-panel">
        <h2>Available Training Programs</h2>
        <div className="modules-grid">
          {modules.map((m, i) => (
            <motion.div
              key={m.key}
              className={`module-card ${m.progress === 100 ? "complete" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <span
                className={`badge ${m.progress === 100 ? "complete" : ""}`}
              >
                {m.progress === 100 ? "Completed" : "Not Started"}
              </span>

              <button
                className="btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStart(m.key);
                }}
                disabled={m.progress === 100}
              >
                {m.progress === 100 ? "Completed ✓" : "Start Module →"}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <footer>© All Services Home Healthcare • Training Portal</footer>
    </main>
  );
}