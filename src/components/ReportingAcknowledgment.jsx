// ✅ src/components/ReportingAcknowledgment.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useSpeechReader from "../hooks/useSpeechReader";
import "./ReportingAcknowledgment.css";

export default function ReportingAcknowledgment({ ack, setAck }) {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      key: "intro",
      title: "Incident & Abuse Reporting Overview",
      text: `As a caregiver, you are legally and ethically required to report all incidents of suspected abuse, neglect, or exploitation immediately.`,
      lottie: "https://lottie.host/embed/3ad2d84b-46f4-411f-b019-24564bc16e14/DP63sHT8tD.lottie",
    },
    {
      key: "steps",
      title: "How to Report",
      text: `1. Ensure the client’s safety first.\n2. Notify your supervisor immediately.\n3. Complete an incident report form as soon as possible.\n4. If the incident involves abuse, neglect, or exploitation — call the state abuse hotline and law enforcement if necessary.`,
      lottie: "https://lottie.host/embed/28440bfc-3003-463a-886f-4a9f2421cc56/rZODaZmLqK.lottie",
    },
    {
      key: "ack",
      title: "Acknowledgment & Completion",
      text: `I acknowledge that I understand my responsibility to report all incidents, accidents, abuse, neglect, and unsafe conditions promptly and truthfully.`,
      lottie: "https://lottie.host/embed/dc496536-a187-4dad-a492-a69f993c5a5f/10YZDRwMKx.lottie",
    },
  ];

  const current = slides[slide];
  const isAckSlide = slide === slides.length - 1;
  const { isSpeaking, toggleSpeak } = useSpeechReader(current.text);

  useEffect(() => {
    window.scrollTo({ top: 120, behavior: "smooth" });
  }, [slide]);

  const handleReturn = () => {
    // ✅ Return user to the Orientation Overview
    setAck(true);
    localStorage.setItem("ackReporting", "true");
    navigate("/orientation/overview");
  };

  return (
    <motion.div
      className="reporting-container"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {!isAckSlide ? (
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.5 }}
          >
            <div className="reader-control">
              <h2 className="reporting-title">{current.title}</h2>
              <button
                className={`reader-btn ${isSpeaking ? "active" : ""}`}
                onClick={toggleSpeak}
                aria-label="Read text aloud"
              >
                <FaVolumeUp />
              </button>
            </div>

            <div className="reporting-lottie">
              <iframe
                src={current.lottie}
                title={current.key}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <p className="reporting-text">{current.text}</p>

            <div className="reporting-nav">
              {slide > 0 ? (
                <button className="btn-ghost" onClick={() => setSlide(slide - 1)}>
                  ← Back
                </button>
              ) : (
                <span />
              )}
              <button
                className="btn-primary"
                onClick={() => setSlide(slide + 1)}
              >
                {slide === slides.length - 2 ? "Continue →" : "Next →"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="ack" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="reporting-title">Acknowledge & Continue</h2>

            <div className="reporting-lottie">
              <iframe
                src={current.lottie}
                title="acknowledge"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <p className="ack-intro">{current.text}</p>

            <label className="reporting-acknowledge">
              <input
                type="checkbox"
                checked={ack || false}
                onChange={(e) => setAck(e.target.checked)}
              />
              <span>
                I acknowledge that I have reviewed and understand the reporting policies.
              </span>
            </label>

            <div className="reporting-nav">
              <button className="btn-ghost" onClick={() => setSlide(slide - 1)}>
                ← Back
              </button>
              <button
                className="btn-primary"
                disabled={!ack}
                onClick={handleReturn}
              >
                Return to Overview →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}