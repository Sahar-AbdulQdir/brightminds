// src/components/MyNavbar.jsx
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import "../styles/nav.css";
import "../styles/GeneralFixesStyles/accessibilityPanel.css";

// ⬅️ Import your SVG logo
import Logo from "../assets/Logo.svg";

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

function MyNavbar() {
  const navRef = useRef();
  const [showAccessibility, setShowAccessibility] = useState(false);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <>
      <header>
        <h3>
          <img src={Logo} alt="Cognify Minds Logo" className="nav-logo" />
        </h3>

        <nav ref={navRef}>
          <Link to="/">Home</Link>
          <Link to="/bloggy">Blog</Link>
          <Link to="/games">Games</Link>
          <Link to="/podcasts">Podcasts</Link>

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>

        <div className="nav-icons">
          <button className="icon-btn"><FaWandMagicSparkles /></button>
          <button
            className="icon-btn accessabilitySettings"
            onClick={() => setShowAccessibility(!showAccessibility)}
          >
            <MdEditSquare />
          </button>
          {/* <button className="icon-btn"><FaUserCircle /></button> */}
          <button className="icon-btn"><FaSearch /></button>
        </div>

        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>

      {showAccessibility && <AccessibilityPanel />}
    </>
  );
}

export default MyNavbar;
