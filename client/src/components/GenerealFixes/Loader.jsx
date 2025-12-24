// src/components/GifLoader.jsx
import React from "react";
import "../../styles/GeneralFixesStyles/Loader.css";
import loaderVideo from "../../../public/loader.mp4"; // Replace with your video path

const Loader = () => {
  return (
    <div className="video-loader-overlay">
      <video 
        className="loader-video" 
        src={loaderVideo} 
        autoPlay 
        loop 
        muted 
      />
    </div>
  );
};

export default Loader;