// ✅ src/components/FinalQuiz.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useSpeechReader from "../hooks/useSpeechReader";
import "./FinalQuiz.css";

const quizQuestions = [
  // --- Orientation & Welcome ---
  {
    q: "What is the All Services Home Healthcare motto?",
    options: [
      "Your home is where our heart is.",
      "Caring for your comfort.",
      "Quality care, every time.",
      "Serving with pride and purpose.",
    ],
    a: 0,
  },
  {
    q: "Why was All Services Home Healthcare founded?",
    options: [
      "To bring compassionate care to clients in their homes.",
      "To provide only hospital-based services.",
      "To replace family caregiving entirely.",
      "To focus solely on administrative work.",
    ],
    a: 0,
  },
  {
    q: "ASHH believes in treating clients with what key principle?",
    options: [
      "Dignity and respect.",
      "Firm discipline.",
      "Selective kindness.",
      "Minimal interaction.",
    ],
    a: 0,
  },

  // --- Code of Ethics ---
  {
    q: "Which of the following best defines confidentiality?",
    options: [
      "Keeping client information private at all times.",
      "Discussing client details with coworkers freely.",
      "Posting client updates on social media.",
      "Telling neighbors about your clients.",
    ],
    a: 0,
  },
  {
    q: "When should suspected abuse or neglect be reported?",
    options: [
      "Immediately to your supervisor or appropriate authorities.",
      "Only after discussing it with coworkers.",
      "At the end of your shift.",
      "Never—it’s not your responsibility.",
    ],
    a: 0,
  },
  {
    q: "Which action violates the Code of Ethics?",
    options: [
      "Maintaining honesty and integrity.",
      "Borrowing money from a client.",
      "Reporting unsafe conditions.",
      "Respecting client preferences.",
    ],
    a: 1,
  },
  {
    q: "Clients have the right to:",
    options: [
      "Participate in care decisions.",
      "Refuse services they do not want.",
      "Expect privacy and respect.",
      "All of the above.",
    ],
    a: 3,
  },

  // --- Policies & Conduct ---
  {
    q: "Which of the following is part of professional appearance?",
    options: [
      "Wearing your ID badge and neat attire.",
      "Wearing strong perfume.",
      "Using casual clothing for comfort.",
      "Skipping ID for short visits.",
    ],
    a: 0,
  },
  {
    q: "Conflicts of interest should be:",
    options: [
      "Reported immediately to management.",
      "Ignored if they benefit the client.",
      "Handled privately with the client.",
      "Used to negotiate extra hours.",
    ],
    a: 0,
  },
  {
    q: "What should you do if you cannot make it to your scheduled shift?",
    options: [
      "Call the client directly.",
      "Notify HR or your scheduler as soon as possible.",
      "Ignore it—someone else will cover.",
      "Wait until your next shift to explain.",
    ],
    a: 1,
  },

  // --- Emergency Procedures ---
  {
    q: "In case of a fire, what is the first thing you should do?",
    options: [
      "Remain calm and evacuate yourself and the client to safety.",
      "Try to extinguish all flames yourself.",
      "Call your coworker for help.",
      "Search for missing paperwork.",
    ],
    a: 0,
  },
  {
    q: "During a tornado warning, where should you and the client go?",
    options: [
      "Basement or interior hallway away from windows.",
      "Nearest porch or balcony.",
      "Any room with large glass doors.",
      "Outside under a tree.",
    ],
    a: 0,
  },
  {
    q: "If exposed to blood or body fluids, what should you do first?",
    options: [
      "Wash the area immediately with soap and water and report exposure.",
      "Continue working until your shift ends.",
      "Ignore it if you feel fine.",
      "Post about it to warn others.",
    ],
    a: 0,
  },
  {
    q: "What should you do if a client falls?",
    options: [
      "Assist the client to stand up immediately.",
      "Do not lift the client alone; assess and report appropriately.",
      "Wait until a family member arrives.",
      "Pretend it didn’t happen.",
    ],
    a: 1,
  },
  {
    q: "What should you do if a carbon monoxide alarm goes off?",
    options: [
      "Leave the home immediately and call 911.",
      "Open windows and stay inside.",
      "Unplug nearby appliances only.",
      "Wait to see if the alarm stops.",
    ],
    a: 0,
  },

  // --- Reporting & Completion ---
  {
    q: "All emergencies must be:",
    options: [
      "Reported promptly to your supervisor.",
      "Kept private.",
      "Discussed casually later.",
      "Documented only if major.",
    ],
    a: 0,
  },
  {
    q: "Which form should you complete after an incident?",
    options: [
      "Incident report form.",
      "Time-off request.",
      "Expense reimbursement form.",
      "Client feedback form.",
    ],
    a: 0,
  },
  {
    q: "When documenting care or incidents, it is important to:",
    options: [
      "Record facts clearly and truthfully.",
      "Use abbreviations and opinions.",
      "Skip minor details.",
      "Rely on memory later.",
    ],
    a: 0,
  },
  {
    q: "Professional caregivers must:",
    options: [
      "Follow agency policies and respect client rights.",
      "Set their own care rules.",
      "Prioritize personal convenience.",
      "Avoid reporting unsafe practices.",
    ],
    a: 0,
  },
  {
    q: "Completing this orientation means:",
    options: [
      "You understand ASHH policies, safety procedures, and your ethical responsibilities.",
      "You are exempt from supervision.",
      "You can make your own emergency rules.",
      "You are no longer responsible for documentation.",
    ],
    a: 0,
  },
];

