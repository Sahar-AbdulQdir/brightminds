import React from "react";
import HeroImg from "../../assets/images/Hero.png";
import "../../components/LandingPage/LandingPageStyles/Hero.css";
import { useNavigate } from "react-router-dom"; // ✅ import

const HeroSec = () => {
  const navigate = useNavigate(); // ✅ initialize

  return (
    <section className="hero-section">
      <div className="Hero">
        <h1>WELCOME TO BRAINBOOST</h1>
        <p>Challenge your mind. Learn smarter. Play daily.</p>
        <div className="hero-buttons">
          <button
            className="login-btn"
            onClick={() => navigate("/auth?form=signIn")}
          >
            Log in
          </button>
          <button
            className="signin-btn"
            onClick={() => navigate("/auth?form=signUp")}
          >
            Sign up
          </button>
        </div>
        <div className="hero-image">
          <img src={HeroImg} alt="BrainBoost Hero" />
        </div>
      </div>
    </section>
  );
};

export default HeroSec;
