// ✅ src/components/OrientationComplete.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./OrientationComplete.css";

export default function OrientationComplete() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="complete-container"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-panel complete-card">
        <h2 className="complete-title">🎉 Orientation Complete!</h2>
        <p className="complete-text">
          You’ve successfully completed the Orientation Training modules.  
          Great work! Please proceed to the **Final Quiz** to confirm your
          understanding of the material.
        </p>

        <div className="complete-actions">
          <button className="btn-ghost" onClick={() => navigate("/orientation/overview")}>
            ← Return to Overview
          </button>

          <button className="btn-primary" onClick={() => navigate("/quiz")}>
            Take Final Quiz →
          </button>
        </div>
      </div>
    </motion.div>
  );
}