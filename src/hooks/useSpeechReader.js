// ✅ src/hooks/useSpeechReader.js
import { useState, useCallback, useEffect } from "react";

export default function useSpeechReader() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [autoReadEnabled, setAutoReadEnabled] = useState(
    localStorage.getItem("ashh-autoSpeech") === "true"
  );

  // ✅ Loads voices and sets up audio unlock
  useEffect(() => {
    let voiceRetry;
    let tried = 0;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available.length > 0) {
        const preferred = available.filter((v) =>
          /(en[-_]US|English)/i.test(v.lang)
        );
        console.log("✅ Voices loaded:", preferred.map((v) => v.name));
        setVoices(preferred.length ? preferred : available);
        clearInterval(voiceRetry);
      } else if (tried < 10) {
        tried++;
        console.warn("⚠️ Voices not ready, retrying...");
      }
    };

    loadVoices();
    voiceRetry = setInterval(loadVoices, 400);
    window.speechSynthesis.onvoiceschanged = loadVoices;

    const unlockAudio = () => {
      if (audioUnlocked) return;
      console.log("🔓 User interaction detected — unlocking audio…");
      try {
        window.speechSynthesis.resume();

        const available = window.speechSynthesis.getVoices();
        const preferredVoice =
          available.find((v) => v.name.includes("Google US English")) ||
          available.find((v) => v.name.includes("Samantha")) ||
          available.find((v) => /en/i.test(v.lang)) ||
          available[0];

        const warmUp = new SpeechSynthesisUtterance(
          "Audio narration is now ready. You can click the speaker icon to begin narration."
        );
        warmUp.voice = preferredVoice;
        warmUp.rate = 1;
        warmUp.pitch = 1;
        warmUp.volume = 1;

        warmUp.onend = () => {
          setAudioUnlocked(true);
          console.log("✅ Audio unlocked and ready for narration");
        };

        window.speechSynthesis.speak(warmUp);
      } catch (err) {
        console.warn("❌ Unlock audio failed:", err);
      }
    };

    document.addEventListener("click", unlockAudio, { once: true });
    document.addEventListener("touchstart", unlockAudio, { once: true });
    document.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      clearInterval(voiceRetry);
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [audioUnlocked]);

  // ✅ Cancel speech
  const cancelSpeech = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  // ✅ Toggle speech manually
  const toggleSpeak = useCallback(() => {
    if (!text) {
      console.warn("⚠️ No text provided for narration");
      return;
    }
    if (!audioUnlocked) {
      console.warn("🚫 Audio not unlocked yet. Tap anywhere first.");
      return;
    }

    // Stop if already speaking
    if (isSpeaking) {
      cancelSpeech();
      setHasFinished(true);
      return;
    }

    try {
      const utter = new SpeechSynthesisUtterance(text);
      const voice =
        voices.find((v) => v.name.includes("Google US English")) ||
        voices.find((v) => v.name.includes("Samantha")) ||
        voices.find((v) => /en/i.test(v.lang)) ||
        voices[0];
      utter.voice = voice;
      utter.rate = 1;
      utter.pitch = 1;
      utter.volume = 1;

      utter.onstart = () => {
        setIsSpeaking(true);
        setHasFinished(false);
        console.log("🎙️ Narration started:", voice?.name);
      };
      utter.onend = () => {
        setIsSpeaking(false);
        setHasFinished(true);
        console.log("✅ Narration finished");
      };
      utter.onerror = (err) => {
        console.error("❌ Narration error:", err);
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } catch (err) {
      console.error("❌ Speech synthesis failed:", err);
      setIsSpeaking(false);
    }
  }, [text, voices, isSpeaking, cancelSpeech, audioUnlocked]);

  // ✅ Toggle auto narration (user preference)
  const toggleAutoRead = useCallback(() => {
    const newValue = !autoReadEnabled;
    setAutoReadEnabled(newValue);
    if (newValue) {
      localStorage.setItem("ashh-autoSpeech", "true");
      console.log("🗣️ Auto narration enabled");
    } else {
      localStorage.removeItem("ashh-autoSpeech");
      window.speechSynthesis.cancel();
      console.log("🔇 Auto narration disabled");
    }
  }, [autoReadEnabled]);

  // ✅ Auto-speak on text update (if enabled)
  useEffect(() => {
    if (!text || !autoReadEnabled || !audioUnlocked) return;

    const timeout = setTimeout(() => {
      const utter = new SpeechSynthesisUtterance(text);
      const voice =
        voices.find((v) => v.name.includes("Google US English")) ||
        voices.find((v) => v.name.includes("Samantha")) ||
        voices.find((v) => /en/i.test(v.lang)) ||
        voices[0];
      utter.voice = voice;
      utter.rate = 1;
      utter.pitch = 1;
      utter.volume = 1;

      utter.onend = () => {
        setIsSpeaking(false);
        setHasFinished(true);
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
      setIsSpeaking(true);
      setHasFinished(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [text, autoReadEnabled, voices, audioUnlocked]);

  // ✅ Cleanup when unmounting
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // ✅ Return usable API
  return {
    isSpeaking,
    hasFinished,
    toggleSpeak,
    setText,
    cancelSpeech,
    audioUnlocked,
    autoReadEnabled,
    toggleAutoRead,
  };
}