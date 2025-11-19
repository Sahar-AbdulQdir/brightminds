// src/components/AccessibilityPanel.jsx
import React, { useState, useEffect } from "react";
import "../styles/GeneralFixesStyles/accessibilityPanel.css";

function AccessibilityPanel() {
  const [font, setFont] = useState("Verdana");
  const [lineHeight, setLineHeight] = useState("1.5");
  const [letterSpacing, setLetterSpacing] = useState("0");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [reduceAnimations, setReduceAnimations] = useState(false);

  // Apply styles to the document body
  useEffect(() => {
    document.body.style.fontFamily = font;
    document.body.style.lineHeight = lineHeight;
    document.body.style.letterSpacing = `${letterSpacing}px`;
    document.body.style.backgroundColor = bgColor;
    if (reduceAnimations) {
      document.body.classList.add("reduce-animations");
    } else {
      document.body.classList.remove("reduce-animations");
    }
  }, [font, lineHeight, letterSpacing, bgColor, reduceAnimations]);

  return (
    <div className="accessibility-panel">
      <h3>Accessibility Settings</h3>

      <div className="setting">
        <label>Font</label>
        <select value={font} onChange={(e) => setFont(e.target.value)}>
          <option value="Verdana">Verdana</option>
          <option value="Lexend">Lexend</option>
          <option value="OpenDyslexic">OpenDyslexic</option>
        </select>
      </div>

      <div className="setting">
        <label>Line Spacing</label>
        <input
          type="number"
          value={lineHeight}
          step="0.1"
          min="1"
          max="3"
          onChange={(e) => setLineHeight(e.target.value)}
        />
      </div>

      <div className="setting">
        <label>Letter Spacing</label>
        <input
          type="number"
          value={letterSpacing}
          step="0.5"
          min="0"
          max="5"
          onChange={(e) => setLetterSpacing(e.target.value)}
        />
      </div>

      <div className="setting">
        <label>Background Color</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>

      <div className="setting">
        <label>
          <input
            type="checkbox"
            checked={ttsEnabled}
            onChange={() => setTtsEnabled(!ttsEnabled)}
          />
          Text-to-Speech
        </label>
      </div>

      <div className="setting">
        <label>
          <input
            type="checkbox"
            checked={reduceAnimations}
            onChange={() => setReduceAnimations(!reduceAnimations)}
          />
          Reduce Animations
        </label>
      </div>
    </div>
  );
}

export default AccessibilityPanel;
