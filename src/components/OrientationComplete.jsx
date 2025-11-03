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
        <motion.h2
          className="complete-title"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          🎉 Orientation Complete!
        </motion.h2>

        <motion.p
          className="complete-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          You’ve successfully completed the Orientation Training modules.  
          Excellent work! You’re now ready to continue by taking the{" "}
          <strong>Final Quiz</strong> to confirm your understanding of the material.
        </motion.p>

        <motion.div
          className="complete-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <button
            className="btn-ghost"
            onClick={() => navigate("/orientation/overview")}
          >
            ← Return to Overview
          </button>

          <button
            className="btn-primary"
            onClick={() => navigate("/orientation/final-quiz")}
          >
            Take Final Quiz →
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}