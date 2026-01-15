import React from "react";
import "./LandingPageStyles/AboutDys.css";
import bookimg from "../../assets/images/dys.png";
import bookimg2 from "../../assets/images/dys2.png";
import drRudolf from "../../assets/images/drImg.jpg";

// About Dyslexia Section Component
const About = () => {
  return (
    <div className="scene">
      
      {/* Left Side Book with layered pages and info */}
      <div className="book-wrap">
        <div className="left-side">
          <div className="book-cover-left"></div>
          <div className="layer1"><div className="page-left"></div></div>
          <div className="layer2"><div className="page-left"></div></div>
          <div className="layer3"><div className="page-left"></div></div>
          <div className="layer4"><div className="page-left"></div></div>

          {/* Text layers with info about dyslexia */}
          <div className="layer-text">
            <div className="page-left-2">
              <div className="page-text w-richtext">
                <h3><strong>Do you know?</strong></h3>
                <p>
                  Dyslexia is <strong>not a disease</strong> — it’s just a different way your brain processes words and letters. 
                  Some parts work a little differently, which can make reading tricky.
                  <br /> 
                  <br /> 
                </p>

                {/* Image of Dr. Rudolf Berlin */}
                <span className="dr-img-wrapper">
                  <img src={drRudolf} alt="Dr. Rudolf" className="small-rotated-img" />
                </span> 
                <p className="dr-rudolf">
                  It was first studied in the late 1800s by <span className="dr_name">Dr. Rudolf Berlin</span>, 
                  who noticed some bright and curious children struggled with reading.
                </p>

                <p>Remember: having dyslexia doesn’t mean you’re not smart. In fact, it comes with some pretty amazing skills!</p>
                <p>About 7% of people worldwide have dyslexia — so you’re definitely not alone! Your brain is wired in a unique and powerful way.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center book spine */}
        <div className="center"></div>

        {/* Right Side Book with superpowers info */}
        <div className="right-side">
          <div className="book-cover-right"></div>
          <div className="layer1"><div className="page-right"></div></div>
          <div className="layer2 right"><div className="page-right"></div></div>
          <div className="layer3 right"><div className="page-right"></div></div>
          <div className="layer4 right"><div className="page-right"></div></div>

          {/* Text layers with dyslexic superpowers */}
          <div className="layer-text right">
            <div className="page-right-2">
              <div className="page-text w-richtext">
                <h4><strong>Dyslexic Superpowers</strong></h4>
                <p>
                  Dyslexic people often shine in ways that others might not notice right away. Some of their strengths include:
                </p>
                <ul>
                  <li>Good problem solvers</li>
                  <li>Creative thinkers</li>
                  <li>Observant</li>
                  <li>High levels of empathy</li>
                  <li>Excellent big-picture thinkers</li>
                  <li>Good at making connections</li>
                  <li>Strong narrative reasoning</li>
                  <li>Three-dimensional thinking</li>
                </ul>

                {/* Book illustration image */}
                <div className="book-img-wrap">
                  <img src={bookimg2} className="bookimg styled-book secondary" alt="Brain pathways" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dyslexia Note Section */}
      <div className="dyslexia-note">
        <h2>About Dyslexia website</h2>
        <p>
          Dyslexia is <strong>not a disease</strong>. It simply means the brain processes words differently.
          Our platform is designed with accessibility tools, allowing you to adjust <strong>font size</strong> and <strong>line height</strong> for easier reading.
        </p>
        <p>
          Enjoy <strong>audio books</strong> and <strong>podcasts</strong>, save your favorites, and use tools for text-to-speech and speech-to-text to enhance your learning experience.
        </p>
      </div>
    </div>
  );
};

export default About;
