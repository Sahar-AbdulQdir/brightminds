import React, { useEffect, useRef, useState } from "react";
import "../../components/Tools/ToolsStyles/speach_to_txt.css";
const VoiceToText = () => {
  const [text, setText] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join("");
      setText(transcript);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
    };

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, []);

  const startListening = () => {
    recognitionRef.current?.start();
  };

  return (
    <div className="voice_to_text">
      <h1>Voice To Text Converter</h1>

      <textarea
        value={text}
        placeholder="Your speech will appear here..."
        onChange={(e) => setText(e.target.value)}
      />

      <br />

      <button onClick={startListening}>
        Voice to Text
      </button>
    </div>
  );
};

export default VoiceToText;
