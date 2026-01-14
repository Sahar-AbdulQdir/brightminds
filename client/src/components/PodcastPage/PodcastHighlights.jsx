import React, { useRef } from 'react';
import './PodcastPageStyles/PodcastHighlights.css';
import "../../styles/colors.css"

// Component for displaying trending podcast highlights with hover-preview videos
const Highlights = () => {
  // Ref array to hold references to each video element
  const videoRefs = useRef([]);

  // Array of featured podcast highlights
  const podcasts = [
    {
      id: 1,
      title: "How to Make Time for Everything?",
      videoSrc: "/H_vid1.mp4",
      duration: "0:15",
      sourceUrl: "https://www.youtube.com/watch?v=mAGVDDhujzc"
    },
    {
      id: 2,
      title: "Why Dehydration Is Worse Than You Think!",
      videoSrc: "/H_vid2.mp4",
      duration: "0:12",
      sourceUrl: "https://www.youtube.com/watch?v=JIKU7PVhEdU"
    },
    {
      id: 3,
      title: "The Habit That Will Make Or Break Your Entire 2026!",
      videoSrc: "/H_vid3.mp4",
      duration: "0:10",
      sourceUrl: "https://www.youtube.com/watch?v=rtufWBLOXgw"
    },
    {
      id: 4,
      title: "Change Your Brain: Neuroscientist Dr. Andrew Huberman",
      videoSrc: "/H_vid4.mp4",
      duration: "0:18",
      sourceUrl: "https://www.youtube.com/watch?v=SwQhKFMxmDY"
    }
  ];

  // Play video with sound on hover
  const handleHoverPlay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    video.muted = false; // unmute for hover preview
    video.play();
  };

  // Stop video and reset on mouse leave
  const handleHoverStop = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.muted = true; // mute again for next hover
  };

  // Open podcast source link in a new tab
  const handlePodcastClick = (e, url) => {
    e.stopPropagation(); // prevent parent handlers
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="podcast-highlights-container">
      <div className="Main-Laptop-container">

        {/* Content above the laptop mockup */}
        <div className="content">
          <div className="badge">
            <i className="fas fa-headphones"></i> Trending Worldwide
          </div>

          <h1>From The <span className="circle-sketch-highlight">World</span> To Your Ears</h1>

          <p className="description">
            Discover the most compelling conversations from around the globe. 
            Our podcast highlights bring you thought-provoking discussions, inspiring stories, 
            and expert insights from every corner of the world. Hover over any video to preview 
            and click to listen to the full episode.
          </p>

          {/* Stats section */}
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Episodes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2M+</span>
              <span className="stat-label">Listeners</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>

        {/* Laptop mockup container for videos */}
        <div className="laptop-container">
          <div className="laptop">
            <div className="laptop__screen">
              <div className="podcast-grid">
                {podcasts.map((podcast, index) => (
                  <div
                    key={podcast.id}
                    className="podcast-item"
                    onMouseEnter={() => handleHoverPlay(index)} // hover to play
                    onMouseLeave={() => handleHoverStop(index)} // hover out to stop
                  >
                    <div className="video-container">
                      {/* Video element with ref for control */}
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      >
                        <source src={podcast.videoSrc} type="video/mp4" />
                      </video>

                      {/* Duration overlay */}
                      <div className="duration">{podcast.duration}</div>

                      {/* Play icon overlay */}
                      <div className="play-icon">
                        <i className="fas fa-play-circle"></i>
                      </div>

                      {/* Title overlay */}
                      <div className="video-overlay">
                        <h3 className="podcast-title">{podcast.title}</h3>
                      </div>
                    </div>

                    {/* Button to go to full podcast source */}
                    <button
                      className="podcast-source-btn"
                      onClick={(e) => handlePodcastClick(e, podcast.sourceUrl)}
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Laptop base and shadow for visual effect */}
            <div className="laptop__bottom">
              <div className="laptop__under"></div>
            </div>
            <div className="laptop__shadow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
