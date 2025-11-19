import React, { useState } from "react";
import { FaBookOpen, FaPenFancy, FaBrain } from "react-icons/fa";
import "../../styles/ToolsStyles/tools.css";
import MyNavbar from "../Navbar.jsx";

const readingTools = [
  { name: "Text-to-Speech Reader", action: "tts" },
  { name: "Line-Focus", action: "lineFocus" },
  { name: "Adjustable Text Size & Spacing", action: "textAdjust" },
  { name: "Dyslexia-friendly Font Toggle", action: "fontToggle" },
  { name: "Color Overlay Screen", action: "colorOverlay" },
  { name: "Chunking/Phrase Highlighting", action: "chunking" },
];

const writingTools = [
  { name: "Spell-checker", action: "spellCheck" },
  { name: "Word-prediction Tool", action: "wordPrediction" },
  { name: "Grammar Simplifier", action: "grammarSimplify" },
  { name: "Idea-to-Outline Converter", action: "ideaOutline" },
  { name: "Audio-to-Text Recorder", action: "audioToText" },
];

const studyTools = [
  { name: "Note Simplifier", action: "noteSimplify" },
  { name: "Mind-map Generator", action: "mindMap" },
  { name: "Step-by-Step Instructions Tool", action: "stepByStep" },
  { name: "Flashcard Creator with Audio", action: "flashcards" },
  { name: "Assignment Break-down Tool", action: "assignmentBreakdown" },
];

export default function ToolsResources() {
  const [fontType, setFontType] = useState("OpenDyslexic");
  const [fontSize, setFontSize] = useState(16);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [overlayColor, setOverlayColor] = useState("");

  const handleToolClick = (tool) => {
    switch (tool) {
      case "tts":
        alert("Text-to-Speech Activated!");
        break;
      case "lineFocus":
        alert("Line Focus Activated!");
        break;
      case "textAdjust":
        const newSize = prompt("Enter text size (px):", fontSize);
        const newSpacing = prompt("Enter line spacing:", lineSpacing);
        if (newSize) setFontSize(parseInt(newSize));
        if (newSpacing) setLineSpacing(parseFloat(newSpacing));
        break;
      case "fontToggle":
        setFontType(fontType === "OpenDyslexic" ? "Lexie" : "OpenDyslexic");
        break;
      case "colorOverlay":
        const color = prompt("Enter overlay color (hex):", overlayColor);
        if (color) setOverlayColor(color);
        break;
      default:
        alert(`${tool} tool activated!`);
    }
  };

  const renderTools = (tools, icon) => (
    <div className="category">
      <h2 className="category-title">
        {icon}{" "}
        {tools === readingTools
          ? "Reading Tools"
          : tools === writingTools
          ? "Writing Tools"
          : "Study Tools"}
      </h2>
      <div className="tools-grid">
        {tools.map((tool) => (
          <button
            key={tool.name}
            className="tool-btn"
            onClick={() => handleToolClick(tool.action)}
          >
            {tool.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section
      className="tools-resources">
        <MyNavbar />
      <h1 className="main-title">Tools & Resources</h1>
      {renderTools(readingTools, <FaBookOpen />)}
      {renderTools(writingTools, <FaPenFancy />)}
      {renderTools(studyTools, <FaBrain />)}
    </section>
  );
}
