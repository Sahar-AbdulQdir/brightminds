import React, { useRef } from 'react';
import './PodcastPageStyles/PodcastHighlights.css';

const Highlights = () => {
  const videoRefs = useRef([]);

  const podcasts = [
    {
      id: 1,
      title: "The Future of Tech",
      videoSrc: "/podvid.mp4",
      duration: "0:15",
      sourceUrl: "https://example.com/podcast1"
    },
    {
      id: 2,
      title: "Mindfulness & Meditation",
      videoSrc: "/podvid.mp4",
      duration: "0:12",
      sourceUrl: "https://example.com/podcast2"
    },
    {
      id: 3,
      title: "Business Innovation",
      videoSrc: "/podvid.mp4",
      duration: "0:10",
      sourceUrl: "https://example.com/podcast3"
    },
    {
      id: 4,
      title: "Science Discoveries",
      videoSrc: "/podvid.mp4",
      duration: "0:18",
      sourceUrl: "https://example.com/podcast4"
    }
  ];

const handleHoverPlay = (index) => {
  const video = videoRefs.current[index];
  if (!video) return;

  // Start playing with sound when hovered
  video.muted = false; // unmute
  video.play();
};

const handleHoverStop = (index) => {
  const video = videoRefs.current[index];
  if (!video) return;

  video.pause();
  video.currentTime = 0;
  video.muted = true; // mute again for next hover
};


  const handlePodcastClick = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="podcast-highlights-container">
      <div className="Main-Laptop-container">
<div className="content"> <div className="badge"> <i className="fas fa-headphones"></i> Trending Worldwide </div> <h1>From The <span className="highlight">World</span> To Your Ears</h1> <p className="description"> Discover the most compelling conversations from around the globe. Our podcast highlights bring you thought-provoking discussions, inspiring stories, and expert insights from every corner of the world. Hover over any video to preview and click to listen to the full episode. </p> <div className="stats"> <div className="stat-item"> <span className="stat-number">500+</span> <span className="stat-label">Episodes</span> </div> <div className="stat-item"> <span className="stat-number">2M+</span> <span className="stat-label">Listeners</span> </div> <div className="stat-item"> <span className="stat-number">50+</span> <span className="stat-label">Countries</span> </div> </div> </div>

        <div className="laptop-container">
          <div className="laptop">
            <div className="laptop__screen">
              <div className="podcast-grid">
                {podcasts.map((podcast, index) => (
                  <div
                    key={podcast.id}
                    className="podcast-item"
                    onMouseEnter={() => handleHoverPlay(index)}
                    onMouseLeave={() => handleHoverStop(index)}
                  >
                    <div className="video-container">
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      >
                        <source src={podcast.videoSrc} type="video/mp4" />
                      </video>

                      <div className="duration">{podcast.duration}</div>

                      <div className="play-icon">
                        <i className="fas fa-play-circle"></i>
                      </div>

                      <div className="video-overlay">
                        <h3 className="podcast-title">{podcast.title}</h3>
                      </div>
                    </div>

                    <button
                      className="podcast-source-btn"
                      onClick={(e) => handlePodcastClick(e, podcast.sourceUrl)}
                    >
                      Listen <i className="fas fa-external-link-alt"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

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
