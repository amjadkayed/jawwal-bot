import { useState, useEffect } from "react";

const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported by this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ar";

    recognition.onstart = () => {
      console.log("Voice recognition activated");
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setText(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error", event.error);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  // Toggle function to start or stop listening
  const toggleListening = () => setIsListening((prevState) => !prevState);

  return { text, toggleListening , isListening};
};

export default useSpeechToText;
