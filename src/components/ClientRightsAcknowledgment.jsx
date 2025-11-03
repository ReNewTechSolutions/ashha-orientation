// ✅ src/components/ClientRightsAcknowledgment.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import "./ModuleBase.css";

export default function ClientRightsAcknowledgment({ ack, setAck }) {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      key: "overview",
      title: "Client Rights Overview",
      lottie:
        "https://lottie.host/1e1895f8-62f9-4df1-93b9-bb1e37f09f64/ra69ZXm8Ma.lottie",
      content: [
        "Clients have the right to be treated with dignity, compassion, and respect.",
        "Clients are entitled to participate in decisions about their care and services.",
        "Clients have the right to privacy and confidentiality at all times.",
      ],
    },
    {
      key: "caregiver",
      title: "Your Role as a Caregiver",
      lottie:
        "https://lottie.host/ca8b13ac-63cf-49a2-9071-0dbb5ec8da3c/YlpaS8Hkdr.lottie",
      content: [
        "Communicate respectfully and listen to client needs and preferences.",
        "Maintain confidentiality in all interactions and record keeping.",
        "Promote client independence, dignity, and decision-making.",
      ],
    },
  ];

  const isAckSlide = slide === slides.length;

  return (
    <motion.div className="module-container module-fade-bg">
      <AnimatePresence mode="wait">
        {!isAckSlide ? (
          <motion.div
            key={slides[slide].key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="module-title">{slides[slide].title}</h2>

            <div className="module-lottie-centered">
              <DotLottieReact src={slides[slide].lottie} loop autoplay />
            </div>

            <ul className="module-list">
              {slides[slide].content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="module-nav">
              {slide > 0 ? (
                <button
                  className="btn-ghost"
                  onClick={() => setSlide(slide - 1)}
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}
              <button
                className="btn-primary"
                onClick={() => setSlide(slide + 1)}
              >
                {slide === slides.length - 1 ? "Continue →" : "Next →"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ack"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="ack-lottie">
              <DotLottieReact
                src="https://lottie.host/f9d3b6e5-47f0-4e1e-a5d2-5c72c8f35e53/RptRkAqE9H.lottie"
                loop
                autoplay
              />
            </div>

            <h2 className="module-title">Acknowledge & Continue</h2>
            <p className="ack-intro">
              Please confirm that you understand and agree to uphold{" "}
              <strong>client rights and responsibilities</strong> in all care
              you provide.
            </p>

            <label className="module-acknowledge">
              <input
                type="checkbox"
                checked={ack}
                onChange={(e) => setAck(e.target.checked)}
              />
              <span>
                I acknowledge that I understand and will protect client rights
                at all times.
              </span>
            </label>

            <div className="module-nav ack-actions">
              <button
                className="btn-ghost"
                onClick={() => setSlide(slide - 1)}
              >
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