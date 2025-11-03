// ✅ src/hooks/useSpeechReader.js
import { useState, useEffect, useRef } from "react";

export default function useSpeechReader(text) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    // Cancel any ongoing speech when text changes or unmounts
    return () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    };
  }, [text]);

  const toggleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else if (text && text.trim()) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1;
      utterance.lang = "en-US";
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return { isSpeaking, toggleSpeak };
}