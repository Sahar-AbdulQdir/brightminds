import React, { useEffect, useState } from "react"; 
import MyNavbar from "../components/Navbar.jsx";
import "../styles/home.css";
import podcastImg from "../assets/images/pod.jpeg";


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


    // Disable scroll when Home is mounted, enable scroll when unmounted
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden"; // disable scroll

    return () => {
      document.body.style.overflow = originalStyle; // restore scroll
    };
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
              This space is designed for dyslexic minds and different learners.
              You don’t have to force yourself to read the “normal” way, here,
               you choose what works best for you.

            </p>
            <p>
              Read, listen, adjust, and learn at your own pace, without pressure.
            </p>
            <button className="read-more-btn">Read More</button>
          </div>

          <div className="home-podcast-card">
            <div className="podcast-left">
              <img src={podcastImg} alt="Podcast" className="podcast-img" />
            </div>
            <div className="podcast-right">
              <p>
                Our podcasts are made for curious minds that learn better by listening.
Perfect for breaks, walks, or moments when reading just isn’t the mood.
              </p>
              <button className="read-more-btn">Listen Now!</button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="video-card">
            <video className="video-bg" autoPlay loop muted playsInline>
              <source src="/bg3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay-home bottom-left">
              <div>
                <h2>Boost Your Focus</h2>
              <p>Our audiobooks let you enjoy stories, learning, and ideas without struggling through text.
Just press play and focus on understanding</p>
              </div>
              <button className="video-btn">Browse Books</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
