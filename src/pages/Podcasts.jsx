import React from "react";
import MyNavbar from "../components/Navbar.jsx";
import PodcastHero from "../components/PodcastPage/PodcastHero.jsx";
import PodcastGrid from "../components/PodcastPage/PodcastGrid";
import SearchBar from "../components/PodcastPage/SearchBar";
import LastViewed from "../components/PodcastPage/LastViewed";
import Suggestion from "../components/PodcastPage/Suggestion";
import "../styles//PodcastPageStyles/PodcastPage.css";
import ScrollVelocity from '../components/PodcastPage/marquee.jsx';
  

const PodcastPage = () => {
  return (
    <div className="podcast-page">
      {/* Foreground blurred white layer */}
      <div className="podcast-foreground">
        {/* Navbar inside the blur container */}
        <MyNavbar />

        {/* Page content */}
        <PodcastHero />
<ScrollVelocity
  texts={[
    'Mind Matters ᖰ  ᖳ',
    'NeuroNotes ၊၊||၊',
  ]}
  velocity={110}
  className="text-4xl md:text-6xl font-extrabold tracking-tight"
  scrollerStyle={{ gap: '8rem' }} // bigger spacing
/>




        <PodcastGrid />
        {/* <SearchBar /> */}
        <LastViewed />
        <Suggestion />

        {/* Footer */}
        <footer className="text-center text-sm text-gray-600">
          © Sahaxar — All rights reserved
        </footer>
      </div>
    </div>
  );
};

export default PodcastPage;
