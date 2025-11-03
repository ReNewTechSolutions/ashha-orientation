// src/components/OrientationComplete.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaVolumeUp } from "react-icons/fa";
import useSpeechReader from "../hooks/useSpeechReader";
import "./OrientationComplete.css";

export default function OrientationComplete({ onDashboard, onRestart }) {
  const [confetti, setConfetti] = useState([]);

  // Text for the speech reader
  const message = `Congratulations! You have successfully completed the All Services Home Healthcare Orientation.
  Welcome to the team — together, we make every home a place of healing, dignity, and heart.`;

  const { isSpeaking, toggleSpeak } = useSpeechReader(message);

  // Confetti animation setup
  useEffect(() => {
    const confettiCount = 45;
    const colors = ["#ff7a70", "#ffb6a3", "#ffffff", "#9c1c1c"];
    const items = Array.from({ length: confettiCount }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      duration: Math.random() * 2 + 3,
    }));
    setConfetti(items);
  }, []);

  return (
    <motion.div
      className="orientation-complete"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* === Confetti Layer === */}
      <div className="confetti-wrapper">
        {confetti.map((c, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: c.left,
              width: c.size,
              height: c.size * 1.5,
              background: c.color,
              animationDelay: c.delay,
              animationDuration: `${c.duration}s`,
            }}
          />
        ))}
      </div>

      {/* === Celebration Animation === */}
      <motion.div
        className="complete-lottie"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <DotLottieReact
          src="https://lottie.host/20a3df93-5183-47c9-a6c2-964cf7ea2a74/YfJ9yCS8Jd.lottie"
          loop
          autoplay
        />
      </motion.div>

      {/* === Title + Reader === */}
      <div className="reader-control">
        <motion.h2
          className="complete-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          🎉 Orientation Complete!
        </motion.h2>
        <button
          className={`reader-btn ${isSpeaking ? "active" : ""}`}
          onClick={toggleSpeak}
          aria-label="Read completion message aloud"
        >
          <FaVolumeUp />
        </button>
      </div>

      {/* === Message === */}
      <motion.p
        className="complete-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        You’ve successfully completed the{" "}
        <strong>All Services Home Healthcare Orientation</strong> — welcome to
        the team!
        <br />
        Together, we make every home a place of{" "}
        <em>healing, dignity, and heart.</em>
      </motion.p>

      {/* === Buttons === */}
      <motion.div
        className="complete-actions"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <button className="btn-primary" onClick={onDashboard}>
          Return to Dashboard
        </button>
        <button className="btn-ghost" onClick={onRestart}>
          Restart Orientation
        </button>
      </motion.div>
    </motion.div>
  );
}