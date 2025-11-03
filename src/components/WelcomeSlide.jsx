// ✅ src/components/WelcomeSlide.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import useSpeechReader from "../hooks/useSpeechReader";
import "./WelcomeSlide.css";

export default function WelcomeSlide({ ack, setAck }) {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  // ✅ Updated with your Lotties
  const slides = [
    {
      key: "founded",
      title: "Welcome to All Services Home Healthcare",
      text:
        "We’re so glad you’re here! ASHH was founded from love for family and a passion for helping others.",
      lottie:
        "https://lottie.host/1604fe65-dacc-4fe1-98f4-7af985d3a6ce/huPK887Hv4.lottie",
    },
    {
      key: "motto",
      title: "Our Guiding Motto",
      text:
        "“Your home is where our heart is.” This is more than words — it’s the spirit behind everything we do. Our caregivers bring empathy, integrity, and professionalism to every home, every day.",
      lottie:
        "https://lottie.host/a6a035a5-c9c3-49ac-92d3-31d38ec9934f/4xuQmQ2BSx.lottie",
    },
    {
      key: "community",
      title: "Serving Diverse Communities",
      text:
        "We proudly serve people from all walks of life — providing care that transcends boundaries, restores independence, and builds trust between caregivers, clients, and families alike.",
      lottie:
        "https://lottie.host/63e3052c-b648-4892-b1e3-478113c26d14/K9WD1sEbR7.lottie",
    },
  ];

  const current = slides[step];

  // 🔈 Reader setup
  const { isSpeaking, hasFinished, toggleSpeak, setText } = useSpeechReader();

  useEffect(() => {
    setText(current.text);
  }, [current.text, setText]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep((s) => s + 1);
    } else {
      setAck(true);
      localStorage.setItem("ackWelcome", "true");
      navigate("/orientation/overview");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const nextDisabled = isSpeaking && !hasFinished;

  return (
    <motion.div
      className="welcome-slide"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
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
            {/* === Lottie Animation === */}
            <div className="welcome-lottie">
              <DotLottieReact src={current.lottie} loop autoplay />
            </div>

            {/* === Title + Narration === */}
            <div className="reader-control">
              <h2 className="welcome-title">{current.title}</h2>
              <button
                className={`reader-btn ${isSpeaking ? "active" : ""}`}
                onClick={toggleSpeak}
                aria-label={isSpeaking ? "Pause narration" : "Play narration"}
              >
                <FaVolumeUp />
              </button>
            </div>

            <p className="welcome-text">{current.text}</p>
          </motion.div>
        </AnimatePresence>

        {/* === Navigation Buttons === */}
        <div className="welcome-nav">
          {step > 0 ? (
            <button className="btn-ghost" onClick={handleBack}>
              ← Back
            </button>
          ) : (
            <span />
          )}

          {step < slides.length - 1 ? (
            <button
              className="btn-primary"
              onClick={handleNext}
              disabled={nextDisabled}
            >
              {nextDisabled ? "Narrating…" : "Next →"}
            </button>
          ) : (
            <>
              <button
                className="btn-primary"
                onClick={handleNext}
                disabled={nextDisabled}
              >
                {ack ? "Completed ✓" : "Mark Complete"}
              </button>
              <button
                className="btn-return"
                onClick={() => navigate("/orientation/overview")}
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