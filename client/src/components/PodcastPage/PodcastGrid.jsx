import React, { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause, FaForward, FaBackward, FaBookmark, FaArrowLeft } from "react-icons/fa";
import { fetchHotPodcasts, fetchPodcastEpisodes } from "../../api/podcastAPI";
import "../PodcastPage/PodcastPageStyles/PodcastGrid.css";
import "../../styles/colors.css"

// Base URL for saving episodes (fallback if env variable not set)
const BASE_URL = import.meta.env.VITE_API_URL || "https://lexiaminds-private-test.onrender.com";

const PodcastGrid = () => {
  // State to hold fetched podcasts
  const [podcasts, setPodcasts] = useState([]);
  // State for currently selected podcast
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  // State to hold episodes of selected podcast
  const [episodes, setEpisodes] = useState([]);
  // State to track which episode is currently playing
  const [playingEpisodeId, setPlayingEpisodeId] = useState(null);
  // Ref for the audio element to control playback
  const audioRef = useRef(new Audio());

  // Fetch the list of hot podcasts on component mount
  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        const data = await fetchHotPodcasts();
        setPodcasts(data);
      } catch (err) {
        console.error("Failed to load podcasts:", err);
      }
    };
    loadPodcasts();
  }, []);

  // When a podcast card is clicked, fetch its episodes
  const handlePodcastClick = async (podcast) => {
    setSelectedPodcast(podcast);
    try {
      const eps = await fetchPodcastEpisodes(podcast.id);
      setEpisodes(eps);
    } catch (err) {
      console.error("Failed to load episodes:", err);
    }
  };

  // Play or pause the selected episode
  const handlePlayPause = (episode) => {
    if (audioRef.current.src === episode.audio) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(console.error); // Play audio if paused
        setPlayingEpisodeId(episode.id);
      } else {
        audioRef.current.pause(); // Pause if already playing
        setPlayingEpisodeId(null);
      }
    } else {
      // Switch to a new episode
      audioRef.current.src = episode.audio;
      audioRef.current.play().catch(console.error);
      setPlayingEpisodeId(episode.id);
    }
  };

  // Skip forward or backward in the audio by seconds
  const skip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  // Save an episode to the user's saved items
  const handleSaveEpisode = async (episode) => {
    const email = localStorage.getItem("userEmail");
    if (!email) return alert("Please sign in to save items");

    // Prepare the episode data to save
    const itemToSave = {
      type: "podcast",
      title: episode.title,
      identifier: episode.id,
      audio: episode.audio,
      image: episode.image,
      description: episode.publisher || "No description",
      duration: episode.duration || "N/A",
    };

    try {
      // Send POST request to save episode
      const res = await fetch(`${BASE_URL}/api/save-item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, item: itemToSave }),
      });

      if (!res.ok) throw new Error("Failed to save episode");
      alert(`Saved podcast: ${episode.title}`);
    } catch (err) {
      console.error(err);
      alert("Could not save the podcast");
    }
  };

  return (
    <section className="podcast-section">
      <h2>Hottest this week</h2>
      {!selectedPodcast ? (
        // Grid view for top podcasts
        <div className="podcast-grid">
          {podcasts.slice(0, 7).map((p, i) => (
            <div
              key={p.id}
              className={`podcast-card card-${i + 1}`}
              style={{ backgroundImage: `url(${p.image})` }}
              onClick={() => handlePodcastClick(p)}
            >
              <div className="overlay">
                <h3>{p.title}</h3>
                <p>{p.publisher}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Episode list for the selected podcast
        <div>
          <button className="back-btn" onClick={() => setSelectedPodcast(null)}>
             Back
          </button>
          <h3>{selectedPodcast.title} - Episodes</h3>
          <ul className="episode-list">
            {episodes.map((ep) => (
              <li key={ep.id} className="episode-item">
                <span>{ep.title}</span>
                <div className="episode-controls">
                  <button className="control-btn" onClick={() => handlePlayPause(ep)}>
                    {playingEpisodeId === ep.id ? <FaPause /> : <FaPlay />}
                  </button>
                  <button className="control-btn" onClick={() => skip(-10)}>
                    <FaBackward /> 10s
                  </button>
                  <button className="control-btn" onClick={() => skip(10)}>
                    10s <FaForward />
                  </button>
                  <button className="control-btn" onClick={() => handleSaveEpisode(ep)}>
                    <FaBookmark />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Audio element controlled via ref */}
      <audio ref={audioRef} />
    </section>
  );
};

export default PodcastGrid;
