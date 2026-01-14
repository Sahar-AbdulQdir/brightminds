import React from "react";
import "./LandingPageStyles/Reviews.css";

// Sample user reviews data
const reviews = [
  {
    name: "EmilyD",
    text: "This website has changed the way I read online! I love adjusting the font and spacing—it makes everything so clear.",
    likes: 1023,
  },
  {
    name: "Max_88",
    text: "Text-to-speech is a game-changer. Listening to articles and podcasts really helps me absorb information faster!",
    likes: 876,
  },
  {
    name: "SophieL",
    text: "I never realized reading could be this easy. The hover-to-read feature and audio books make studying stress-free.",
    likes: 654,
  },
  {
    name: "DanielK",
    text: "Speech-to-text lets me write essays without struggling with spelling. Such an amazing tool for anyone with dyslexia!",
    likes: 432,
  },
  {
    name: "LaraM",
    text: "I can finally customize line spacing and letter spacing to suit my reading style. It feels tailored just for me!",
    likes: 519,
  },
  {
    name: "Nico",
    text: "Podcasts on the site are perfect for learning on the go. The combination of audio and visual elements really works!",
    likes: 401,
  },
  {
    name: "AishaR",
    text: "The website is super accessible. It makes reading articles and books enjoyable instead of stressful.",
    likes: 298,
  },
  {
    name: "TheoP",
    text: "I actually look forward to reading now! All the customization options make a huge difference for dyslexic readers.",
    likes: 357,
  },
  {
    name: "ClaraJ",
    text: "Highly recommend this site! The audio books, text-to-speech, and hover-to-read features make learning so much easier.",
    likes: 482,
  },
];

// Reviews Section Component
const ReviewsSection = () => {
  return (
    <section className="reviews-section">
      <div className="reviews-container">
        {/* Section title */}
        <h2 className="reviews-title">What Our Users Say</h2>

        {/* Grid of review cards */}
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`review-card ${
                Math.floor(index / 3) % 2 === 1 ? "offset-card" : ""
              }`}
            >
              {/* Review header with name and likes */}
              <div className="review-header">
                <h3 className="review-name">{review.name}</h3>
                <div className="review-likes">
                  ❤️ <span>{review.likes}</span>
                </div>
              </div>

              {/* Review text */}
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
