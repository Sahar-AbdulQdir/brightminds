// Importing React and required components for the Tools page
import React from "react";
import MyNavbar from "../Navbar.jsx"
import VoiceToText from "../Toolspage/speach_to_txt.jsx";
import TextToSpeech from "../Toolspage/txt_to_speach.jsx";
import "../Toolspage/ToolsStyles/tools.css";

// Tools page component definition
const Tools = () => {
  return (
    <>
      {/* Navbar component displayed at the top */}
      <MyNavbar />

      {/* Main container for the tools page */}
      <div className="tools-page">
        {/* Page title */}
        <h1 className="tools-title">Speech Tools</h1>
        {/* Subtitle/description for the tools */}
        <p className="tools-subtitle">
          Convert your voice to text or turn your text into natural speech.
        </p>

        {/* Grid container to display the speech tools side by side with spacing */}
        <div
          className="tools-grid"
          style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
        >
          {/* Voice to Text tool component */}
          <VoiceToText />
          {/* Text to Speech tool component */}
          <TextToSpeech />
        </div>
      </div>
    </>
  );
};

// Export the Tools page component for use in routing or other components
export default Tools;
