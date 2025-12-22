import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./BlogsPage/QuoteCard.css";

const QuoteCard = () => {
  return (
    <article className="article">
      <blockquote>
        <FaQuoteLeft className="quote-icon left" />
        <p>
          Reading is escape, and the opposite of escape; it's a way to make contact with reality after a day of making things up, and it's a way of making contact with someone else's imagination after a day that's all too real
        </p>
        <FaQuoteRight className="quote-icon right" />
        <cite>Nora Ephron</cite>
      </blockquote>
    </article>
  );
};

export default QuoteCard;
