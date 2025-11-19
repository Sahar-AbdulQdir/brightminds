import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import "../../styles/main.css";

function LandingNavbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <h3>LOGO</h3>

      <nav ref={navRef}>
        <Link to="/home">Explore</Link>
        <Link to="/blog">FAQ</Link>
        <Link to="/games">Impact</Link>

        {/* Close button for mobile */}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>

      

      {/* Hamburger button */}
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default LandingNavbar;
 