import React from "react";
import sugPodImg from "../../assets/Pod2.png";
import "../../styles/PodcastPageStyles/PodSuggestion.css";


const Suggestion = () => (
  <section className="suggestion-section">
    <h2>Our Suggestion, Hem Podcast</h2>
    <p>Our Suggestion, Hem Podcast</p>
    <div className="suggestion-content">
      <div className="suggestion-card">
        <div className="card-text">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <hr />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <hr />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <hr />
        </div>
      </div>
      <img src={sugPodImg} alt="Podcast suggestion" className="suggestion-img" />
    </div>
  </section>
);

export default Suggestion;

