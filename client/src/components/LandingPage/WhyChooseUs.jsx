import React from "react";
import "../../components/LandingPage/LandingPageStyles/WhyChooseUs.css";

// Images
import Landing1 from "../../assets/images/landing1.png";
import Landing2 from "../../assets/images/landing2.png";
import Landing3 from "../../assets/images/landing3.png";
import Landing4 from "../../assets/images/landing4.png";
import Landing5 from "../../assets/images/landing5.png";

// Features data
const features = [
  {
    title: "Design and Accessibility Settings",
    text: "Change the font style. Adjust line height and spacing. Choose what feels easiest for your eyes.",
    gradient: "green-gradient",
    img: Landing1,
  },
  {
    title: "Audiobooks",
    text: "Listen to books instead of reading. Pause, replay, and choose your own pace.",
    gradient: "blue-gradient",
    img: Landing2,
  },
  {
    title: "Podcasts",
    text: "Interesting and clear audio content. Easy to follow and less tiring.",
    gradient: "purple-gradient",
    img: Landing3,
  },
  {
    title: "Save Your Favourites",
    text: "Save books, podcasts, or tools you like.Come back to them anytime..",
    gradient: "yellow-gradient",
    img: Landing4,
  },
  {
    title: "Reading and Listening Tools",
    text: "Turn text into speech.Turn speech into text.Use the tools in a way that feels comfortable.",
    gradient: "green-gradient",
    img: Landing5,
  }
];

// WhyChooseUs Section Component
const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      {/* Section title */}
      <h2>Why this website helps?</h2>

      {/* Grid of feature cards */}
      <div className="features-grid">
        {features.map((item, index) => (
          <div
            key={index}
            className={`feature-card ${item.gradient} ${
              index % 2 === 1 ? "reverse" : ""
            }`}
          >
            {/* Feature text */}
            <div className="feature-text">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>

            {/* Feature image */}
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
