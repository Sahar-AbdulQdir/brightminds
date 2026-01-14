import React from "react";
import HeroImg from "../../assets/images/landingHero.png";
import "../../components/LandingPage/LandingPageStyles/Hero.css";
import { useNavigate } from "react-router-dom";

// Hero Section Component
const HeroSec = () => {
  const navigate = useNavigate(); 

  return (
    <section className="hero-section">
      <div className="Hero">
        {/* Hero title and subtitle */}
        <h1>Welcome to Lexia Minds</h1>
        <p>Read, listen, and explore at your own pace.</p>

        {/* Hero buttons for navigation */}
        <div className="hero-buttons">
          <button
            className="login-btn"
            onClick={() => navigate("/auth?form=signUp")}
          >
            Log in
          </button>
          <button
            className="signin-btn"
            onClick={() => navigate("/auth?form=signIn")}
          >
            Sign up
          </button>
        </div>

        {/* Hero image */}
        <div className="hero-image">
          <img src={HeroImg} alt="BrainBoost Hero" />
        </div>
      </div>
    </section>
  );
};

export default HeroSec;
