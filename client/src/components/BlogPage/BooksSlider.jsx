import React, { useEffect, useState, useRef } from "react";
import { FaStar } from "react-icons/fa";
import "./BlogsPage/BooksSlider.css";

const COLORS = [
  "#A4E0EB", // frosted-blue
  "#EDB9D6", // pink-orchid
  "#FDCA95", // peach-glow
  "#CBB5E2", // wisteria
];

const BooksSlider = () => {
  const [books, setBooks] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch(
      "https://archive.org/advancedsearch.php?q=collection:(librivoxaudio)&fl[]=identifier&fl[]=title&fl[]=subject&rows=200&page=1&output=json"
    )
      .then((res) => res.json())
      .then((data) => {
        const mappedBooks = data.response.docs.map((book, index) => ({
          id: book.identifier,
          title: book.title,
          author: "Unknown Author",
          cover: `https://archive.org/services/img/${book.identifier}`,
          subject: Array.isArray(book.subject)
            ? book.subject.join(", ")
            : book.subject || "No description",
          rating: Math.floor(Math.random() * 5) + 1,
          bgColor: COLORS[index % COLORS.length], // 🔥 fixed palette
        }));
        setBooks(mappedBooks);
      });
  }, []);

  // 🔁 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: 520,
          behavior: "smooth",
        });

        // reset scroll (loop effect)
        if (
          sliderRef.current.scrollLeft +
            sliderRef.current.offsetWidth >=
          sliderRef.current.scrollWidth
        ) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 4000);

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
