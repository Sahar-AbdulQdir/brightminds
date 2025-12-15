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

  useEffect(() => {
    let filtered = books;
    if (selectedGenre !== "All") {
      filtered = books.filter((b) =>
        b.subject?.some((s) => s.toLowerCase().includes(selectedGenre.toLowerCase()))
      );
    }

    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    setDisplayedBooks(filtered.slice(start, end));
  }, [books, selectedGenre, currentPage]);

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

  const saveBook = (book) => {
    const saved = JSON.parse(localStorage.getItem("savedBooks")) || [];
    if (!saved.find((b) => b.identifier === book.identifier)) {
      localStorage.setItem("savedBooks", JSON.stringify([...saved, book]));
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
          b.subject?.some((s) => s.toLowerCase().includes(selectedGenre.toLowerCase()))
        ).length) / booksPerPage
  );

  return (
    <div>
      {/* Genre buttons (styled like topics) */}
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

      {/* Books grid */}
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

      {/* Pagination arrows (styled like topics) */}
      <div className="genre-buttons">
        <button
          className="genre-btn"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <div className="genre-btn-icon">
            <FaChevronLeft />
          </div>
          <div className="genre-btn-label">Prev</div>
        </button>
        <span className="page-info">
          Page {currentPage} / {totalPages}
        </span>
        <button
          className="genre-btn"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <div className="genre-btn-icon">
            <FaChevronRight />
          </div>
          <div className="genre-btn-label">Next</div>
        </button>
      </div>
    </div>
  );
};

export default Books;
