import React, { useEffect, useState, useRef } from "react";
import { FaStar } from "react-icons/fa";
import "./BlogsPage/BooksSlider.css";
import book1 from "../../assets/images/Book1.png"
import book2 from "../../assets/images/Book2.png"
import book3 from "../../assets/images/Book3.png"
import book4 from "../../assets/images/Book4.png"
import book5 from "../../assets/images/Book5.png"
import book6 from "../../assets/images/Book6.png"

const COLORS = [
  "#83DEE7ff",
  "#CDA9E5ff",
  "#F1CFE6ff",
  "#C1AAE6ff",
  "#EDD2EDff",
  "#A6E3E9ff",
];

const BOOKS = [
  {
    id: "transitofvenus",
    title: "The Transit of Venus",
    author: "Shirley Hazzard",
    cover: book1,
    subject: "A beautiful novel about love, loss, and the transit of Venus.",
  },
  {
    id: "houroftheStar",
    title: "The Hour of the Star",
    author: "Clarice Lispector",
    cover: book2,
    subject: "A moving story of a young girl's life in Brazil.",
  },
  {
    id: "forgottensmile",
    title: "The Forgotten Smile",
    author: "Unknown Author",
    cover: book3,
    subject: "A collection of short stories with unforgettable moments.",
  },
  {
    id: "invisibleman",
    title: "The Invisible Man",
    author: "H.G. Wells",
    cover: book4,
    subject: "A classic sci-fi novel about invisibility and isolation.",
  },
  {
    id: "regattamystery",
    title: "The Regatta Mystery and Other Stories",
    author: "Agatha Christie",
    cover: book5,
    subject: "Mystery short stories featuring brilliant detective work.",
  },
  {
    id: "amancalledove",
    title: "A Man Called Ove",
    author: "Fredrik Backman",
    cover: book6,
    subject: "A heartwarming story about a curmudgeon and unexpected friendship.",
  },
];

const BooksSlider = () => {
  const [books, setBooks] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    // Assign colors and random ratings
    const mappedBooks = BOOKS.map((book, index) => ({
      ...book,
      rating: Math.floor(Math.random() * 5) + 1,
      bgColor: COLORS[index % COLORS.length],
    }));
    setBooks(mappedBooks);
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: 520,
          behavior: "smooth",
        });

        if (
          sliderRef.current.scrollLeft + sliderRef.current.offsetWidth >=
          sliderRef.current.scrollWidth
        ) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction) => {
    sliderRef.current.scrollBy({
      left: direction === "left" ? -520 : 520,
      behavior: "smooth",
    });
  };

  return (
    <div className="books-slider-container">
      <h1 className="section-title">Popular Books</h1>
      <button className="arrow left" onClick={() => scroll("left")}>
        &#8249;
      </button>

      <div className="books-slider" ref={sliderRef}>
        {books.map((book) => (
          <div
            key={book.id}
            className="book-card"
            style={{ backgroundColor: book.bgColor }}
          >
            <img src={book.cover} alt={book.title} className="book-cover" />

            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>

              <div className="book-rating">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < book.rating ? "#ffffff" : "#ffffff40"}
                    />
                  ))}
              </div>

              <p className="book-description">{book.subject}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="arrow right" onClick={() => scroll("right")}>
        &#8250;
      </button>
    </div>
  );
};

export default BooksSlider;
