// src/components/GifLoader.jsx
import React from "react";
import "../../styles/GeneralFixesStyles/Loader.css";

const Loader = () => {
  return (
    <div className="video-loader-overlay">
      <video 
        className="loader-video" 
        src="/Loader.mp4" // Use URL path starting with /
        autoPlay 
        loop 
        muted 
      />
    </div>
  );
};

export default Loader;
