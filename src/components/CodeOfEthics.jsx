// ✅ src/components/CodeOfEthics.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import "./ModuleBase.css";

export default function CodeOfEthics({ ack, setAck }) {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  // ✅ Load acknowledgment from localStorage
  useEffect(() => {
    const savedAck = localStorage.getItem("ackEthics");
    if (savedAck === "true") setAck(true);
  }, []);

  const handleReturn = () => {
    localStorage.setItem("ackEthics", "true");
    navigate("/orientation/overview");
  };

  const sections = [
    {
      key: "ethics",
      title: "Code of Ethics for Personal Care Assistants",
      lottie:
        "https://lottie.host/48941350-00e6-4c0a-8668-9300d511e8d6/YwuWDXbhaU.lottie",
      content: [
        "Provide compassionate and respectful care to all clients.",
        "Maintain confidentiality and protect client privacy at all times.",
        "Demonstrate honesty, integrity, and professionalism in all duties.",
        "Avoid any behavior that could be considered neglect, abuse, or exploitation.",
        "Report all incidents, concerns, or policy violations promptly.",
        "Treat clients and coworkers with fairness and dignity.",
        "Uphold the highest standards of ethical and legal conduct.",
      ],
    },
    {
      key: "rights",
      title: "Patient Bill of Rights",
      lottie:
        "https://lottie.host/43c05adc-c82c-4e90-8c72-141e0e1dd2d5/QPn0KH0e7g.lottie",
      content: [
        "The right to be treated with dignity, respect, and non-discrimination.",
        "The right to privacy and confidentiality of personal health information.",
        "The right to clear information about care, services, and any changes.",
        "The right to participate in care decisions and to refuse services.",
        "The right to safe services and protection from abuse, neglect, or exploitation.",
        "The right to voice concerns or file complaints without retaliation.",
        "The right to have needs, preferences, and cultural values honored.",
      ],
    },
  ];

  const isAckSlide = slide === sections.length;

  return (
    <main>
      <motion.div
        className="module-container module-fade-bg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {!isAckSlide ? (
            <motion.div
              key={sections[slide].key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="module-title">{sections[slide].title}</h2>

              <div className="module-lottie-centered">
                <DotLottieReact src={sections[slide].lottie} loop autoplay />
              </div>

              <ul className="module-list">
                {sections[slide].content.map((item, i) => (
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
                  {slide === sections.length - 1 ? "Continue →" : "Next →"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ack-slide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="ack-lottie fade-in">
                <DotLottieReact
                  src="https://lottie.host/dc496536-a187-4dad-a492-a69f993c5a5f/10YZDRwMKx.lottie"
                  loop
                  autoplay
                />
              </div>

              <h2 className="module-title">Acknowledge & Continue</h2>
              <p className="ack-intro">
                Please confirm that you’ve reviewed the{" "}
                <strong>Code of Ethics</strong> and{" "}
                <strong>Patient Bill of Rights</strong>.
              </p>

              <label className="module-acknowledge">
                <input
                  type="checkbox"
                  checked={ack || false}
                  onChange={(e) => setAck(e.target.checked)}
                />
                <span>
                  I acknowledge and agree to uphold these ethical standards in
                  my work.
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
                  className="btn-return"
                  disabled={!ack}
                  onClick={handleReturn}
                >
                  ← Return to Overview
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}