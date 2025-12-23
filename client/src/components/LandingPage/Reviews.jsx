import React from "react";
import "./LandingPageStyles/Reviews.css";

const reviews = [
  {
    name: "FF1",
    text: "Honestly guys, coming from a year 11 student, I use this all the time. Recommend it to all my friends, it's so amazing!",
    likes: 993,
  },
  {
    name: "Cheese",
    text: "GIZMO IS THE BEST! Get it if you need straight A’s. OMG I LOVE YOU GIZMO 😭💛💫",
    likes: 828,
  },
  {
    name: "Alexander",
    text: "I’m annoyed I didn’t discover this sooner... Used it for my AP Bio exam and it made studying so easy!",
    likes: 554,
  },
  {
    name: "Sabrina524",
    text: "This app got me an A+ in microbiology! 💗✨",
    likes: 144,
  },
  {
    name: "Norachai",
    text: "Gizmo is the life force behind my grades!",
    likes: 312,
  },
  {
    name: "Penny",
    text: "This app honestly saved my life during finals 😭📚",
    likes: 402,
  },
  {
    name: "ASF :O",
    text: "I have a history app and it made me so much more prepared!",
    likes: 95,
  },
  {
    name: "Luna",
    text: "The only study app I actually enjoy using. Highly recommend ⭐",
    likes: 221,
  },
  {
    name: "Nova",
    text: "Such a well-designed app! It keeps me consistent and motivated every day 💪📖",
    likes: 507,
  },
];

const ReviewsSection = () => {
  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <h2 className="reviews-title">What Our Users Say</h2>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`review-card ${
                Math.floor(index / 3) % 2 === 1 ? "offset-card" : ""
              }`}
            >
              <div className="review-header">
                <h3 className="review-name">{review.name}</h3>
                <div className="review-likes">
                  ❤️ <span>{review.likes}</span>
                </div>
              </div>

              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
