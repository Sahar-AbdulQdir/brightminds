import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaBookmark, FaTrash, FaFilter } from "react-icons/fa";
import MyNavbar from "../Navbar.jsx";
import "../../styles/saved_db.css";
import { FaBook } from "react-icons/fa";
import { HiMicrophone } from "react-icons/hi2";
import "../../styles/colors.css"

// Base URL for API requests
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SavedPage = () => {
  // State for saved items, filter type, and currently playing audio
  const [savedItems, setSavedItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  // Fetch saved items from the server
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
          id: item._id, // Use MongoDB _id
        }))
      );
    } catch (err) {
      console.error(" Failed to fetch saved items:", err);
    }
  };

  // Load saved items on component mount
  useEffect(() => {
    fetchSavedItems();
  }, []);

  // Remove a saved item by ID
  const removeItem = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/saved-item/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete item");

      setSavedItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // Play or pause the selected audio item
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
      .catch(err => console.error("Playback failed:", err));
  };

  // Filter saved items based on selected type
  const filteredItems = savedItems.filter(item => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  // Gradient backgrounds for cards
  const gradients = [
    "linear-gradient(135deg, #ffffff, #ffd6e7)",
    "linear-gradient(135deg, #ffffff, #e6c6ff)",
    "linear-gradient(135deg, #ffffff, #c6f2ff)",
    "linear-gradient(135deg, #ffd6e7, #e6c6ff)",
    "linear-gradient(135deg, #e6c6ff, #c6f2ff)",
  ];
  const getCardGradient = index => gradients[index % gradients.length];

  // Render page
  return (
    <>
      {/* Navbar */}
      <MyNavbar />

      <div className="saved-page-container">
        {/* Header with filter buttons */}
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

        {/* Empty state */}
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📖🎧</div>
            <h3>No saved items yet</h3>
            <p>Save podcasts and audiobooks to see them here</p>
          </div>
        ) : (
          /* Grid of saved items */
          <div className="saved-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="saved-card"
                style={{ background: getCardGradient(index) }}
              >
                <div className="card-content">
                  {/* Item image and type */}
                  <div className="item-image">
                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={item.title}
                    />
                    <div className={`item-type ${item.type}`}>
                      {item.type === "podcast" ? <HiMicrophone /> : <FaBook />}
                    </div>
                  </div>

                  {/* Item information */}
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

                  {/* Play and remove buttons */}
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

                {/* Progress bar */}
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
