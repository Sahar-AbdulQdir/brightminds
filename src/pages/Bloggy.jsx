import React from "react";
import BHeroSection from "../components/BlogPage/Hero.jsx";
import "../styles/blogs.css";
import MyNavbar from "../components/Navbar.jsx";
import Topics from "../components/BlogPage/topics.jsx";
import Articles from "../components/BlogPage/articles.jsx";
import Books from "../components/BlogPage/Books.jsx";
import { useEffect } from 'react';

const Bloggy = () => {
// useEffect(() => {
//   document.body.style.backgroundImage = 
//     'linear-gradient(318deg, rgba(121, 130, 224, 1) 0%, rgba(158, 174, 218, 1) 50%, rgba(211, 147, 189, 1) 100%);';
//   return () => {
//     document.body.style.backgroundImage = '';
//   };
// }, []);

  return (
    <div className="blogs-container">
      {/* Navigation Bar */}
      <div className="navbar-section">
        <MyNavbar />
      </div>

      {/* Main Content */}
      <div className="blogs-content-section">
        <BHeroSection/>
        <Topics/>
        <Articles/>
        <Books/>

{/* 
        <iframe
  src="https://scratch.mit.edu/projects/123456789/embed"
  allowtransparency="true"
  width="100%"
  height="600"
  frameBorder="0"
  scrolling="no"
></iframe> */}


      </div>
   </div>
  );
};

export default Bloggy;
