import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useSpeechReader from "../hooks/useSpeechReader";
import "./WelcomeSlide.css";

export default function WelcomeSlide({ ack, setAck }) {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { isSpeaking, toggleSpeak } = useSpeechReader();

  const slides = [
    {
      key: "founded",
      title: "Our Story Begins With Love",
      text: `All Services Home Healthcare was founded from compassion — a desire to support families, uplift our community, and provide dignified, high-quality care that helps people thrive where they feel most comfortable: at home.`,
      lottie: "https://lottie.host/embed/1604fe65-dacc-4fe1-98f4-7af985d3a6ce/huPK887Hv4.lottie",
    },
    {
      key: "motto",
      title: "Our Guiding Motto",
      text: `“Your home is where our heart is.” This phrase is more than words — it’s the spirit behind everything we do. Our caregivers bring empathy, integrity, and professionalism to every home, every day.`,
      lottie: "https://lottie.host/embed/a6a035a5-c9c3-49ac-92d3-31d38ec9934f/4xuQmQ2BSx.lottie",
    },
    {
      key: "community",
      title: "Serving Diverse Communities",
      text: `We are proud to serve people from all walks of life — providing care that transcends boundaries, restores independence, and builds trust between caregivers, clients, and families alike.`,
      lottie: "https://lottie.host/embed/63e3052c-b648-4892-b1e3-478113c26d14/K9WD1sEbR7.lottie",
    },
  ];

  const current = slides[step];

  useEffect(() => {
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, [step]);

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      setAck(true);
      localStorage.setItem("ackWelcome", "true");
      navigate("/orientation/overview", { replace: true });
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSpeak = () => {
    toggleSpeak(current.text);
  };

  return (
    <motion.div
      className="welcome-slide"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel welcome-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45 }}
          >
            <div className="welcome-lottie">
              <iframe
                src={current.lottie}
                title={current.key}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <div className="reader-control">
              <h2 className="welcome-title">{current.title}</h2>
              <button
                className={`reader-btn ${isSpeaking ? "active" : ""}`}
                onClick={handleSpeak}
                aria-label="Read text aloud"
              >
                <FaVolumeUp />
              </button>
            </div>

            <p className="welcome-text">{current.text}</p>
          </motion.div>
        </AnimatePresence>

        <div className="welcome-nav">
          {step > 0 ? (
            <button className="btn-ghost" onClick={handleBack}>
              ← Back
            </button>
          ) : (
            <span />
          )}

          {step < slides.length - 1 ? (
            <button className="btn-primary" onClick={handleNext}>
              Next →
            </button>
          ) : (
            <>
              <button className="btn-primary" onClick={handleNext}>
                {ack ? "Completed ✓" : "Mark Complete"}
              </button>
              <button
                className="btn-return"
                onClick={() => navigate("/orientation/overview", { replace: true })}
              >
                ← Return to Overview
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}