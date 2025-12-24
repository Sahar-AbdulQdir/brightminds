import React, { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause, FaForward, FaBackward, FaBookmark, FaArrowLeft } from "react-icons/fa";
import { fetchHotPodcasts, fetchPodcastEpisodes } from "../../api/podcastAPI";
import "../PodcastPage/PodcastPageStyles/PodcastGrid.css";

const PodcastGrid = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingEpisodeId, setPlayingEpisodeId] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    fetchHotPodcasts().then(setPodcasts).catch(console.error);
  }, []);

  const handlePodcastClick = async (podcast) => {
    setSelectedPodcast(podcast);
    try {
      const eps = await fetchPodcastEpisodes(podcast.id);
      setEpisodes(eps);
    } catch (err) {
      console.error(err);
    }
  };

 const handlePlayPause = (episode) => {
  if (currentAudio?.src === episode.audio) {
    if (!audioRef.current.paused) {
      audioRef.current.pause();
      setPlayingEpisodeId(null);
    } else {
      audioRef.current.play().catch(err => console.error(err));
      setPlayingEpisodeId(episode.id);
    }
  } else {
    audioRef.current.src = episode.audio;
    audioRef.current.load();
    audioRef.current.play().catch(err => console.error(err));
    setCurrentAudio(audioRef.current);
    setPlayingEpisodeId(episode.id);
  }
};


  const skip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

const handleSaveEpisode = async (episode) => {
  const email = localStorage.getItem("userEmail");
  if (!email) {
    alert("Please sign in to save items");
    return;
  }

  try {
    const itemToSave = {
      type: "podcast",
      title: episode.title,
      identifier: episode.id,
      audio: episode.audio,
      image: episode.image,
      description: episode.publisher || "No description",
      duration: episode.duration || "N/A",
    };

    const res = await fetch(`${BASE_URL}/api/save-item`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, item: itemToSave }),
    });

    if (!res.ok) throw new Error("Failed to save item");

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
        <div className="podcast-grid">
          {podcasts.slice(0, 7).map((p, index) => (
            <div
              key={p.id}
              className={`podcast-card card-${index + 1}`}
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
        <div>
          <button className="back-btn" onClick={() => setSelectedPodcast(null)}>
            <FaArrowLeft /> Back
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
      <audio ref={audioRef} />
    </section>
  );
};

export default PodcastGrid;
