import React from "react";
import MyNavbar from "../Navbar.jsx"
import VoiceToText from "../Tools/speach_to_txt.jsx";
import TextToSpeech from "../Tools/txt_to_speach.jsx";
import TextSimplifier from "../Tools/TextSimplifier.jsx";
import "../Tools/ToolsStyles/tools.css";

const Tools = () => {
  return (
    <>
      <MyNavbar />

      <div className="tools-page">
        <h1 className="tools-title">Speech Tools</h1>
        <p className="tools-subtitle">
          Convert your voice to text or turn your text into natural speech.
        </p>

<div
  className="tools-grid"
  style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
>
          <VoiceToText />
          <TextToSpeech />
        </div>
        <TextSimplifier/>
      </div>
    </>
  );
};

export default Tools;
