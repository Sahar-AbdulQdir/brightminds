// Importing React and all necessary components and styles for the Podcast Page
import React from "react";
import MyNavbar from "../components/Navbar.jsx";
import PodcastHero from "../components/PodcastPage/PodcastHero.jsx";
import PodcastGrid from "../components/PodcastPage/PodcastGrid";
import PodcastHighlights from "../components/PodcastPage/PodcastHighlights.jsx";
import Suggestion from "../components/PodcastPage/Suggestion";
import "../components/PodcastPage/PodcastPageStyles/PodcastPage.css";
import ScrollVelocity from '../components/PodcastPage/marquee.jsx';

// PodcastPage component definition
const PodcastPage = () => {
  return (
    <div className="podcast-page">
      <div className="podcast-foreground">
        <MyNavbar />
        <PodcastHero />
        <ScrollVelocity
          texts={[
            "The huberman lab ᖰ  ᖳ",
            "Ali abdaal ၊၊||၊'",
          ]}
          velocity={110}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
          scrollerStyle={{ gap: '8rem' }}
        />
        <PodcastGrid />
        <PodcastHighlights />
        <Suggestion />
        <footer className="text-center text-sm text-gray-600">
          © Sahaxar — All rights reserved
        </footer>
      </div>
    </div>
  );
};

// Export the PodcastPage component
export default PodcastPage;
