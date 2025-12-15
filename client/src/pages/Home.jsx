import React, { useEffect, useState } from "react"; 
import MyNavbar from "../components/Navbar.jsx";
import "../styles/home.css";
import podcastImg from "../assets/images/pod.jpeg";
import sudImg from "../assets/images/sud.png";
import puzzImg from "../assets/images/puzz.png";

const Home = () => {
  // useEffect(() => {
  //   document.body.style.backgroundImage =
  //     'linear-gradient(318deg, rgba(121, 130, 224, 1) 0%, rgba(158, 174, 218, 1) 50%, rgba(211, 147, 189, 1) 100%);';
  //   return () => {
  //     document.body.style.backgroundImage = '';
  //   };
  // }, []);

   const [userName, setUserName] = useState("User");
   useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <div className="navbar-section">
        <MyNavbar />
      </div>

      {/* Main Content */}
      <div className="content-section">
        {/* Left Section */}
        <div className="left-section">
          <div className="welcome-card">
            <h2>Hello, {userName}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="read-more-btn">Read More</button>
          </div>

          <div className="podcast-card">
            <div className="podcast-left">
              <img src={podcastImg} alt="Podcast" className="podcast-img" />
            </div>
            <div className="podcast-right">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </p>
              <button className="read-more-btn">Listen Now!</button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="video-card">
            <video className="video-bg" autoPlay loop muted playsInline>
              <source src="/Hvid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay bottom-left">
              <h2>Boost Your Focus</h2>
              <p>Discover how to stay productive and mindful every day.</p>
              <button className="video-btn">Explore Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
