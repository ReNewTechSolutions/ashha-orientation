import React, { useState, useEffect, useRef } from "react";
// ReadAloud helper button
function ReadAloud({ text }) {
  function speak() {
    const msg = new window.SpeechSynthesisUtterance(text);
    msg.lang = "en-US";
    msg.rate = 1.05;
    msg.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  }
  return (
    <button
      className="btn-ghost"
      onClick={speak}
      title="Read Aloud"
      style={{ position: "absolute", top: 12, right: 12, fontSize: 18, zIndex: 10 }}
    >
      🔊
    </button>
  );
}
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import CodeOfEthics from "./components/CodeOfEthics.jsx";
import PolicyAcknowledgment from "./components/PolicyAcknowledgment.jsx";
import EmergencyAcknowledgment from "./components/EmergencyAcknowledgment.jsx";
import ReportingAcknowledgment from "./components/ReportingAcknowledgment.jsx";

// ✅ ClientRightsAcknowledgment (moved outside Orientation)
function ClientRightsAcknowledgment({ ack, setAck }) {
  const items = [
    "Treat all clients with respect and dignity, regardless of background or ability.",
    "Protect client privacy and confidentiality at all times.",
    "Support clients’ independence and choices whenever possible.",
    "Remain alert for signs of abuse, neglect, or exploitation.",
    "Immediately report any suspicion of abuse, neglect, or exploitation to your supervisor or authorities.",
    "Never misuse, borrow, or take a client’s money or belongings.",
    "Maintain a safe, supportive, and non-threatening environment for every client.",
    "Follow all agency policies and state laws regarding client rights and safety.",
  ];
  return (
    <>
      <div className="scrollbox">
        <ul>{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
        <input type="checkbox" checked={ack} onChange={e => setAck(e.target.checked)} />
        I have read and agree to uphold Client Rights & Safety Policies.
      </label>
      <div style={{ marginTop: "10px" }}>
        <small>Checking this box is required to complete this section.</small>
      </div>
    </>
  );
}

function ScrollyWelcome({ onComplete }) {
  const [scene, setScene] = useState(0);
  const scenes = [
    {
      title: "Welcome to All Services Home Healthcare",
      text: "We’re so glad you’re here! ASHH was founded from love for family and a passion for helping others.",
      img: "https://cdn.prod.website-files.com/68ce6ff73856b97e4595f20d/68f0c0564e83eb41719bbb13_Welcome%20Slides%20ASHHC%20.svg",
    },
    {
      title: "Our Mission & Teamwork",
      text: "As a locally owned Kansas City agency, we’re dedicated to helping people live safely and independently at home. You are now part of a team that values compassion and excellence — together, we make a difference!",
      img: "https://cdn.prod.website-files.com/68ce6ff73856b97e4595f20d/68f0c056f0bb1401878d1554_Welcome%20Slides%20ASHHC%201%20(2).svg",
    },
    {
      title: "Let’s Begin Your Orientation!",
      text: "This training will walk you through our values, policies, and safety practices. Click Begin to start.",
      img: null,
    },
  ];

  // Helper: Lottie background as <lottie-player>
  // CDN: https://cdn.jsdelivr.net/npm/@lottiefiles/lottie-player@latest/dist/lottie-player.js
  useEffect(() => {
    if (!window.customElements?.get("lottie-player")) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // AnimatePresence for fade/scale transitions
  const sceneVariants = {
    initial: { opacity: 0, scale: 0.96, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: -30 },
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
        color: "#fff",
        maxWidth: "600px",
        margin: "0 auto",
        borderRadius: "16px",
        background: "linear-gradient(180deg, #3a3a3d 0%, #1f1f22 100%)",
        boxShadow: "0 0 25px rgba(0,0,0,0.35)",
        position: "relative",
        overflow: "hidden",
        minHeight: 420,
      }}
    >
      {/* Lottie background as absolute layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.22,
          filter: "blur(1.5px)",
        }}
        aria-hidden="true"
      >
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://cdn.prod.website-files.com/68ce6ff73856b97e4595f20d/68f79c03296acc9a27820605_Creative%20Education%20Lottie%20ASHHC.lottie"
          style={{ width: "140%", maxWidth: 900, height: 400, minWidth: 400 }}
        ></lottie-player>
      </div>
      {/* Foreground content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* ReadAloud button for current scene, positioned absolutely */}
        <ReadAloud text={scenes[scene].text} />
        {/* Lottie animation above title/text as instructed */}
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://cdn.prod.website-files.com/68ce6ff73856b97e4595f20d/68f79c03296acc9a27820605_Creative%20Education%20Lottie%20ASHHC.lottie"
          style={{ width: "100%", maxWidth: 600, height: 380, margin: "0 auto 24px" }}
        ></lottie-player>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={scene}
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.51, 1.3, 0.5, 1] }}
          >
            {scenes[scene].img && (
              <img
                src={scenes[scene].img}
                alt={scenes[scene].title}
                style={{
                  maxWidth: "90%",
                  marginBottom: "24px",
                  borderRadius: "12px",
                  boxShadow: "0 0 20px rgba(255,255,255,0.05)",
                  background: "rgba(0,0,0,0.03)",
                }}
              />
            )}
            <h2 style={{ fontSize: "1.6rem", marginBottom: "10px" }}>
              {scenes[scene].title}
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: "1.6", opacity: 0.9 }}>
              {scenes[scene].text}
            </p>
          </motion.div>
        </AnimatePresence>
        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, margin: "24px 0 0 0" }}>
          {scenes.map((_, idx) => (
            <span
              key={idx}
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: idx === scene ? "var(--as-red, #ff5a5f)" : "#fff3",
                boxShadow: idx === scene ? "0 0 8px 2px #ff5a5f88" : "none",
                border: idx === scene ? "2px solid #fff7" : "1.5px solid #fff2",
                transition: "all .22s cubic-bezier(.51,1.3,.5,1)",
              }}
            />
          ))}
        </div>
        {/* Navigation buttons */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            className="btn-ghost"
            onClick={() => setScene(scene - 1)}
            disabled={scene === 0}
            style={{ visibility: scene === 0 ? "hidden" : "visible" }}
          >
            Back
          </button>

          {scene < scenes.length - 1 ? (
            <button className="btn-primary" onClick={() => setScene(scene + 1)}>
              Next
            </button>
          ) : (
            <motion.button
              className="btn-primary"
              onClick={onComplete}
              style={{
                position: "relative",
                fontWeight: 700,
                fontSize: "1.12rem",
                letterSpacing: "0.02em",
                boxShadow: "0 0 18px 4px #ff5a5f66, 0 0 0 0 #fff0",
                background: "linear-gradient(90deg, #ff5a5f 60%, #ffb6b9 100%)",
                color: "#fff",
                borderRadius: "8px",
                padding: "0.7em 2.2em",
                outline: "none",
                border: "none",
                transition: "box-shadow .23s cubic-bezier(.51,1.3,.5,1)",
                textShadow: "0 0 6px #fff9",
                filter: "drop-shadow(0 0 8px #ff5a5f88)",
              }}
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 28px 10px #ff5a5faa, 0 0 0 0 #fff0",
                filter: "drop-shadow(0 0 18px #ff5a5faa)",
              }}
              whileTap={{ scale: 0.97 }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>Begin Orientation</span>
              {/* Glowing effect */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0, top: 0, right: 0, bottom: 0,
                  borderRadius: "inherit",
                  boxShadow: "0 0 32px 10px #ff5a5f88",
                  opacity: 0.7,
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

// FinalQuiz component with ~15 questions
function FinalQuiz({ onComplete }) {
  const questions = [
    {
      q: "What is the All Services Home Healthcare motto?",
      options: [
        "Caring for you, every step of the way.",
        "Your home is where our heart is.",
        "Home care, done right.",
        "Putting clients first, always."
      ],
      a: 0,
    },
    {
      q: "Which of the following is NOT one of the agency's core values?",
      options: ["Compassion", "Excellence", "Profitability", "Reliability"],
      a: 2,
    },
    {
      q: "Who should you report suspected abuse or neglect to?",
      options: [
        "Your supervisor or authorities",
        "A coworker",
        "The client’s family only",
        "No one"
      ],
      a: 0,
    },
    {
      q: "What must you never do with a client’s money or belongings?",
      options: [
        "Borrow with permission",
        "Never misuse, borrow, or take",
        "Keep safe for the client",
        "Report if lost"
      ],
      a: 1,
    },
    {
      q: "When should you uphold client privacy?",
      options: [
        "Only during work hours",
        "Only when asked",
        "At all times",
        "Only with supervisor approval"
      ],
      a: 2,
    },
    {
      q: "What is required before completing the Client Rights section?",
      options: [
        "Read the Code of Ethics",
        "Check the acknowledgment box",
        "Pass the final quiz",
        "Attend a meeting"
      ],
      a: 1,
    },
    {
      q: "What does the agency expect regarding client independence?",
      options: [
        "Support independence and choices whenever possible",
        "Make all decisions for the client",
        "Ignore client preferences",
        "Limit client choices"
      ],
      a: 0,
    },
    {
      q: "Which agency policy is essential for client safety?",
      options: [
        "Following all agency policies and state laws",
        "Ignoring minor safety issues",
        "Delegating safety to family",
        "Only reporting major incidents"
      ],
      a: 0,
    },
    {
      q: "How should you treat clients?",
      options: [
        "With respect and dignity",
        "Based on their background",
        "Only when convenient",
        "As you see fit"
      ],
      a: 0,
    },
    {
      q: "What should you do if you suspect abuse?",
      options: [
        "Ignore it",
        "Immediately report it",
        "Discuss with coworkers only",
        "Wait for confirmation"
      ],
      a: 1,
    },
    {
      q: "What is the purpose of the Code of Ethics?",
      options: [
        "To guide professional behavior",
        "To provide legal advice",
        "To replace agency policies",
        "To train new hires only"
      ],
      a: 0,
    },
    {
      q: "What is the best way to maintain a safe environment?",
      options: [
        "Follow agency policies strictly",
        "Allow clients to do as they please",
        "Ignore hazards",
        "Only focus on paperwork"
      ],
      a: 0,
    },
    {
      q: "Who is responsible for reporting emergencies?",
      options: [
        "Only supervisors",
        "All staff immediately",
        "Clients themselves",
        "No one"
      ],
      a: 1,
    },
    {
      q: "What should you do if you are unsure about a policy?",
      options: [
        "Guess and proceed",
        "Ask your supervisor",
        "Ignore it",
        "Wait for someone else"
      ],
      a: 1,
    },
    {
      q: "What is the agency’s stance on client confidentiality?",
      options: [
        "Protect it at all times",
        "Share with coworkers freely",
        "Only protect during work hours",
        "Ignore if client is not present"
      ],
      a: 0,
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);
  const numAnswered = answers.filter(a => a !== -1).length;
  const quizProgress = Math.round((numAnswered / questions.length) * 100);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const correct = answers.every((a, i) => a === questions[i].a);
    setAllCorrect(correct);
    if (correct) onComplete?.();
  }

  useEffect(() => {
    if (answers.every(a => a !== -1)) onComplete?.();
  }, [answers, onComplete]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="progress-bar" style={{ marginBottom: 12 }}>
        <div className="progress-fill" style={{ width: `${quizProgress}%`, background: "var(--as-red)" }}></div>
      </div>
      <ol style={{ paddingLeft: 18 }}>
        {questions.map((q, idx) => (
          <li key={idx} style={{ marginBottom: 18 }}>
            <div style={{ color: "#fff", fontWeight: 500 }}>{q.q}</div>
            {q.options.map((opt, j) => (
              <label key={j} style={{ display: "block", cursor: "pointer" }}>
                <input
                  type="radio"
                  name={`q${idx}`}
                  checked={answers[idx] === j}
                  onChange={() => {
                    const next = [...answers];
                    next[idx] = j;
                    setAnswers(next);
                  }}
                />
                {opt}
              </label>
            ))}
          </li>
        ))}
      </ol>
      <button type="submit" className="btn-primary" disabled={numAnswered < questions.length}>
        Submit Quiz
      </button>
      {submitted && (
        <div style={{ marginTop: 20, fontWeight: 600, color: allCorrect ? "green" : "var(--as-red)" }}>
          {allCorrect ? "✅ Quiz Complete! Great job finishing Orientation Training!" : "Some answers are incorrect. Please review and try again!"}
        </div>
      )}
    </form>
  );
}

// Main Orientation component with multi-slide flow and localStorage progress tracking
function Orientation() {
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem("orientationStep");
    return saved ? Number(saved) : 0;
  });

  // Acknowledgment states for each section
  const [codeAck, setCodeAck] = useState(() => localStorage.getItem("codeAck") === "true");
  const [policyAck, setPolicyAck] = useState(() => localStorage.getItem("policyAck") === "true");
  const [emergencyAck, setEmergencyAck] = useState(() => localStorage.getItem("emergencyAck") === "true");
  const [reportingAck, setReportingAck] = useState(() => localStorage.getItem("reportingAck") === "true");
  const [clientRightsAck, setClientRightsAck] = useState(() => localStorage.getItem("clientRightsAck") === "true");
  const [quizComplete, setQuizComplete] = useState(() => localStorage.getItem("quizComplete") === "true");

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("orientationStep", step);
    localStorage.setItem("codeAck", codeAck);
    localStorage.setItem("policyAck", policyAck);
    localStorage.setItem("emergencyAck", emergencyAck);
    localStorage.setItem("reportingAck", reportingAck);
    localStorage.setItem("clientRightsAck", clientRightsAck);
    localStorage.setItem("quizComplete", quizComplete);
  }, [step, codeAck, policyAck, emergencyAck, reportingAck, clientRightsAck, quizComplete]);

  // Slide titles for header (hide for Welcome screen)
  const titles = [
    "Welcome",
    "Code of Ethics",
    "Policy Acknowledgment",
    "Emergency Procedures",
    "Reporting Procedures",
    "Client Rights & Safety",
    "Final Quiz",
    "Orientation Complete"
  ];

  // Determine if current step is the last slide
  const isLastStep = step === titles.length - 1;

  // Handlers for next and previous steps
  function nextStep() {
    if (step < titles.length - 1) setStep(step + 1);
  }
  function prevStep() {
    if (step > 0) setStep(step - 1);
  }

  // Determine if current slide's required acknowledgment is done
  function canProceed() {
    switch (step) {
      case 0: return true; // Welcome auto proceed
      case 1: return codeAck;
      case 2: return policyAck;
      case 3: return emergencyAck;
      case 4: return reportingAck;
      case 5: return clientRightsAck;
      case 6: return quizComplete;
      default: return true;
    }
  }

  // Render current slide content, wrapping in a relative container with ReadAloud (except Welcome)
  function renderSlide() {
    switch (step) {
      case 0:
        return <ScrollyWelcome onComplete={nextStep} />;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return (
          <div style={{ position: "relative" }}>
            <ReadAloud text={titles[step] || ""} />
            {(() => {
              switch (step) {
                case 1:
                  return <CodeOfEthics ack={codeAck} setAck={setCodeAck} />;
                case 2:
                  return <PolicyAcknowledgment ack={policyAck} setAck={setPolicyAck} />;
                case 3:
                  return <EmergencyAcknowledgment ack={emergencyAck} setAck={setEmergencyAck} />;
                case 4:
                  return <ReportingAcknowledgment ack={reportingAck} setAck={setReportingAck} />;
                case 5:
                  return <ClientRightsAcknowledgment ack={clientRightsAck} setAck={setClientRightsAck} />;
                case 6:
                  return <FinalQuiz onComplete={() => setQuizComplete(true)} />;
                case 7:
                  return (
                    <div style={{ color: "#fff", fontSize: 20, textAlign: "center", marginTop: 60 }}>
                      🎉 Congratulations! You have completed the Orientation Training.
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div
      className="container"
      style={{
        position: "relative",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* 🔊 Always show Read Aloud */}
      <ReadAloud key={step} text={titles[step]} />

      {/* Remove header for Welcome screen */}
      {step !== 0 && <h1>{titles[step]}</h1>}

      {/* Slide content */}
      <div className="slide-panel" style={{ flexGrow: 1 }}>
        {renderSlide()}
      </div>

      {/* Navigation buttons */}
      {step !== 0 && (
        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
          <button className="btn-secondary" onClick={prevStep} disabled={step === 0}>
            Previous
          </button>
          {!isLastStep && (
            <button className="btn-primary" onClick={nextStep} disabled={!canProceed()}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Orientation;

// ✅ CSS for slide transitions (outside export)
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
.slide-panel { transition: transform .25s cubic-bezier(.51,1.3,.5,1), opacity .25s cubic-bezier(.51,1.3,.5,1); will-change: transform, opacity; }
.slide-in-right { transform: translateX(60px); opacity: 0; animation: slideInRight .25s forwards; }
.slide-in-left { transform: translateX(-60px); opacity: 0; animation: slideInLeft .25s forwards; }
.slide-out-left { transform: translateX(-60px); opacity: 0; }
.slide-out-right { transform: translateX(60px); opacity: 0; }
@keyframes slideInRight { from { transform: translateX(60px); opacity: 0;} to { transform: translateX(0); opacity: 1;} }
@keyframes slideInLeft { from { transform: translateX(-60px); opacity: 0;} to { transform: translateX(0); opacity: 1;} }
`;
document.head.appendChild(styleSheet);