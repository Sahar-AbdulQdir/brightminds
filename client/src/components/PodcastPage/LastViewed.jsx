import React, { useRef, useEffect } from 'react';
import './PodcastPageStyles/LastViewed.css';

const Highlights = () => {
  const podcastItemsRef = useRef([]);

  // Podcast data
  const podcasts = [
    {
      id: 1,
      title: "The Future of Tech",
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-partying-happily-4640-large.mp4",
      duration: "0:15",
      sourceUrl: "https://example.com/podcast1"
    },
    {
      id: 2,
      title: "Mindfulness & Meditation",
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-woman-listening-to-music-on-her-headphones-while-43757-large.mp4",
      duration: "0:12",
      sourceUrl: "https://example.com/podcast2"
    },
    {
      id: 3,
      title: "Business Innovation",
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-two-business-partners-high-fiving-after-a-good-deal-43831-large.mp4",
      duration: "0:10",
      sourceUrl: "https://example.com/podcast3"
    },
    {
      id: 4,
      title: "Science Discoveries",
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-scientist-in-laboratory-44765-large.mp4",
      duration: "0:18",
      sourceUrl: "https://example.com/podcast4"
    }
  ];

  useEffect(() => {
    const handleMouseEnter = (item) => {
      const video = item.querySelector('video');
      if (video) {
        video.play().catch(e => console.log("Autoplay prevented:", e));
      }
    };

    const handleMouseLeave = (item) => {
      const video = item.querySelector('video');
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };

    // Add event listeners to each podcast item
    podcastItemsRef.current.forEach((item, index) => {
      if (item) {
        item.addEventListener('mouseenter', () => handleMouseEnter(item));
        item.addEventListener('mouseleave', () => handleMouseLeave(item));
      }
    });

    // Cleanup
    return () => {
      podcastItemsRef.current.forEach((item, index) => {
        if (item) {
          item.removeEventListener('mouseenter', () => handleMouseEnter(item));
          item.removeEventListener('mouseleave', () => handleMouseLeave(item));
        }
      });
    };
  }, []);

  const handlePodcastClick = (e, url) => {
    e.stopPropagation(); // Prevent video play/pause when clicking the button
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="podcast-highlights-container">
      <div className="container">
        <div className="content">
          <div className="badge">
            <i className="fas fa-headphones"></i> Trending Worldwide
          </div>
          <h1>From The <span className="highlight">World</span> To Your Ears</h1>
          <p className="description">
            Discover the most compelling conversations from around the globe. 
            Our podcast highlights bring you thought-provoking discussions, 
            inspiring stories, and expert insights from every corner of the world. 
            Hover over any video to preview and click to listen to the full episode.
          </p>
          
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
        
        <div className="laptop-container">
          <div className="laptop">
            <div className="laptop__screen">
              <div className="podcast-grid">
                {podcasts.map((podcast, index) => (
                  <div 
                    key={podcast.id}
                    className="podcast-item"
                    ref={el => podcastItemsRef.current[index] = el}
                  >
                    <div className="video-container">
                      <video preload="auto" muted loop>
                        <source src={podcast.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
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
                      aria-label={`Listen to ${podcast.title}`}
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