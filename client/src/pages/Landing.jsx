import React, { useEffect } from "react";
import LandingNavbar from "../components/LandingPage/LandingNavBar";
import HeroSec from "../components/LandingPage/HeroSec";
import WhyChooseUs from "../components/LandingPage/WhyChooseUs";
import ImpactSection from "../components/LandingPage/ImpactSection";
import ReviewsSection from "../components/LandingPage/Reviews";
import FaqSec from "../components/LandingPage/FaqSec";
import LandingFooter from "../components/LandingPage/LandingFooter";
import About from "../components/LandingPage/AboutDys";

const LandingPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#ffffffff"; // solid color

    const root = document.getElementById("root");
    if (root) root.style.padding = "0";

    return () => {
      document.body.style.backgroundColor = "";
      if (root) root.style.padding = "";
    };
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default LandingPage;
