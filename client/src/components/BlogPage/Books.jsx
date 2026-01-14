// Books.jsx
// Component to display and interact with audiobooks from archive.org
// import necessary libraries and styles
import React, { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaBookmark,
} from "react-icons/fa";
import "./BlogsPage/books.css";
import "../../styles/colors.css"

// Base URL for backend API
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Books Component
const Books = () => {
  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [current, setCurrent] = useState(null);
  const audioRef = useRef(new Audio());
  const booksPerPage = 30;

  // Define main genres
  const mainGenres = [
    "All",
    "Fiction",
    "Mystery",
    "Romance",
    "Fantasy",
    "Science Fiction",
    "Biography",
    "Adventure",
    "Historical",
    "Poetry",
  ];

  // Fetch books from archive.org
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const url =
          "https://archive.org/advancedsearch.php?q=collection:(librivoxaudio)&fl[]=identifier&fl[]=title&fl[]=subject&rows=200&page=1&output=json";
        const res = await fetch(
          `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
        );
        if (!res.ok) throw new Error("Network response was not ok");
        // Parse JSON response
        const data = await res.json();
        setBooks(data.response.docs);
        setCurrentPage(1);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };

    fetchBooks();
  }, []);

  // Filter and paginate books
  useEffect(() => {
    let filtered = books;
    if (selectedGenre !== "All") {
      // Filter books by selected genre
      filtered = books.filter((b) =>
        Array.isArray(b.subject)
          ? b.subject.some((s) =>
              s.toLowerCase().includes(selectedGenre.toLowerCase())
            )
            // Handle case where subject is a string
          : typeof b.subject === "string"
          ? b.subject.toLowerCase().includes(selectedGenre.toLowerCase())
          : false
      );
    }

    // Paginate filtered books
    const start = (currentPage - 1) * booksPerPage;
    // Calculate end index
    const end = start + booksPerPage;
    setDisplayedBooks(filtered.slice(start, end));
  }, [books, selectedGenre, currentPage]);

  // Load and play audio safely
  const loadAndPlay = async (id) => {
    try {
      const metadataUrl = `https://archive.org/metadata/${id}`;
      const res = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(metadataUrl)}`
      );
      // Check for successful response
      if (!res.ok) throw new Error("Failed to fetch metadata");

      const data = await res.json();
      const mp3 = data.files.find((f) => f.name.endsWith(".mp3"));
      if (!mp3) return;
      // Construct audio URL
      const url = `https://archive.org/download/${id}/${mp3.name}`;

      if (current === url) {
        audioRef.current.pause();
        setCurrent(null);
      } else {
        // Stop previous audio
        audioRef.current.pause();
        audioRef.current.src = url;

        try {
          await audioRef.current.play();
          setCurrent(url);
        } catch (err) {
          if (err.name !== "AbortError")
            console.error("Audio play error:", err);
        }
      }
      // Handle any errors during loading and playing
    } catch (err) {
      console.error("Failed to load and play audio:", err);
    }
  };

  // Seek audio
  const seek = (seconds) => {
    audioRef.current.currentTime += seconds;
  };

  // Save book
  const saveBook = async (book) => {
    // Check for user email in local storage
    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("Please sign in to save items");
      return;
    }

    try {
      // Prepare item data to save
      const itemToSave = {
        type: "book",
        title: book.title,
        identifier: book.identifier,
        image: `https://archive.org/services/img/${book.identifier}`,
        description: book.subject?.[0] || "No description",
        duration: "N/A",
      };

      // Send save request to backend
      const res = await fetch(`${BASE_URL}/api/save-item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, item: itemToSave }),
      });

      if (!res.ok) throw new Error("Failed to save item");
      // Notify user of successful save
      alert("Book saved!");
    } catch (err) {
      console.error("Error saving book:", err);
      alert("Could not save the book");
    }
  };

  // Filter by genre
  const filterByGenre = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  // Calculate total pages
  const totalPages = Math.ceil(
    (selectedGenre === "All"
      ? books.length
      // Count books matching selected genre
      : books.filter((b) =>
          Array.isArray(b.subject)
            ? b.subject.some((s) =>
              // Check if subject includes selected genre
                s.toLowerCase().includes(selectedGenre.toLowerCase())
              )
            : typeof b.subject === "string"
            // Handle case where subject is a string
            ? b.subject.toLowerCase().includes(selectedGenre.toLowerCase())
            : false
        ).length) / booksPerPage
  );

  return (
    // Main container
    <div className="library-container">
      {/* Top Border */}
      <div className="library-border-top">
        <div className="library-nameplate">ᖳᖰ Audio Books Collection</div>
      </div>

      {/* Left Shelf: Genre Buttons */}
      <div className="library-border-left">
        <div className="genre-buttons">
          {/* Genre buttons */}
          {mainGenres.map((genre) => (
            <div
              key={genre}
              className="genre-btn"
              onClick={() => filterByGenre(genre)}
            >
              <div
              // Highlight selected genre
                className={`genre-btn-icon ${
                  selectedGenre === genre ? "active" : ""
                }`}
              >
                {genre[0]}
              </div>
              {/* Genre label */}
              <div className="genre-btn-label">{genre}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Shelf: Pagination */}
      <div className="library-border-right">
        <button
        // Previous page button
          className="book-spine"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {/* Page number display */}
        <span style={{ margin: "15px 0", color: "#785c8a" }}>
          {currentPage} / {totalPages}
        </span>
        <button
        // Next page button
          className="book-spine"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Center Content: Books Grid */}
      <div className="library-content">
        <div className="shelf-grid">
          {/* Book items */}
          {displayedBooks.map((book) => (
            <div className="book-wrapper" key={book.identifier}>
              <div className="book-container">
                <div className="book">
                  <img
                  // Book cover image
                    src={`https://archive.org/services/img/${book.identifier}`}
                    alt={book.title}
                  />
                </div>
              </div>
              {/* Book controls */}
              <div className="controls">
                <FaBackward onClick={() => seek(-10)} />
                <FaPlay onClick={() => loadAndPlay(book.identifier)} />
                <FaPause onClick={() => audioRef.current.pause()} />
                <FaForward onClick={() => seek(10)} />
                <FaBookmark onClick={() => saveBook(book)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
