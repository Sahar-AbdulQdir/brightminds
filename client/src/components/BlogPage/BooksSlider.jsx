import React, { useEffect, useState, useRef } from "react";
import { FaStar } from "react-icons/fa"; // Star icon for ratings
import "./BlogsPage/BooksSlider.css"; // Styles for the slider
import book1 from "../../assets/images/Book1.png" // Import book images
import book2 from "../../assets/images/Book2.png"
import book3 from "../../assets/images/Book3.png"
import book4 from "../../assets/images/Book4.png"
import book5 from "../../assets/images/Book5.png"
import book6 from "../../assets/images/Book6.png"
import "../../styles/colors.css" // General colors for the site

// Array of background colors for book cards
const COLORS = [
  "#83DEE7ff",
  "#CDA9E5ff",
  "#F1CFE6ff",
  "#C1AAE6ff",
  "#EDD2EDff",
  "#A6E3E9ff",
];

// Array of book data
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
  const [books, setBooks] = useState([]); // State to hold books with colors & ratings
  const sliderRef = useRef(null); // Ref to access slider div for scrolling

  useEffect(() => {
    // Assign a random rating and a background color to each book
    const mappedBooks = BOOKS.map((book, index) => ({
      ...book,
      rating: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
      bgColor: COLORS[index % COLORS.length], // Cycle through COLORS array
    }));
    setBooks(mappedBooks); // Update state with new data
  }, []);

  // Auto-scroll the slider every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: 520, // Scroll horizontally by 520px
          behavior: "smooth", // Smooth animation
        });

        // If at the end, scroll back to start
        if (
          sliderRef.current.scrollLeft + sliderRef.current.offsetWidth >=
          sliderRef.current.scrollWidth
        ) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Function to scroll left or right when arrows are clicked
  const scroll = (direction) => {
    sliderRef.current.scrollBy({
      left: direction === "left" ? -520 : 520,
      behavior: "smooth",
    });
  };

  return (
    <div className="books-slider-container">
      <h1 className="section-title">Popular Books</h1>

      {/* Left arrow button */}
      <button className="arrow left" onClick={() => scroll("left")}>
        &#8249;
      </button>

      {/* Books slider */}
      <div className="books-slider" ref={sliderRef}>
        {books.map((book) => (
          <div
            key={book.id}
            className="book-card"
            style={{ backgroundColor: book.bgColor }} // Set card background color
          >
            <img src={book.cover} alt={book.title} className="book-cover" />

            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>

              {/* Star rating */}
              <div className="book-rating">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < book.rating ? "#ffffff" : "#ffffff40"} // Filled or faded star
                    />
                  ))}
              </div>

              <p className="book-description">{book.subject}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right arrow button */}
      <button className="arrow right" onClick={() => scroll("right")}>
        &#8250;
      </button>
    </div>
  );
};

export default BooksSlider; // Export component for use in other files
