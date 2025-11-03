// src/components/ModuleCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaVolumeUp } from "react-icons/fa";
import useSpeechReader from "../hooks/useSpeechReader";
import "./ModuleCard.css";

export default function ModuleCard({
  title,
  description,
  icon,
  accent,
  onClick,
}) {
  const textToRead = `${title}. ${description}`;
  const { isSpeaking, toggleSpeak } = useSpeechReader(textToRead);

  return (
    <motion.div
      className="module-card"
      tabIndex={0}
      role="button"
      aria-label={`${title}: ${description}`}
      style={{
        "--accent": accent,
        background: `linear-gradient(155deg, rgba(25,25,28,0.92), rgba(35,35,38,0.96))`,
      }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.04,
        boxShadow: "0 15px 40px rgba(255, 122, 112, 0.35)",
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="module-icon">{icon}</div>
      <h3 className="module-title">{title}</h3>
      <p className="module-desc">{description}</p>

      {/* Reader Button */}
      <button
        className={`reader-btn ${isSpeaking ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleSpeak();
        }}
        aria-label={`Read ${title} module aloud`}
      >
        <FaVolumeUp />
      </button>

      {/* Subtle animated accent ring */}
      <motion.div
        className="module-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.5, scale: 1.15 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.div>
  );
}