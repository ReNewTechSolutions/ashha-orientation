import { useEffect, useRef, useState } from "react";

export default function useSpeechReader(initialText = "", autoStop = true) {
  const [text, setText] = useState(initialText);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasFinished, setHasFinished] = useState(true);

  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  const toggleSpeak = () => {
    const synth = synthRef.current;

    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      setHasFinished(true);
      return;
    }

    if (!text) return;

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.lang = "en-US";
    utteranceRef.current.rate = 1;
    utteranceRef.current.pitch = 1;
    setHasFinished(false);

    utteranceRef.current.onstart = () => setIsSpeaking(true);
    utteranceRef.current.onend = () => {
      setIsSpeaking(false);
      setHasFinished(true);
    };

    synth.speak(utteranceRef.current);
  };

  useEffect(() => {
    return () => {
      if (autoStop && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, [autoStop]);

  return { isSpeaking, hasFinished, toggleSpeak, setText };
}