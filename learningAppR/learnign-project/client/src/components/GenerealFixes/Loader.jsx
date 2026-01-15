import React from "react";
import "../../styles/Loader.css"; // Loader styles

// Loader component showing a looping video
const Loader = () => {
  return (
    <div className="video-loader-overlay"> {/* Overlay container */}
      <video
        className="loader-video" 
        src="/Loader.mp4" 
        // Video element
        autoPlay 
        loop 
        muted 
        playsInline
      />
    </div>
  );
};

export default Loader; // Export loader component
