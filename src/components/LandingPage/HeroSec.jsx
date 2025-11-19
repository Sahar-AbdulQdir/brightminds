import React from "react";
import HeroImg from "../../assets/Hero.png";
import "../../styles/LandingPageStyles/Hero.css";

const HeroSec = () => {
  return (
    <section className="hero-section">
      <div className="Hero">
        <h1>WELCOME TO BRAINBOOST</h1>
        <p>Challenge your mind. Learn smarter. Play daily.</p>
        <div className="hero-buttons">
          <button className="login-btn">Log in</button>
          <button className="signin-btn">Sign in</button>
        </div>
        <div className="hero-image">
          <img src={HeroImg} alt="BrainBoost Hero" />
        </div>
      </div>
    </section>
  );
};

export default HeroSec;
