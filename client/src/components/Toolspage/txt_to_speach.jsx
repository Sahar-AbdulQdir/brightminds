// Importing React hooks and required CSS files for TextToSpeech component
import React, { useEffect, useState, useRef } from "react";
import "./ToolsStyles/txt_to_speach.css";
import "../../styles/colors.css"

// TextToSpeech component definition
const TextToSpeech = () => {
  // State variables for text input, available voices, selected voice, reading rate, reading status, and word highlight index
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [rate, setRate] = useState(1);
  const [isReading, setIsReading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  // Ref to store the current SpeechSynthesisUtterance instance
  const speechRef = useRef(null);

  // useEffect to load available voices when the component mounts
  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Function to handle speaking the text
  const handleSpeak = () => {
    if (!text.trim()) return;

    // If already speaking, stop the current speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      setHighlightIndex(0);
      return;
    }

    // Start reading
    setIsReading(true);
    setHighlightIndex(0);

    const utterance = new SpeechSynthesisUtterance(text);
    speechRef.current = utterance;

    // Set the selected voice and speech rate
    utterance.voice = voices[selectedVoice];
    utterance.rate = rate;

    // Split text into words for highlighting
    const words = text.split(/\s+/);
    let wordIndex = 0;

    // Update highlight index as each word is spoken
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        setHighlightIndex(wordIndex);
        wordIndex++;
      }
    };

    // Reset state when reading ends
    utterance.onend = () => {
      setIsReading(false);
      setHighlightIndex(0);
    };

    // Speak the utterance
    window.speechSynthesis.speak(utterance);
  };

  // JSX rendering for the TextToSpeech UI
  return (
    <div className="tts-hero">
      <h1>
        Text To Speech <span>Converter</span>
      </h1>

      {/* Display textarea for input if not reading, else show highlighted text */}
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

      {/* Controls for selecting voice, adjusting rate, and starting/stopping speech */}
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

// Export the TextToSpeech component
export default TextToSpeech;
