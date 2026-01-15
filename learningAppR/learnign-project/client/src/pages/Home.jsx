// Importing React, hooks, CSS, assets, and navigation tools for the Home page
import React, { useEffect, useState } from "react"; 
import MyNavbar from "../components/Navbar.jsx";
import "../styles/home.css";
import podcastImg from "../assets/images/pod.jpeg";
import { useNavigate } from "react-router-dom"; 

// Home page component definition
const Home = () => {
  // State to store user's name, defaults to "User"
  const [userName, setUserName] = useState("User");

  // useEffect to retrieve stored username from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate(); 

  // JSX rendering for the Home page
  return (
    <div className="home-container">
      {/* Navigation Bar section */}
      <div className="navbar-section">
        <MyNavbar />
      </div>

      {/* Main content section */}
      <div className="content-section">
        {/* Left side section containing welcome card and podcast card */}
        <div className="left-section">
          {/* Welcome card with greeting, description, and button */}
          <div className="welcome-card">
            <h2>Hello, {userName}</h2>
            <p>
              This space is designed for dyslexic minds and different learners.
              You don’t have to force yourself to read the “normal” way, here,
              you choose what works best for you.
            </p>
            <p>
              Read, listen, adjust, and learn at your own pace, without pressure.
            </p>
            <button className="read-more-btn" onClick={() => navigate("/AudioBooks")}>
              Read More
            </button>
          </div>

          {/* Podcast card with image, description, and button */}
          <div className="home-podcast-card">
            <div className="podcast-left">
              <img src={podcastImg} alt="Podcast" className="podcast-img" />
            </div>
            <div className="podcast-right">
              <p>
                Our podcasts are made for curious minds that learn better by listening.
                Perfect for breaks, walks, or moments when reading just isn’t the mood.
              </p>
              <button className="read-more-btn" onClick={() => navigate("/Podcasts")}>
                Listen Now!
              </button>
            </div>
          </div>
        </div>

        {/* Right side section containing background video and overlay content */}
        <div className="right-section">
          <div className="video-card">
            {/* Background video element */}
            <video className="video-bg" autoPlay loop muted playsInline>
              <source src="/bg3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay content on top of video */}
            <div className="video-overlay-home bottom-left">
              <div>
                <h2>Boost Your Focus</h2>
                <p>
                  Our audiobooks let you enjoy stories, learning, and ideas without struggling through text.
                  Just press play and focus on understanding
                </p>
              </div>
              <button className="video-btn" onClick={() => navigate("/AudioBooks")}>Browse Books</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Home page component
export default Home;