export default function FinalQuiz() {
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [incorrectIndexes, setIncorrectIndexes] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [fadeOutCelebration, setFadeOutCelebration] = useState(false);

  const numAnswered = answers.filter((a) => a !== -1).length;
  const progress = (numAnswered / quizQuestions.length) * 100;
  const questionText = quizQuestions.map((q) => q.q).join(" ");
  const { isSpeaking, toggleSpeak } = useSpeechReader(questionText, true);

  const handleOptionSelect = (qIdx, oIdx) => {
    const next = [...answers];
    next[qIdx] = oIdx;
    setAnswers(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const incorrect = quizQuestions
      .map((q, i) => (answers[i] !== q.a ? i : null))
      .filter((x) => x !== null);

    setIncorrectIndexes(incorrect);
    setSubmitted(true);

    if (incorrect.length === 0) {
      setShowCelebration(true);
      setTimeout(() => setFadeOutCelebration(true), 5000);
      setTimeout(() => {
        localStorage.setItem("ackQuiz", "true");
        window.location.href = "/dashboard";
      }, 6500);
    }
  };

  const handleRetryIncorrect = () => {
    const next = [...answers];
    incorrectIndexes.forEach((i) => (next[i] = -1));
    setAnswers(next);
    setSubmitted(false);
    setIncorrectIndexes([]);
    setShowCelebration(false);
    setFadeOutCelebration(false);
  };

  return (
    <motion.div
      className="quiz-wrapper"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="quiz-header">
        <div className="quiz-lottie-header">
          <DotLottieReact
            src="https://lottie.host/0251730b-af0f-4a70-8962-6670bdb79b87/5rvz9jeRg2.lottie"
            loop
            autoplay
          />
        </div>
        <h2>Final Orientation Quiz</h2>
        <button
          className={`reader-btn ${isSpeaking ? "active" : ""}`}
          onClick={toggleSpeak}
        >
          🔈
        </button>
      </div>

      <div className="quiz-progress">
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="quiz-progress-text">
        {Math.round(progress)}% Complete ({numAnswered}/{quizQuestions.length})
      </div>

      <form className="quiz-form" onSubmit={handleSubmit}>
        {quizQuestions.map((q, i) => (
          <motion.div
            key={i}
            className={`quiz-question ${
              submitted && incorrectIndexes.includes(i) ? "incorrect" : ""
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <p>
              <strong>{i + 1}.</strong> {q.q}
            </p>
            {q.options.map((opt, j) => (
              <label key={j} className="quiz-option">
                <input
                  type="radio"
                  name={`q${i}`}
                  checked={answers[i] === j}
                  onChange={() => handleOptionSelect(i, j)}
                />
                {opt}
              </label>
            ))}
          </motion.div>
        ))}

        <div className="quiz-action">
          {!submitted && (
            <button
              type="submit"
              className="btn-primary"
              disabled={numAnswered < quizQuestions.length}
            >
              Submit Answers
            </button>
          )}
          {submitted && incorrectIndexes.length > 0 && (
            <button
              type="button"
              className="btn-primary"
              onClick={handleRetryIncorrect}
            >
              Retake Incorrect Answers
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {submitted && incorrectIndexes.length === 0 && (
          <motion.div
            className="quiz-feedback success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {showCelebration && !fadeOutCelebration && (
              <div className="quiz-celebration">
                <DotLottieReact
                  src="https://lottie.host/bfe3a1db-68a8-4a6c-982b-2286cb2b1fa5/XQ2NvOgLr3.lottie"
                  autoplay
                  loop={false}
                />
              </div>
            )}
            {fadeOutCelebration && (
              <div className="quiz-complete">
                🎉 Outstanding! You’ve completed your All Services Orientation
                Quiz and are now ready to begin your journey with compassion and
                care.
                <br />
                <br />
                <button
                  className="btn-primary"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Return to Dashboard →
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}