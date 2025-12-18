import React, { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaBookmark,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../BlogPage/BlogsPage/books.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [current, setCurrent] = useState(null);
  const audioRef = useRef(new Audio());
  const booksPerPage = 30;

  const mainGenres = ["All", "Fiction", "Science", "History", "Poetry", "Philosophy", "Adventure"];

  // Fetch books from archive.org
  useEffect(() => {
    fetch(
      "https://archive.org/advancedsearch.php?q=collection:(librivoxaudio)&fl[]=identifier&fl[]=title&fl[]=subject&rows=200&page=1&output=json"
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.response.docs);
        setCurrentPage(1);
      });
  }, []);

  // Filter and paginate books
  useEffect(() => {
    let filtered = books;
    if (selectedGenre !== "All") {
      filtered = books.filter((b) =>
        Array.isArray(b.subject)
          ? b.subject.some((s) => s.toLowerCase().includes(selectedGenre.toLowerCase()))
          : typeof b.subject === "string"
          ? b.subject.toLowerCase().includes(selectedGenre.toLowerCase())
          : false
      );
    }

    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    setDisplayedBooks(filtered.slice(start, end));
  }, [books, selectedGenre, currentPage]);

  // Audio functions
  const loadAndPlay = async (id) => {
    const res = await fetch(`https://archive.org/metadata/${id}`);
    const data = await res.json();
    const mp3 = data.files.find((f) => f.name.endsWith(".mp3"));
    if (!mp3) return;

    const url = `https://archive.org/download/${id}/${mp3.name}`;
    if (current === url) {
      audioRef.current.pause();
      setCurrent(null);
    } else {
      audioRef.current.src = url;
      audioRef.current.play();
      setCurrent(url);
    }
  };

  const seek = (seconds) => {
    audioRef.current.currentTime += seconds;
  };

  const saveBook = async (book) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("Please sign in to save items");
      return;
    }

    try {
      const itemToSave = {
        type: "book",
        title: book.title,
        identifier: book.identifier,
        image: `https://archive.org/services/img/${book.identifier}`,
        description: book.subject?.[0] || "No description",
        duration: "N/A",
      };

      const res = await fetch("http://localhost:5000/api/save-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, item: itemToSave }),
      });

      if (!res.ok) throw new Error("Failed to save item");

      alert("Book saved!");
    } catch (err) {
      console.error(err);
      alert("Could not save the book");
    }
  };

  const filterByGenre = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(
    (selectedGenre === "All"
      ? books.length
      : books.filter((b) =>
          Array.isArray(b.subject)
            ? b.subject.some((s) => s.toLowerCase().includes(selectedGenre.toLowerCase()))
            : typeof b.subject === "string"
            ? b.subject.toLowerCase().includes(selectedGenre.toLowerCase())
            : false
        ).length) / booksPerPage
  );

  return (
    <div className="library-container">
      {/* Top Border */}
      <div className="library-border-top">
        <div className="library-nameplate">Knowledge Repository</div>
      </div>

      {/* Left Shelf: Genre Buttons */}
      <div className="library-border-left">
      <div className="genre-buttons">
        {mainGenres.map((genre) => (
          <div
            key={genre}
            className="genre-btn"
            onClick={() => filterByGenre(genre)}
          >
            <div className={`genre-btn-icon ${selectedGenre === genre ? "active" : ""}`}>
              {genre[0]} {/* First letter as icon */}
            </div>
            <div className="genre-btn-label">{genre}</div>
          </div>
        ))}
      </div>
      </div>

      {/* Right Shelf: Pagination */}
      <div className="library-border-right">
        <button
          className="book-spine"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span style={{ margin: "15px 0", color: "#e6dcc9" }}>
          {currentPage} / {totalPages}
        </span>
        <button
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
          {displayedBooks.map((book) => (
            <div className="book-wrapper" key={book.identifier}>
              <div className="book-container">
                <div className="book">
                  <img
                    src={`https://archive.org/services/img/${book.identifier}`}
                    alt={book.title}
                  />
                </div>
              </div>
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

      {/* Bottom Border */}
      {/* <div className="library-border-bottom">
        <div className="library-stamp">Established 1847</div>
        <div>Reference Section - Non-circulating</div>
        <div className="library-stamp">Library Seal</div>
      </div> */}
    </div>
  );
};

export default Books;
