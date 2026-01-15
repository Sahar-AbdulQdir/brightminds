import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"; // Quote icons
import "./BlogsPage/QuoteCard.css"; // Styles for the quote card
import "../../styles/colors.css" // General colors

// Component for a single quote card
const QuoteCard = () => {
  return (
    <article className="article">
      <blockquote>
        {/* Left quote icon */}
        <FaQuoteLeft className="quote-icon left" />

        {/* Quote text */}
        <p>
          Reading is escape, and the opposite of escape; it's a way to make contact with reality after a day of making things up, and it's a way of making contact with someone else's imagination after a day that's all too real
        </p>

        {/* Right quote icon */}
        <FaQuoteRight className="quote-icon right" />

        {/* Author of the quote */}
        <cite>Nora Ephron</cite>
      </blockquote>
    </article>
  );
};

export default QuoteCard; // Export the quote card component
