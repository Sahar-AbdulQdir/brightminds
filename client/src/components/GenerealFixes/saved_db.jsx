import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaBookmark, FaTrash, FaFilter } from "react-icons/fa";
import MyNavbar from "../Navbar.jsx";
import "../../styles/GeneralFixesStyles/saved_db.css";

// ✅ BASE URL (WORKS LOCALLY + WHEN HOSTED)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SavedPage = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  /* ========================= FETCH SAVED ITEMS ========================= */
  const fetchSavedItems = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    try {
      const res = await fetch(`${BASE_URL}/api/saved-items?email=${email}`);
      if (!res.ok) throw new Error("Failed to fetch saved items");

      const data = await res.json();
      setSavedItems(
        data.map(item => ({
          ...item,
          id: item._id, // MongoDB ID
        }))
      );
    } catch (err) {
      console.error("❌ Failed to fetch saved items:", err);
    }
  };

  useEffect(() => {
    fetchSavedItems();
  }, []);

  /* ========================= REMOVE ITEM ========================= */
  const removeItem = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/saved-item/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete item");

      setSavedItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("❌ Failed to remove item:", err);
    }
  };

  /* ========================= PLAY / PAUSE ========================= */
  const handlePlayPause = item => {
    if (playingId === item.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    if (audioRef.current) audioRef.current.pause();

    const audioUrl =
      item.type === "podcast"
        ? item.audio
        : `https://archive.org/download/${item.identifier}/sample.mp3`;

    audioRef.current = new Audio(audioUrl);
    audioRef.current
      .play()
      .then(() => setPlayingId(item.id))
      .catch(err => console.error("❌ Playback failed:", err));
  };

  /* ========================= FILTERING ========================= */
  const filteredItems = savedItems.filter(item => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  /* ========================= CARD GRADIENTS ========================= */
  const gradients = [
    "linear-gradient(135deg, #ffffff, #ffd6e7)",
    "linear-gradient(135deg, #ffffff, #e6c6ff)",
    "linear-gradient(135deg, #ffffff, #c6f2ff)",
    "linear-gradient(135deg, #ffd6e7, #e6c6ff)",
    "linear-gradient(135deg, #e6c6ff, #c6f2ff)",
  ];

  const getCardGradient = index => gradients[index % gradients.length];

  /* ========================= RENDER ========================= */
  return (
    <>
      <MyNavbar />
      <div className="saved-page-container">
        {/* HEADER */}
        <div className="saved-header">
          <h1 className="saved-title">Saved Items</h1>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              <FaFilter /> All ({savedItems.length})
            </button>
            <button
              className={`filter-btn ${filter === "podcast" ? "active" : ""}`}
              onClick={() => setFilter("podcast")}
            >
              <FaPlay /> Podcasts ({savedItems.filter(i => i.type === "podcast").length})
            </button>
            <button
              className={`filter-btn ${filter === "Saved_book" ? "active" : ""}`}
              onClick={() => setFilter("book")}
            >
              <FaBookmark /> Books ({savedItems.filter(i => i.type === "book").length})
            </button>
          </div>
        </div>

        {/* CONTENT */}
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📖🎧</div>
            <h3>No saved items yet</h3>
            <p>Save podcasts and audiobooks to see them here</p>
          </div>
        ) : (
          <div className="saved-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="saved-card"
                style={{ background: getCardGradient(index) }}
              >
                <div className="card-content">
                  <div className="item-image">
                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={item.title}
                    />
                    <div className={`item-type ${item.type}`}>
                      {item.type === "podcast" ? "🎙️" : "📚"}
                    </div>
                  </div>

                  <div className="item-info">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-description">
                      {item.description || "No description available"}
                    </p>
                    <div className="item-meta">
                      <span>{item.duration || "N/A"}</span>
                      <span className="item-type-label">{item.type.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="item-controls">
                    <button
                      className="control-btn play-btn"
                      onClick={() => handlePlayPause(item)}
                    >
                      {playingId === item.id ? <FaPause /> : <FaPlay />}
                    </button>
                    <button
                      className="control-btn remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "60%" }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SavedPage;
