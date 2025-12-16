import React, { useEffect, useState } from "react";
import "./ToolsStyles/txt_to_speach.css";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);

  const speech = new SpeechSynthesisUtterance();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) return;

    speech.text = text;
    speech.voice = voices[selectedVoice];
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="tts-hero">
      <h1>
        Text To Speech <span>Converter</span>
      </h1>

      <textarea
        placeholder="Write anything here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="tts-row">
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          {voices.map((voice, index) => (
            <option key={index} value={index}>
              {voice.name}
            </option>
          ))}
        </select>

        <button onClick={handleSpeak}>
          ▶ Listen
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
