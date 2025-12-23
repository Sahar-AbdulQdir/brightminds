import React from "react";
import "../../components/LandingPage/LandingPageStyles/Impact.css";
import I1 from "../../assets/images/impact1.png";
import I2 from "../../assets/images/impact2.png";
import I3 from "../../assets/images/impact3.png";
import I4 from "../../assets/images/impact4.png";
const impacts = [
  {
    img: I1,
    text: "Built for Different Minds.",
  },
  {
    img: I2,
    text: "Learn Faster.",
  },
  {
    img: I3,
    text: "Better Learning Outcomes.",
  },
  {
    img: I4,
    text: "Loved by Users.",
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
