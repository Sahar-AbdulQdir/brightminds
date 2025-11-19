import React from "react";
import HeroPodImg from "../../assets/pod5.png";
import "../../styles/PodcastPageStyles/PodcastHero.css";

const PodcastHero = () => (
  <section className="podcast-hero">
    {/* Background halves */}
    <div className="bg-top"></div>
    <div className="bg-bottom"></div>

    {/* Content */}
    <div className="hero-content">
      {/* Navbar (optional, add here if needed) */}

      <div className="hero-inner">
        {/* Text */}
        <div className="Pod-hero-text">
          <h1>The Podcast Show</h1>
          <p>Dive into inspiring conversations, stories, and insights from top creators and thinkers.</p>
          <button>Listen Now</button>
        </div>

        {/* Image */}
        <div className="pod-hero-image">
          <img src={HeroPodImg} alt="Podcast Hero" />
        </div>
      </div>
    </div>
  </section>
);

export default PodcastHero;
