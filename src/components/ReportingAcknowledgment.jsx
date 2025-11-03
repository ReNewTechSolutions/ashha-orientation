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
      key: "incident",
      title: "Incident Reporting Procedures",
      text: `Reporting incidents promptly and accurately is essential for client safety and compliance.  

When an incident occurs:
• Ensure the client is safe first.  
• Notify your supervisor immediately.  
• Complete an Incident Report Form within 24 hours.  
• Include dates, times, locations, and all relevant details.  
• Do not alter or falsify documentation under any circumstances.`,
      lottie:
        "https://lottie.host/embed/3ad2d84b-46f4-411f-b019-24564bc16e14/DP63sHT8tD.lottie",
    },
    {
      key: "abuse",
      title: "Reporting Abuse, Neglect, or Exploitation",
      text: `All Services Home Healthcare requires every employee to report suspected abuse or neglect immediately.  

Examples include:
• Physical, emotional, or sexual abuse  
• Neglect of essential care needs (food, hygiene, safety)  
• Financial exploitation or theft  
• Intimidation or humiliation  

Steps to report:
• Ensure client safety first.  
• Notify your supervisor immediately.  
• If urgent, call 911 or Adult Protective Services.  
• Complete the required written report as soon as possible.`,
      lottie:
        "https://lottie.host/embed/28440bfc-3003-463a-886f-4a9f2421cc56/rZODaZmLqK.lottie",
    },
    {
      key: "ack",
      title: "Acknowledgment & Completion",
      text: `I understand that I am required to report all incidents, accidents, or suspected abuse immediately and truthfully in accordance with ASHH policy.`,
      lottie:
        "https://lottie.host/embed/dc496536-a187-4dad-a492-a69f993c5a5f/10YZDRwMKx.lottie",
    },
  ];

  const isAckSlide = slide === slides.length - 1;
  const current = slides[slide];
  const { isSpeaking, toggleSpeak } = useSpeechReader(current.text);

  useEffect(() => {
    window.scrollTo({ top: 120, behavior: "smooth" });
  }, [slide]);

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
                src={slides[slides.length - 1].lottie}
                title="acknowledge"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <p className="ack-intro">{slides[slides.length - 1].text}</p>

            <label className="reporting-acknowledge">
              <input
                type="checkbox"
                checked={ack || false}
                onChange={(e) => setAck(e.target.checked)}
              />
              <span>
                I acknowledge and understand my duty to report incidents and abuse immediately.
              </span>
            </label>

            <div className="reporting-nav">
              <button className="btn-ghost" onClick={() => setSlide(slide - 1)}>
                ← Back
              </button>
              <button
                className="btn-primary"
                disabled={!ack}
                onClick={() => navigate("/orientation/overview")}
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