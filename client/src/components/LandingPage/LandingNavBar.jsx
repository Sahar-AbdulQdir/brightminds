import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/icons/Logo.svg";

// Landing page navigation bar
function LandingNavbar() {
  const navRef = useRef();

  // Toggle responsive navigation
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      {/* Logo */}
      <h3>
        <img src={Logo} alt="Cognify Minds Logo" className="nav-logo" />
      </h3>

      {/* Navigation links */}
      <nav ref={navRef}>
        <a href="#Landing-about">About</a>
        <a href="#Landing-why-us">Why Us</a>
        <a href="#Landing-faq">FAQ</a>

        {/* Close button for mobile menu */}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>

      {/* Hamburger button for mobile menu */}
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default LandingNavbar;
