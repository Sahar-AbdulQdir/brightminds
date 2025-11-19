import React from "react";
import "../../styles/LandingPageStyles/WhyChooseUs.css";

// Images
import PuzzleImg from "../../assets/L-Puzz.png";
import BlogsImg from "../../assets/L-blog.png";
import PodcastsImg from "../../assets/L-pod.png";
import SaveImg from "../../assets/L-interact.png";

const features = [
  {
    title: "Daily Mind Puzzles",
    text: "Sharpen your brain with new challenges every day.",
    gradient: "blue-gradient",
    img: PuzzleImg,
  },
  {
    title: "Educational Articles",
    text: "Learn smarter with curated content and insights.",
    gradient: "purple-gradient",
    img: BlogsImg,
  },
  {
    title: "Podcasts & Videos",
    text: "Engage with visual and auditory learning tools.",
    gradient: "yellow-gradient",
    img: PodcastsImg,
  },
  {
    title: "Progress Tracking",
    text: "Monitor your journey and celebrate your wins.",
    gradient: "green-gradient",
    img: SaveImg,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <div className="features-grid">
        {features.map((item, index) => (
          <div
            key={index}
            className={`feature-card ${item.gradient} ${
              index % 2 === 1 ? "reverse" : ""
            }`}
          >
            <div className="feature-text">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <div className="feature-image">
              <img src={item.img} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
