// ✅ src/components/SpeechToggle.jsx
import React, { useState, useEffect } from "react";
import "./SpeechToggle.css";

export default function SpeechToggle() {
  const [enabled, setEnabled] = useState(
    localStorage.getItem("ashh-autoSpeech") === "true"
  );
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);

    if (newValue) {
      localStorage.setItem("ashh-autoSpeech", "true");
    } else {
      localStorage.removeItem("ashh-autoSpeech");
      window.speechSynthesis.cancel();
    }
  };

  // 🧭 Detect scroll direction (hide when scrolling down, show when up)
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScrollY && currentScroll > 100) {
      // scrolling down
      setVisible(false);
    } else {
      // scrolling up
      setVisible(true);
    }
    setLastScrollY(currentScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div
      className={`speech-toggle-floating glass-panel ${
        visible ? "visible" : "hidden"
      }`}
    >
      <label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleToggle}
        />
        <span>🔊 Auto Narration</span>
      </label>
    </div>
  );
}