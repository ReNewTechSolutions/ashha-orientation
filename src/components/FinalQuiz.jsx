// ✅ src/components/FinalQuiz.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import useSpeechReader from "../hooks/useSpeechReader";
import "./FinalQuiz.css";

const quizQuestions = [
  {
    q: "What is the All Services Home Healthcare motto?",
    options: [
      "Your home is where our heart is.",
      "Caring for you, every step of the way.",
      "Excellence in every visit.",
      "Serving with compassion and care.",
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
      "No one",
    ],
    a: 0,
  },
  {
    q: "What must you never do with a client’s money or belongings?",
    options: [
      "Borrow with permission",
      "Never misuse, borrow, or take",
      "Keep it for safekeeping",
      "Ask a family member",
    ],
    a: 1,
  },
  {
    q: "When should you uphold client privacy?",
    options: [
      "Only during work hours",
      "At all times",
      "Only when asked",
      "With supervisor approval",
    ],
    a: 1,
  },
];

export default function FinalQuiz({ onComplete }) {
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [incorrectIndexes, setIncorrectIndexes] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [fadeOutCelebration, setFadeOutCelebration] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [readerEnabled, setReaderEnabled] = useState(false);

  const questionText = quizQuestions[currentQuestion]?.q || "";
  const { isSpeaking, toggleSpeak } = useSpeechReader(questionText, true);

  const numAnswered = answers.filter((a) => a !== -1).length;
  const progress = (numAnswered / quizQuestions.length) * 100;

  function handleOptionSelect(qIdx, oIdx) {
    const next = [...answers];
    next[qIdx] = oIdx;
    setAnswers(next);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const incorrect = quizQuestions
      .map((q, i) => (answers[i] !== q.a ? i : null))
      .filter((x) => x !== null);

    setIncorrectIndexes(incorrect);
    setSubmitted(true);

    if (incorrect.length === 0) {
      setShowCelebration(true);
      setTimeout(() => setFadeOutCelebration(true), 5000);
      setTimeout(() => onComplete?.(), 6000);
    }
  }

  function handleRetryIncorrect() {
    const next = [...answers];
    incorrectIndexes.forEach((i) => (next[i] = -1));
    setAnswers(next);
    setSubmitted(false);
    setIncorrectIndexes([]);
    setShowCelebration(false);
    setFadeOutCelebration(false);
  }

  return (
    <motion.div
      className="quiz-wrapper"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* === Header === */}
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

      {/* === Progress Bar === */}
      <div className="quiz-progress">
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="quiz-progress-text">
        {Math.round(progress)}% Complete ({numAnswered}/{quizQuestions.length})
      </div>

      {/* === Questions === */}
      <form className="quiz-form" onSubmit={handleSubmit}>
        {quizQuestions.map((q, i) => (
          <motion.div
            key={i}
            className={`quiz-question ${submitted && incorrectIndexes.includes(i) ? "incorrect" : ""}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p>
              <strong>{i + 1}.</strong> {q.q}
            </p>
            {q.options.map((opt, j) => (
              <label key={j} className="quiz-option">
                <input
                  type="radio"
                  name={`q${i}`}
                  disabled={submitted && incorrectIndexes.length === 0}
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

      {/* === Feedback Section === */}
      <AnimatePresence>
        {submitted && incorrectIndexes.length === 0 && (
          <motion.div
            className="quiz-feedback success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {showCelebration && !fadeOutCelebration && (
              <div className="quiz-celebration">
                <div className="celebration-glow"></div>
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
              </div>
            )}
          </motion.div>
        )}

        {submitted && incorrectIndexes.length > 0 && (
          <motion.div
            className="quiz-feedback error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ Some answers were incorrect. Review and retake only missed
            questions.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}