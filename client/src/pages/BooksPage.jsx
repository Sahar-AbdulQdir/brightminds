// Importing React, hooks, CSS files, and components needed for the Bloggy page
import React from "react";
import BHeroSection from "../components/BlogPage/Hero.jsx";
import "../components/BlogPage/BlogsPage/blogs.css";
import MyNavbar from "../components/Navbar.jsx";
import Books from "../components/BlogPage/Books.jsx";
import BooksSlider from "../components/BlogPage/BooksSlider.jsx";
import QuoteCard from "../components/BlogPage/QuoteCard.jsx";
import { useEffect } from 'react';
import "../styles/colors.css"

// Bloggy page component definition
const Bloggy = () => {
  return (
    <div className="blogs-container">
      {/* Navigation Bar section */}
      <div className="navbar-section">
        <MyNavbar />
      </div>
    
      {/* Main content section of the blog page */}
      <div className="blogs-content-section">
        {/* Hero section at the top of the page */}
        <BHeroSection/>
        {/* Quote card section */}
        <QuoteCard/>
        {/* Books section */}
        <Books/>
        {/* Slider for books */}
        <BooksSlider/>
      </div>
   </div>
  );
};

// Export the Bloggy page component for routing or usage elsewhere
export default Bloggy;
