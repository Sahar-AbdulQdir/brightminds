// // src/pages/Home.jsx
// import React from "react";
// import "../styles/home.css";

// const Home = () => {
//   return (
//     <div className="home-container">
//       {/* Left section */}
//       <div className="left-section">
//         <div className="welcome-card">
//           <h2>Hello, User</h2>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p>
//           <button className="read-more-btn">Read More</button>
//         </div>

//         <div className="podcast-card">
//           <div className="podcast-left">
//             <h3>Podcast Suggestion</h3>
//           </div>
//           <div className="podcast-right">
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor
//             </p>
//             <button className="read-more-btn">Listen Now!</button>
//           </div>
//         </div>
//       </div>

//       {/* Right section */}
//       <div className="right-section">
//         <div className="progress-cards">
//           <div className="progress-card">
//             <div className="img-placeholder"></div>
//             <h4>Game 1 Progress</h4>
//           </div>
//           <div className="progress-card">
//             <div className="img-placeholder"></div>
//             <h4>Game 2 Progress</h4>
//           </div>
//         </div>

//         <div className="continue-card">
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor
//           </p>
//           <div className="play-Btns">
//           <button className="play-btn ">Continue Playing</button>
//           <button className="play-btn">Continue Playing</button>
//           </div>
//           <div className="toggle-placeholder"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// src/pages/Home.jsx
import React from "react";
import MyNavbar from "../components/Navbar.jsx";
import "../styles/home.css";
import podcastImg from "../assets/pod.jpeg";
import sudImg from "../assets/sud.png";
import puzzImg from "../assets/puzz.png";
import { useEffect } from 'react';

const Home = () => {
// useEffect(() => {
//   document.body.style.backgroundImage = 
//     'linear-gradient(318deg, rgba(121, 130, 224, 1) 0%, rgba(158, 174, 218, 1) 50%, rgba(211, 147, 189, 1) 100%);';
//   return () => {
//     document.body.style.backgroundImage = '';
//   };
// }, []);

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <div className="navbar-section">
        <MyNavbar />
      </div>

      {/* Main Content */}
      <div className="content-section">
        {/* Left section */}
        <div className="left-section">
          <div className="welcome-card">
            <h2>Hello, User</h2>
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

        {/* Right section */}
{/* Right section */}
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
