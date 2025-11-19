import React from "react";
import "../../styles/LandingPageStyles/Impact.css";
import Ch1 from "../../assets/L-Ch1.png";
import Ch2 from "../../assets/L-Ch2.png";
const impacts = [
  {
    img: Ch1,
    text: "Serve Diverse Learners: 88% of users enhance focus and memory.",
  },
  {
    img: Ch2,
    text: "Save Time: 94% of learners report faster progress.",
  },
  {
    img: Ch1,
    text: "Drive Results: 28% improvement in academic performance.",
  },
  {
    img: Ch2,
    text: "Share the Love: 95% recommend BrainBoost to friends.",
  },
];

const ImpactSection = () => {
  return (
    <section className="impact-section">
      <h2>Our Impact</h2>
      <div className="impact-grid">
        {impacts.map((item, index) => (
          <div key={index} className="impact-card">
            <img src={item.img} alt="impact" />
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;
