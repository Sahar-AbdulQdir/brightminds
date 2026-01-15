/*
  - Top navigation bar for the app including links, quick icons and an
  - Accessibility panel (font, spacing, and text-to-speech toggle).
  - `AccessibilityPanel` provides small UI controls and applies styles to <body>
  - `MyNavbar` manages the responsive navigation and global TTS behavior
 */

import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import "../styles/nav.css";
import "../styles/accessibilityPanel.css";
import { RiSave3Line } from "react-icons/ri";
import "../styles/colors.css"
import Logo from "../assets/icons/Logo.svg";

// AccessibilityPanel: small UI for accessibility controls
// Props:
//  - ttsEnabled (bool): whether hover-to-read is enabled
//  - setTtsEnabled (fn): toggles the TTS feature
// Local state controls font, lineHeight and letterSpacing applied to <body>
function AccessibilityPanel({ ttsEnabled, setTtsEnabled }) {
  const [font, setFont] = useState("Verdana");
  const [lineHeight, setLineHeight] = useState("1.5");
  const [letterSpacing, setLetterSpacing] = useState("0");

  // Apply selected accessibility styles directly to the document <body>
  // (simple approach: in a larger app consider using CSS classes instead)
  useEffect(() => {
    document.body.style.fontFamily = font;
    document.body.style.lineHeight = lineHeight;
    document.body.style.letterSpacing = `${letterSpacing}px`;
  }, [font, lineHeight, letterSpacing]);

  return (
    <div className="accessibility-panel">
      <h3>Accessibility Settings</h3>

      <div className="setting">
        <label>Font</label>
        <select value={font} onChange={(e) => setFont(e.target.value)}>
          <option value='"Comic Sans MS", "Comic Sans", cursive'>Comic Sans</option>
          <option value="Arial, Helvetica, sans-serif">Arial</option>
          <option value="Helvetica, Arial, sans-serif">Helvetica</option>
          <option value='"OpenDyslexic", Arial, sans-serif'>OpenDyslexic</option>
          <option value='"Atkinson Hyperlegible", Arial, sans-serif'>Atkinson Hyperlegible</option>
          <option value='"Atkinson Hyperlegible Next", Arial, sans-serif'>Atkinson Hyperlegible Next</option>
          <option value='"Atkinson Hyperlegible Mono", monospace'>Atkinson Hyperlegible Mono</option>
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

      {/* Toggle for hover-to-read: flips global ttsEnabled state handled by MyNavbar */}
<div className="setting">
  <label className="switch-label">
    Enable Text-to-Speech on Hover
    <div className="switch">
      <input
        type="checkbox"
        checked={ttsEnabled}
        onChange={() => setTtsEnabled(!ttsEnabled)}
      />
      <span className="slider"></span>
    </div>
  </label>
</div>

    </div>
  );
}


function MyNavbar() {
  // navRef refers to the <nav> element so we can toggle a responsive class
  const navRef = useRef();
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);

  // Toggle mobile/compact nav visibility by adding/removing a CSS class
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
// If TTS is enabled, attach global mouseover/mouseout listeners that
// read text content of simple elements (P, SPAN, headers, LI, BUTTON, A).
// Note: This is a lightweight approach and may read undesired content; in
// production prefer scoping listeners or using ARIA/live regions for accessibility.
useEffect(() => {
  if (!ttsEnabled) return;

  let utterance = null;

  const handleMouseOver = (e) => {
    if (
      e.target &&
      ["P","SPAN","H1","H2","H3","H4","H5","H6","LI","BUTTON","A"].includes(e.target.tagName)
    ) {
      // Only read direct text, not child elements
      const text = e.target.childNodes.length === 1 && e.target.childNodes[0].nodeType === 3
        ? e.target.innerText
        : e.target.childNodes[0]?.nodeValue || e.target.innerText;

      if (text?.trim()) {
        utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleMouseOut = () => {
    if (utterance) {
      window.speechSynthesis.cancel();
      utterance = null;
    }
  };

  document.addEventListener("mouseover", handleMouseOver);
  document.addEventListener("mouseout", handleMouseOut);

  // Cleanup listeners and cancel any ongoing speech when toggled off / on unmount
  return () => {
    document.removeEventListener("mouseover", handleMouseOver);
    document.removeEventListener("mouseout", handleMouseOut);
    window.speechSynthesis.cancel();
  };
}, [ttsEnabled]);

  return (
    <>
      {/* Main header: logo, nav links, quick icons, and mobile menu button */}
      <header>
        <h3>
          <img src={Logo} alt="Cognify Minds Logo" className="nav-logo" />
        </h3>

        {/* Navigation links; ref used for responsive toggle */}
        <nav ref={navRef}>
          <Link to="/">Home</Link>
          <Link to="/AudioBooks">Audio Books</Link>
          {/* <Link to="/games">Games</Link> */}
          <Link to="/podcasts">Podcasts</Link>

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>

        {/* Icon buttons (tools, accessibility panel, saved) */}
        <div className="nav-icons">
          <Link to="/tools" className="icon-btn">
            <FaWandMagicSparkles />
          </Link>

          <button
            className="icon-btn accessabilitySettings"
            onClick={() => setShowAccessibility(!showAccessibility)}
          >
            <MdEditSquare />
          </button>

          <Link to="/SavedPage" className="icon-btn">
            <RiSave3Line />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>

      {/* Conditionally render the accessibility control panel */}
      {showAccessibility && (
        <AccessibilityPanel ttsEnabled={ttsEnabled} setTtsEnabled={setTtsEnabled} />
      )}
    </>
  );
}


export default MyNavbar;
