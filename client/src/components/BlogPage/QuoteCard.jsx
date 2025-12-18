import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./BlogsPage/QuoteCard.css";

const QuoteCard = () => {
  return (
    <article className="article">
      <blockquote>
        <FaQuoteLeft className="quote-icon left" />
        <p>
          Now I see the secret of making the best person: it is to grow in
          the open air and to eat and sleep with the earth.it is to grow in
          the open air and to eat and sleep with the earth.
        </p>
        <FaQuoteRight className="quote-icon right" />
        <cite>Walt Whitman</cite>
      </blockquote>
    </article>
  );
};

export default QuoteCard;
