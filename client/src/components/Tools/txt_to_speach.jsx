import React, { useEffect, useState, useRef } from "react";
import "./ToolsStyles/txt_to_speach.css";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [rate, setRate] = useState(1);
  const [isReading, setIsReading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const speechRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) return;

    // Stop
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      setHighlightIndex(0);
      return;
    }

    setIsReading(true);
    setHighlightIndex(0);

    const utterance = new SpeechSynthesisUtterance(text);
    speechRef.current = utterance;

    utterance.voice = voices[selectedVoice];
    utterance.rate = rate;

    const words = text.split(/\s+/);
    let wordIndex = 0;

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        setHighlightIndex(wordIndex);
        wordIndex++;
      }
    };

    utterance.onend = () => {
      setIsReading(false);
      setHighlightIndex(0);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="tts-hero">
      <h1>
        Text To Speech <span>Converter</span>
      </h1>

      {!isReading ? (
        <textarea
          placeholder="Write anything here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <div className="highlight-text">
          {text.split(/\s+/).map((word, idx) => (
            <span
              key={idx}
              className={idx === highlightIndex ? "highlighted" : ""}
            >
              {word}{" "}
            </span>
          ))}
        </div>
      )}

      <div className="tts-row">
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(Number(e.target.value))}
        >
          {voices.map((voice, index) => (
            <option key={index} value={index}>
              {voice.name}
            </option>
          ))}
        </select>

        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
        <span>speed: {rate}x</span>

        <button onClick={handleSpeak}>
          {isReading ? "⏹ Stop" : "▶ Listen"}
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
