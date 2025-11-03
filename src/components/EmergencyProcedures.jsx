// ✅ src/components/EmergencyProcedures.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useSpeechReader from "../hooks/useSpeechReader";
import "./EmergencyProcedures.css";

export default function EmergencyProcedures({ ack, setAck }) {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      key: "intro",
      title: "Emergency Preparedness Overview",
      text: `In healthcare, every second counts. Emergency preparedness means being ready for anything — from power outages to natural disasters.\nYou are responsible for protecting yourself and your client during emergencies.`,
      lottie: "https://lottie.host/embed/99306861-5161-464d-86bd-b9287044e67f/s7oyFBjOsE.lottie",
      video: "https://www.youtube.com/embed/Xm2aI1K8-WA",
    },
    {
      key: "fire",
      title: "Fire Safety & Evacuation",
      text: `If a fire occurs:\n• Remain calm and alert the client immediately.\n• Evacuate to safety — never re-enter a burning area.\n• Call 911 as soon as possible.\n• Follow the client’s emergency plan if available.`,
      lottie: "https://lottie.host/embed/056b6c67-4fe6-4646-8ed3-5f634693e2ba/9rZoFjXcV9.lottie",
      video: "https://www.youtube.com/embed/oPO6tR7C3bM",
    },
    {
      key: "tornadoes",
      title: "Tornadoes & Severe Storms",
      text: `If a tornado warning is issued:\n• Move the client away from windows and doors.\n• Go to a basement, hallway, or bathroom on the lowest floor.\n• Have flashlights, water, and emergency numbers available.`,
      lottie: "https://lottie.host/embed/52b9c4d4-a988-4876-8e4c-403f37238663/wwEK3m5SQB.lottie",
      video: "https://www.youtube.com/embed/wx7Y5-3w4-E",
    },
    {
      key: "floods",
      title: "Flood Preparedness",
      text: `During floods:\n• Never drive or walk through standing water.\n• Move clients and supplies to higher ground.\n• Disconnect electrical appliances if safe.\n• Call 911 if evacuation is necessary.`,
      lottie: "https://lottie.host/embed/2ba05b17-651b-486b-9e0e-c06fceea17c6/2Wb0ON7igw.lottie",
      video: "https://www.youtube.com/embed/qlbM2bVxQf0",
    },
    {
      key: "heat",
      title: "Severe Heat Response",
      text: `Excessive heat can cause dehydration, heat exhaustion, or heatstroke:\n• Ensure clients stay hydrated.\n• Close blinds and use fans or AC.\n• Call for help immediately if a client is confused or fainting.`,
      lottie: "https://lottie.host/embed/524bf9a4-87a6-470b-b60b-259081e2419d/6DpEiRHsn1.lottie",
      video: "https://www.youtube.com/embed/CX-6Gskc1YI",
    },
    {
      key: "cold",
      title: "Severe Cold & Winter Safety",
      text: `Protect clients from hypothermia and frostbite:\n• Keep indoor temperatures above 68°F.\n• Ensure clients wear warm, layered clothing.\n• Report unsafe heating conditions immediately.`,
      lottie: "https://lottie.host/embed/3bff2da1-3246-40d0-b054-84d1b2a07e7a/jaKL6d6FdI.lottie",
      video: "https://www.youtube.com/embed/tobkJ1xVgS4",
    },
    {
      key: "carbon",
      title: "Carbon Monoxide Safety",
      text: `Carbon monoxide (CO) is an odorless, colorless gas that can be deadly:\n• Ensure detectors are working and batteries are fresh.\n• Never use gas stoves or grills for heating.\n• Leave the home immediately if CO alarms sound and call 911.`,
      lottie: "https://lottie.host/embed/a8dd206d-2d07-4b4d-94f5-0ed7762c52f7/FzndQLMMCS.lottie",
      video: "https://www.youtube.com/embed/QD0LSEWzD1Q",
    },
    {
      key: "exposure",
      title: "Infection Exposure or Biohazard Events",
      text: `If you are exposed to blood or bodily fluids:\n• Wash the area immediately with soap and water.\n• Report exposure to your supervisor immediately.\n• Seek medical evaluation as per company protocol.`,
      lottie: "https://lottie.host/embed/7ed14a40-b6bb-4f2b-9bc2-71905e31783d/8uPDxWAPUo.lottie",
      video: "https://www.youtube.com/embed/2TnVdL7wJjE",
    },
    {
      key: "medical",
      title: "Medical Emergencies",
      text: `If a medical emergency occurs:\n• Call 911 immediately.\n• Stay calm and reassure the client.\n• Provide only the level of care you are trained for.\n• Stay with the client until emergency services arrive.`,
      lottie: "https://lottie.host/embed/9f050098-3bbb-446c-abc4-e6dab6919f71/tkXO1JfvY8.lottie",
      video: "https://www.youtube.com/embed/p-3e0EkvI_k",
    },
    {
      key: "falls",
      title: "Falls & Injury Response",
      text: `If a client falls:\n• Do not lift the client alone.\n• Assess for pain or visible injuries.\n• Call for medical help if needed.\n• Report and document the incident.`,
      lottie: "https://lottie.host/embed/6c98299f-3db7-472d-905a-53cb10089a7b/T9PYLive5n.lottie",
      video: "https://www.youtube.com/embed/3Lx8fYqPUW4",
    },
    {
      key: "reporting",
      title: "Reporting Emergencies",
      text: `All emergencies, whether major or minor, must be reported promptly:\n• Notify your supervisor immediately.\n• Complete an incident report form.\n• Provide accurate details for safety improvements.`,
      lottie: "https://lottie.host/embed/c5008abf-7ec9-4037-908f-4f8ffbe0cf14/MVqXskBODL.lottie",
      video: "https://www.youtube.com/embed/3CGKBDfQzDk",
    },
    {
      key: "review",
      title: "Emergency Preparedness Review",
      text: `You’ve completed the Emergency Procedures section!\nRemember:\n• Stay calm and assess each situation.\n• Follow procedures and call for help quickly.\n• Prioritize safety.\n• Communication and documentation are key.`,
      lottie: "https://lottie.host/embed/7d364752-a889-4f47-bf62-bf2874f3a5f3/ducMf8urt6.lottie",
    },
    {
      key: "ack",
      title: "Acknowledgment & Completion",
      text: `I have reviewed and understand all Emergency Procedures and will follow these protocols during any emergency situation.`,
      lottie: "https://lottie.host/embed/dc496536-a187-4dad-a492-a69f993c5a5f/10YZDRwMKx.lottie",
    },
  ];

  const isAckSlide = slide === slides.length - 1;
  const current = slides[slide];
  const { isSpeaking, toggleSpeak } = useSpeechReader(current?.text || "");

  useEffect(() => {
    window.scrollTo({ top: 150, behavior: "smooth" });
  }, [slide]);

  return (
    <motion.div
      className="emergency-container"
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
              <h2 className="emergency-title">{current.title}</h2>
              <button
                className={`reader-btn ${isSpeaking ? "active" : ""}`}
                onClick={toggleSpeak}
                aria-label="Read text aloud"
              >
                <FaVolumeUp />
              </button>
            </div>

            <div className="emergency-lottie">
              <iframe
                src={current.lottie}
                title={current.key}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <p className="emergency-text">{current.text}</p>

            {current.video && (
              <motion.div
                className="training-video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <iframe
                  src={current.video}
                  title={`${current.key}-video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            )}

            <div className="emergency-nav">
              {slide > 0 ? (
                <button className="btn-ghost" onClick={() => setSlide(slide - 1)}>
                  ← Back
                </button>
              ) : (
                <span />
              )}
              <button className="btn-primary" onClick={() => setSlide(slide + 1)}>
                {slide === slides.length - 2 ? "Continue →" : "Next →"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="ack" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="emergency-title">Acknowledge & Continue</h2>
            <div className="emergency-lottie">
              <iframe
                src={slides[slides.length - 1].lottie}
                title="acknowledge"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <p className="ack-intro">{slides[slides.length - 1].text}</p>

            <label className="emergency-acknowledge">
              <input
                type="checkbox"
                checked={ack || false}
                onChange={(e) => setAck(e.target.checked)}
              />
              <span>
                I acknowledge that I have read and understand the emergency training procedures.
              </span>
            </label>

            <div className="emergency-nav">
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