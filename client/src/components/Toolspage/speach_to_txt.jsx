// Importing React hooks and required CSS files for styling the VoiceToText component
import React, { useEffect, useRef, useState } from "react";
import "../../components/Toolspage/ToolsStyles/speach_to_txt.css";
import "../../styles/colors.css"

// VoiceToText component definition
const VoiceToText = () => {
  // State to store the transcribed text
  const [text, setText] = useState("");
  // Ref to store the SpeechRecognition instance
  const recognitionRef = useRef(null);

  // useEffect to initialize SpeechRecognition on component mount
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    // Alert if the browser does not support SpeechRecognition
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    // Create a new SpeechRecognition instance and configure it
    const recognition = new SpeechRecognition();
     // Keep recognition running continuously
    recognition.continuous = true;
    // Capture intermediate results
    recognition.interimResults = true; 
    // Set language to English
    recognition.lang = "en-US"; 

    // Event handler for capturing speech results
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join("");
        // Update state with the recognized text
      setText(transcript); 
    };

    // Event handler for when speech recognition ends
    recognition.onend = () => {
      console.log("Speech recognition ended");
    };

    // Store the recognition instance in the ref for later use
    recognitionRef.current = recognition;

    // Cleanup function to stop recognition when component unmounts
    return () => recognition.stop();
  }, []);

  // Function to start listening for speech
  const startListening = () => {
    recognitionRef.current?.start();
  };

  // JSX rendering for the VoiceToText UI
  return (
    <div className="voice_to_text">
      <h1>Voice To Text <span>Converter</span></h1>

      <textarea
        value={text}
        placeholder="Your speech will appear here..."
        onChange={(e) => setText(e.target.value)}
      />

      <br />

      <button onClick={startListening}>
        Voice to Text
      </button>
    </div>
  );
};

// Export the component for use in other parts of the app
export default VoiceToText;
