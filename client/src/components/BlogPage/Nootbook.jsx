import React, { useState } from "react";
import "./BlogsPage/Notebook.css";
import { FaPlay, FaHeart } from "react-icons/fa";

const Notebook = ({ title, author, description, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Here you can integrate actual audio play/pause logic
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="notebook-card">
      <div className="notebook-header">
        <h2>{title}</h2>
        <span className="author">{author}</span>
      </div>
      <p className="description">{description}</p>
      <div className="notebook-footer">
        <button className={`play-btn ${isPlaying ? "playing" : ""}`} onClick={togglePlay}>
          <FaPlay />
          {isPlaying ? "Playing" : "Play"}
        </button>
        <button className={`like-btn ${liked ? "liked" : ""}`} onClick={toggleLike}>
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default Notebook;
