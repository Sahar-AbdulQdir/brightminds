import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import "../../styles/main.css";
import Logo from "../../assets/icons/Logo.svg";

function LandingNavbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>

              <h3>
                <img src={Logo} alt="Cognify Minds Logo" className="nav-logo" />
              </h3>

<nav ref={navRef}>

  <a href="#Landing-about">About</a>
  <a href="#Landing-why-us">Why Us</a>
  <a href="#Landing-faq">FAQ</a>

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
 