import { useState, useCallback, useEffect } from "react";

export default function useSpeechReader() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [text, setText] = useState("");
  const [autoReadEnabled, setAutoReadEnabled] = useState(
    localStorage.getItem("ashh-autoSpeech") === "true"
  );

  // === Toggle Auto Narration Mode ===
  const toggleAutoRead = useCallback(() => {
    const newValue = !autoReadEnabled;
    setAutoReadEnabled(newValue);
    if (newValue) {
      localStorage.setItem("ashh-autoSpeech", "true");
    } else {
      localStorage.removeItem("ashh-autoSpeech");
      window.speechSynthesis.cancel();
    }
  }, [autoReadEnabled]);

  // === Cancel any existing speech ===
  const cancelSpeech = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  // === Core toggle function ===
  const toggleSpeak = useCallback(() => {
    if (!text) return;

    // Cancel existing
    window.speechSynthesis.cancel();

    // If currently speaking — stop
    if (isSpeaking) {
      setIsSpeaking(false);
      setHasFinished(true);
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setHasFinished(false);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setHasFinished(true);
      };

      window.speechSynthesis.speak(utterance);

      // Once user triggers narration manually, enable auto mode
      if (!autoReadEnabled) {
        setAutoReadEnabled(true);
        localStorage.setItem("ashh-autoSpeech", "true");
      }
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      setIsSpeaking(false);
    }
  }, [text, isSpeaking, autoReadEnabled]);

  // === Auto-read new text after approval ===
  useEffect(() => {
    if (!text) return;
    if (autoReadEnabled && !isSpeaking) {
      const timeout = setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onend = () => {
          setIsSpeaking(false);
          setHasFinished(true);
        };

        try {
          window.speechSynthesis.speak(utterance);
          setIsSpeaking(true);
          setHasFinished(false);
        } catch (err) {
          console.warn("Auto speech blocked:", err);
        }
      }, 800); // slight delay to allow slide animation
      return () => clearTimeout(timeout);
    }
  }, [text, autoReadEnabled]);

  // === Stop speaking when component unmounts ===
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // ✅ Include everything you need here
  return {
    isSpeaking,
    hasFinished,
    toggleSpeak,
    setText,
    cancelSpeech,
    autoReadEnabled,
    toggleAutoRead, // 👈 add this line
  };
}