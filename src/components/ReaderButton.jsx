// src/components/ReaderButton.jsx
import React from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./ReaderButton.css";

export default function ReaderButton({ isSpeaking, toggleSpeak }) {
  return (
    <button
      className={`reader-button ${isSpeaking ? "active" : ""}`}
      onClick={toggleSpeak}
      aria-label={isSpeaking ? "Stop reading" : "Read text aloud"}
    >
      {isSpeaking ? <FaVolumeMute /> : <FaVolumeUp />}
    </button>
  );
}