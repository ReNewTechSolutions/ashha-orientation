// ✅ src/components/PolicyAcknowledgment.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import useSpeechReader from "../hooks/useSpeechReader";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./PolicyAcknowledgment.css";

export default function PolicyAcknowledgment({ ack, setAck }) {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      key: "overview",
      title: "Company Policy Overview",
      text: `All employees are expected to uphold our core values: respect, integrity, and compassion.
      Company policies ensure fairness, safety, and accountability across every role.
      Each employee must review policy updates regularly and remain compliant at all times.`,
      lottie:
        "https://lottie.host/embed/43c05adc-c82c-4e90-8c72-141e0e1dd2d5/QPn0KH0e7g.lottie",
    },
    {
      key: "conduct",
      title: "Professional Conduct",
      text: `All staff must maintain appropriate professional boundaries with clients.
      Avoid conflicts of interest and actions that could compromise care quality.
      Represent All Services Home Healthcare with professionalism and empathy on and off duty.`,
      lottie:
        "https://lottie.host/embed/ab040683-de2e-4112-b185-25b9fc1bc310/xA8XSZzbV8.lottie",
    },
    {
      key: "agreement",
      title: "Employment Agreement",
      text: `All employees must sign and comply with the Employment Agreement.
      This confirms understanding of your role, confidentiality, and compliance with agency standards.`,
      lottie:
        "https://lottie.host/embed/edcd9484-5671-4357-8e6c-253a71cd7e88/VBmYe8WRJx.lottie",
    },
    {
      key: "dresscode",
      title: "Dress Code & ID Policy",
      text: `Employees must maintain a clean, professional appearance at all times.
      Uniforms or scrubs should be neat, and ID badges must be visible during all shifts.`,
      lottie:
        "https://lottie.host/embed/ed3a7eeb-5e7d-4ea2-8fff-8b510568cc4f/WX0pumUXIr.lottie",
    },
    {
      key: "confidentiality",
      title: "Confidentiality & Privacy",
      text: `Client information must remain confidential.
      Never share client details outside authorized communication.
      Protect all records, files, and conversations from unauthorized access.`,
      lottie:
        "https://lottie.host/embed/81f0ad0b-0146-4880-9869-7d6fc36b8a31/obtUmWe6KU.lottie",
    },
    {
      key: "hr",
      title: "HR, Scheduling & Client Concerns",
      text: `For HR inquiries, scheduling changes, or client concerns:
      • Contact HR for employment or benefits questions.  
      • Notify the Scheduling Department for shift changes or call-offs.  
      • Report client concerns promptly to your supervisor.`,
      lottie:
        "https://lottie.host/embed/0e6972a3-aa9e-473b-b675-151a6f6e9fda/e6g1pne2aI.lottie",
    },
  ];

  const isAckSlide = slide === slides.length;
  const current = slides[slide];
  const { isSpeaking, toggleSpeak } = useSpeechReader(current?.text || "");

  return (
    <motion.div
      className="policy-container module-fade-bg"
      initial={{ opacity: 0, y: 30 }}
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
              <h2 className="policy-title">{current.title}</h2>
              <button
                className={`reader-btn ${isSpeaking ? "active" : ""}`}
                onClick={toggleSpeak}
                aria-label="Read text aloud"
              >
                <FaVolumeUp />
              </button>
            </div>

            <div className="policy-lottie">
              <iframe
                src={current.lottie}
                title={current.key}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <p className="policy-text">{current.text}</p>

            <div className="policy-nav">
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
                {slide === slides.length - 1 ? "Continue →" : "Next →"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="policy-title">Acknowledge & Continue</h2>
            <p className="ack-intro">
              I understand and agree to comply with all{" "}
              <strong>agency policies, confidentiality, and standards of conduct.</strong>
            </p>

            <label className="policy-acknowledge">
              <input
                type="checkbox"
                checked={ack || false}
                onChange={(e) => setAck(e.target.checked)}
              />
              <span>
                I have read and agree to follow company policies and expectations.
              </span>
            </label>

            <div className="policy-nav ack-actions">
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