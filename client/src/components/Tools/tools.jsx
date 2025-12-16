import React from "react";
import MyNavbar from "../Navbar.jsx"
import VoiceToText from "../Tools/speach_to_txt.jsx";
import TextToSpeech from "../Tools/txt_to_speach.jsx";
import TextEditor from "./textEditor.jsx";
// import "../Tools/ToolsStyles/tools.css";

const Tools = () => {
  return (
    <>
      <MyNavbar />

      <div className="tools-page">
        <h1 className="tools-title">Speech Tools</h1>
        <p className="tools-subtitle">
          Convert your voice to text or turn your text into natural speech.
        </p>

        <div className="tools-grid">
          <VoiceToText />
          <TextToSpeech />
          <TextEditor />
        </div>
      </div>
    </>
  );
};

export default Tools;
