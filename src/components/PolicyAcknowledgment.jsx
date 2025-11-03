// ✅ src/components/PolicyAcknowledgment.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import "./ModuleBase.css";

export default function PolicyAcknowledgment({ ack, setAck }) {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const sections = [
    {
      key: "overview",
      title: "Policy Overview",
      lottie: "https://lottie.host/embed/43c05adc-c82c-4e90-8c72-141e0e1dd2d5/QPn0KH0e7g.lottie",
      content: [
        "Our policies guide how we serve our clients and ensure consistent, ethical care.",
        "They also protect caregivers and clients by defining professional expectations clearly.",
      ],
    },
    {
      key: "conduct",
      title: "Employee Conduct & Responsibilities",
      lottie: "https://lottie.host/embed/ab040683-de2e-4112-b185-25b9fc1bc310/xA8XSZzbV8.lottie",
      content: [
        "Follow your assigned schedule and communicate promptly with supervisors.",
        "Maintain respectful, professional behavior with clients and staff at all times.",
      ],
    },
    {
      key: "agreement",
      title: "Employment Agreement",
      lottie: "https://lottie.host/embed/edcd9484-5671-4357-8e6c-253a71cd7e88/VBmYe8WRJx.lottie",
      content: [
        "Your employment agreement defines expectations, pay structure, and policies you must uphold.",
        "Read and sign this agreement prior to client assignments.",
      ],
    },
    {
      key: "dress",
      title: "Dress Code & ID Policy",
      lottie: "https://lottie.host/embed/ed3a7eeb-5e7d-4ea2-8fff-8b510568cc4f/WX0pumUXIr.lottie",
      content: [
        "Always wear professional, neat attire and your company ID badge during all shifts.",
        "Avoid strong perfumes or jewelry that may interfere with client care.",
      ],
    },
    {
      key: "confidentiality",
      title: "Confidentiality Policy",
      lottie: "https://lottie.host/embed/81f0ad0b-0146-4880-9869-7d6fc36b8a31/obtUmWe6KU.lottie",
      content: [
        "Protect client information under HIPAA guidelines at all times.",
        "Never share personal or health information outside of authorized channels.",
      ],
    },
    {
      key: "hr",
      title: "HR, Scheduling, & Client Concerns",
      lottie: "https://lottie.host/embed/0e6972a3-aa9e-473b-b675-151a6f6e9fda/e6g1pne2aI.lottie",
      content: [
        "Contact HR or your supervisor for scheduling changes or client concerns.",
        "All incidents, client complaints, or policy violations must be reported immediately.",
      ],
    },
  ];

  const isAckSlide = slide === sections.length;

  return (
    <motion.div className="module-container module-fade-bg">
      <AnimatePresence mode="wait">
        {!isAckSlide ? (
          <motion.div
            key={sections[slide].key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="module-title">{sections[slide].title}</h2>

            <div className="module-lottie-centered">
              <iframe
                src={sections[slide].lottie}
                title="policy-animation"
                frameBorder="0"
              ></iframe>
            </div>

            <ul className="module-list">
              {sections[slide].content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="module-nav">
              {slide > 0 ? (
                <button className="btn-ghost" onClick={() => setSlide(slide - 1)}>
                  ← Back
                </button>
              ) : (
                <span />
              )}
              <button className="btn-primary" onClick={() => setSlide(slide + 1)}>
                {slide === sections.length - 1 ? "Continue →" : "Next →"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="ack-slide" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="module-title">Acknowledge & Continue</h2>
            <p className="ack-intro">
              I understand and agree to follow ASHH policies, including conduct,
              confidentiality, and client communication.
            </p>

            <label className="module-acknowledge">
              <input
                type="checkbox"
                checked={ack || false}
                onChange={(e) => setAck(e.target.checked)}
              />
              <span>I acknowledge that I have reviewed and understand ASHH policies.</span>
            </label>

            <div className="module-nav ack-actions">
              <button className="btn-ghost" onClick={() => setSlide(slide - 1)}>
                ← Back
              </button>
              <button className="btn-return" onClick={() => navigate("/orientation/overview")}>
                ← Return to Overview
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}