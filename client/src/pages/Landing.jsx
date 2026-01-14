// Importing React hooks and all necessary components for the Landing Page
import React, { useState, useEffect } from "react";
import LandingNavbar from "../components/LandingPage/LandingNavBar";
import HeroSec from "../components/LandingPage/HeroSec";
import WhyChooseUs from "../components/LandingPage/WhyChooseUs";
import ImpactSection from "../components/LandingPage/ImpactSection";
import ReviewsSection from "../components/LandingPage/Reviews";
import FaqSec from "../components/LandingPage/FaqSec";
import LandingFooter from "../components/LandingPage/LandingFooter";
import About from "../components/LandingPage/AboutDys";
import Loader from "../components/GenerealFixes/Loader";

// LandingPage component definition
const LandingPage = () => {
  // State to manage the loading overlay
  const [loading, setLoading] = useState(true);

  // useEffect to simulate a 2-second loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // useEffect to set page background color and root padding on mount and cleanup on unmount
  useEffect(() => {
    document.body.style.backgroundColor = "#ffffffff"; // solid white background
    const root = document.getElementById("root");
    if (root) root.style.padding = "0";

    return () => {
      document.body.style.backgroundColor = "";
      if (root) root.style.padding = "";
    };
  }, []);

  // Render loader if still loading
  if (loading) {
    return <Loader />;
  }

  // JSX rendering for the Landing Page
  return (
    <>
      <LandingNavbar />
      <section>
        <HeroSec />
      </section>
      <section id="Landing-about">
        <About />
      </section>
      <section id="Landing-why-us">
        <WhyChooseUs />
      </section>
      <section>
        <ImpactSection />
      </section>
      <section>
        <ReviewsSection />
      </section>
      <section id="Landing-faq">
        <FaqSec />
      </section>
      <LandingFooter />
    </>
  );
};

// Export the LandingPage component
export default LandingPage;
