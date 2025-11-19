import React from "react";
import LandingNavbar from  "../components/LandingPage/LandingNavBar";
import HeroSec from "../components/LandingPage/HeroSec";
import WhyChooseUs from "../components/LandingPage/WhyChooseUs";
import ImpactSection from "../components/LandingPage/ImpactSection";
import ReviewsSection from "../components/LandingPage/Reviews";
import FaqSec from "../components/LandingPage/FaqSec";
import LandingFooter from "../components/LandingPage/LandingFooter";
import BHeroSection from "../components/BlogPage/Hero";
import { useEffect } from 'react';

const LandingPage = () => {
useEffect(() => {
  // Set background color
  document.body.style.backgroundColor = '#ffffffff'; // solid color or you can use gradient with backgroundImage

  // Remove root padding
  const root = document.getElementById('root');
  if (root) {
    root.style.padding = '0';
  }

  // Cleanup on unmount
  return () => {
    document.body.style.backgroundColor = '';
    if (root) {
      root.style.padding = ''; // reset padding
    }
  };
}, []);

  return (
    <div>
      <LandingNavbar />
      <HeroSec />
      <WhyChooseUs />
      <ImpactSection />
      <ReviewsSection />
      <FaqSec />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
