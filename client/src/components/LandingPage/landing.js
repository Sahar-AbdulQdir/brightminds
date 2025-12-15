import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

import LandingNavbar from "../components/LandingPage/LandingNavBar";
import HeroSec from "../components/LandingPage/HeroSec";
import WhyChooseUs from "../components/LandingPage/WhyChooseUs";
import ImpactSection from "../components/LandingPage/ImpactSection";
import ReviewsSection from "../components/LandingPage/Reviews";
import FaqSec from "../components/LandingPage/FaqSec";
import LandingFooter from "../components/LandingPage/LandingFooter";

const LandingPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#ffffffff';
    const root = document.getElementById('root');
    if (root) root.style.padding = '0';

    // Initialize AOS
    AOS.init({ duration: 1000, once: true });

    return () => {
      document.body.style.backgroundColor = '';
      if (root) root.style.padding = '';
    };
  }, []);

  return (
    <div>
      <LandingNavbar />
      <HeroSec />
      <WhyChooseUs data-aos="fade-up" />
      <ImpactSection data-aos="fade-up" />
      <ReviewsSection data-aos="fade-up" />
      <FaqSec data-aos="fade-up" />
      <LandingFooter data-aos="fade-up" />
    </div>
  );
};

export default LandingPage;
