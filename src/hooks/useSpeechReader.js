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

  useEffect(() => {
    console.log("🪶 Step 1: useEffect -> Load voices triggered");
    let tries = 0;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      console.log("🪶 Step 1a: Voices available =", available.length);
      if (available.length > 0) {
        const preferred = available.filter((v) =>
          /(en[-_]US|English)/i.test(v.lang)
        );
        console.log("✅ Voices loaded:", preferred.map((v) => v.name));
        setVoices(preferred.length ? preferred : available);
        clearInterval(voiceRetry);
      } else {
        tries++;
        if (tries > 10) console.warn("⚠️ Voices not ready — retrying...");
      }
    };

    loadVoices();
    const voiceRetry = setInterval(loadVoices, 500);
    window.speechSynthesis.onvoiceschanged = loadVoices;

    const unlockAudio = () => {
      console.log("🪶 Step 2: unlockAudio called by user");
      try {
        window.speechSynthesis.resume();

        // ✅ Wait until voices are available before attempting warm-up
        const waitForVoices = () => {
          const available = window.speechSynthesis.getVoices();
          if (!available.length) {
            console.warn("⚠️ Voices not ready, waiting...");
            setTimeout(waitForVoices, 300);
            return;
          }

          const preferredVoice =
            available.find((v) => v.name.includes("Google US English")) ||
            available.find((v) => v.name.includes("Samantha")) ||
            available.find((v) => /en/i.test(v.lang)) ||
            available[0];

          const warmUp = new SpeechSynthesisUtterance(
            "Audio narration is now ready. You can click the speaker icon to begin narration."
          );
          warmUp.voice = preferredVoice;
          warmUp.volume = 1;
          warmUp.rate = 1;
          warmUp.pitch = 1;

          warmUp.onstart = () =>
            console.log("🔊 Warm-up STARTED with", preferredVoice.name);
          warmUp.onend = () => {
            console.log("✅ Warm-up ENDED — Audio unlocked");
            setAudioUnlocked(true);
          };
          warmUp.onerror = (err) => console.error("❌ Warm-up error:", err);

          window.speechSynthesis.cancel(); // clear pending queue
          window.speechSynthesis.speak(warmUp);
        };

        waitForVoices();
      } catch (err) {
        console.warn("❌ Unlock failed:", err);
      }
    };

    document.addEventListener("click", unlockAudio, { once: true });
    document.addEventListener("keydown", unlockAudio, { once: true });
    document.addEventListener("touchstart", unlockAudio, { once: true });

    return () => {
      clearInterval(voiceRetry);
      window.speechSynthesis.onvoiceschanged = null;
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  const cancelSpeech = useCallback(() => {
    console.log("🪶 Step 3: cancelSpeech called");
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleSpeak = useCallback(() => {
    console.log("🪶 Step 4: toggleSpeak called, unlocked =", audioUnlocked);
    if (!text) {
      console.warn("⚠️ No text to speak");
      return;
    }
    if (!audioUnlocked) {
      console.warn("🚫 Audio not unlocked yet");
      return;
    }

    if (isSpeaking) {
      cancelSpeech();
      setHasFinished(true);
      return;
    }

    try {
      const utter = new SpeechSynthesisUtterance(text);
      const googleVoice =
        voices.find((v) => v.name.includes("Google US English")) ||
        voices.find((v) => v.name.includes("Samantha")) ||
        voices.find((v) => /en/i.test(v.lang)) ||
        voices[0];
      utter.voice = googleVoice;
      console.log("🪶 Step 5: Using voice =", utter.voice?.name);

      utter.onstart = () => {
        console.log("🎙️ Speech started");
        setIsSpeaking(true);
        setHasFinished(false);
      };
      utter.onend = () => {
        console.log("✅ Speech ended normally");
        setIsSpeaking(false);
        setHasFinished(true);
      };
      utter.onerror = (err) => {
        console.error("❌ Speech synthesis error event:", err);
      };

      window.speechSynthesis.cancel();
      setTimeout(() => {
        console.log("🪶 Step 6: Speaking now...");
        window.speechSynthesis.speak(utter);
      }, 250);
    } catch (err) {
      console.error("❌ toggleSpeak failed:", err);
      setIsSpeaking(false);
    }
  }, [text, voices, isSpeaking, cancelSpeech, audioUnlocked]);

  return { isSpeaking, hasFinished, toggleSpeak, setText, cancelSpeech };
}