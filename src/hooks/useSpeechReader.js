// ✅ src/hooks/useSpeechReader.js
import { useState, useCallback, useEffect } from "react";

export default function useSpeechReader() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Load voices and unlock audio
  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available.length) {
        setVoices(available);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    const unlockAudio = () => {
      if (audioUnlocked) return;
      window.speechSynthesis.resume();
      const utter = new SpeechSynthesisUtterance("Narration ready");
      const voice =
        window.speechSynthesis
          .getVoices()
          .find((v) => v.name.includes("Google US English")) ||
        window.speechSynthesis.getVoices()[0];
      utter.voice = voice;
      utter.onend = () => setAudioUnlocked(true);
      window.speechSynthesis.speak(utter);
    };

    document.addEventListener("click", unlockAudio, { once: true });
    return () => {
      document.removeEventListener("click", unlockAudio);
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [audioUnlocked]);

  const toggleSpeak = useCallback(() => {
    if (!text) return;
    if (!audioUnlocked) return alert("Tap once to enable narration.");

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    const voice =
      voices.find((v) => v.name.includes("Google US English")) ||
      voices.find((v) => /en/i.test(v.lang)) ||
      voices[0];
    utter.voice = voice;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }, [text, isSpeaking, voices, audioUnlocked]);

  return { isSpeaking, toggleSpeak, setText };
}