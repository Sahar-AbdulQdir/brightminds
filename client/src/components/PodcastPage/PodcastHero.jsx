import React from "react";
import HeroPodImg from "../../assets/images/HeroImgPod.png";
import "../../components/PodcastPage/PodcastPageStyles/PodcastHero.css";
import "../../styles/colors.css"

// Hero section component for the podcast page
const PodcastHero = () => (
  <section className="podcast-hero">
    {/* Background decorative elements (top and bottom halves) */}
    <div className="bg-top"></div>
    <div className="bg-bottom"></div>

    {/* Main content container */}
    <div className="hero-content">
      {/* Inner wrapper for text and image */}
      <div className="hero-inner">
        {/* Text section */}
        <div className="Pod-hero-text">
          <h1>The Podcast<span className="TxtEffect">´ˎ˗</span> Show</h1>
          <p>Dive into inspiring conversations, stories, and insights from top creators and thinkers.</p>
          <button>Listen Now</button> {/* Call-to-action button */}
        </div>

        {/* Hero image section */}
        <div className="pod-hero-image">
          <img src={HeroPodImg} alt="Podcast Hero" /> {/* Hero image */}
        </div>
      </div>
    </div>
  </section>
);

export default PodcastHero;
