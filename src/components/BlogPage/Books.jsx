// import React, { useEffect, useState } from "react";

// export default function Books() {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     // Fetch brain health books from Google Books API
//     fetch(
//       'https://www.googleapis.com/books/v1/volumes?q=brain+health&maxResults=20'
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         const fetchedBooks = data.items.map((item) => ({
//           title: item.volumeInfo.title,
//           img: item.volumeInfo.imageLinks?.thumbnail || '',
//           link: item.volumeInfo.previewLink || '#',
//         }));
//         setBooks(fetchedBooks);
//       });
//   }, []);

//   return (
//     <div className="w-full min-h-screen bg-gray-50 p-10">
//       <h1 className="text-4xl font-bold text-center mb-10">Brain Health Library</h1>

//       {/* Books Section with Shelf */}
//       <div className="book-shelf-container relative flex flex-col items-center">
//         {/* Books Container */}
//         <div className="book-container flex gap-6 flex-wrap justify-center relative z-20 mb-8">
//           {books.slice(0, 5).map((b, i) => (
//             <a key={i} href={b.link} target="_blank" rel="noopener noreferrer" className="book">
//               <img alt={b.title} src={b.img} />
//             </a>
//           ))}
//         </div>

//         {/* Glowy Purple Shelf UNDER the books */}
//         <div className="shelf-wrapper relative w-full max-w-4xl -mt-4">
//           {/* Shelf Glow Effects */}
//           <div className="shelf-glow absolute top-0 left-0 right-0 h-12 bg-purple-600/40 blur-2xl rounded-full"></div>
//           <div className="shelf-glow absolute top-2 left-0 right-0 h-8 bg-purple-500/50 blur-lg rounded-full"></div>
//           <div className="shelf-glow absolute top-4 left-0 right-0 h-6 bg-purple-400/60 blur-md rounded-full"></div>
          
//           {/* Main Shelf Surface */}
//           <div className="shelf-main relative z-10 w-full h-8 bg-gradient-to-b from-purple-900 via-purple-700 to-purple-800 rounded-b-lg border-t-4 border-purple-300/50 shadow-2xl">
//             {/* Shelf Top Edge Glow */}
//             <div className="shelf-edge absolute -top-2 left-0 right-0 h-2 bg-gradient-to-b from-purple-400 to-purple-300 rounded-t-lg"></div>
            
//             {/* Shelf Shine Reflection */}
//             <div className="shelf-shine absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-purple-200/40 to-transparent"></div>
            
//             {/* Shelf Details */}
//             <div className="shelf-details absolute bottom-2 left-4 right-4 h-1 bg-linear-to-r from-transparent via-purple-200/20 to-transparent rounded-full"></div>
//           </div>

//           {/* Shelf Support Shadows */}
//           <div className="shelf-support absolute -bottom-4 left-1/4 w-2 h-4 bg-purple-800 rounded-b-lg blur-sm"></div>
//           <div className="shelf-support absolute -bottom-4 left-1/2 w-2 h-4 bg-purple-800 rounded-b-lg blur-sm transform -translate-x-1/2"></div>
//           <div className="shelf-support absolute -bottom-4 right-1/4 w-2 h-4 bg-purple-800 rounded-b-lg blur-sm"></div>
//         </div>
//       </div>

//       {/* Custom CSS */}
//       <style>{`
//         .book-shelf-container {
//           min-height: 300px;
//           padding-top: 50px;
//         }

//         .book-container {
//           display: flex;
//           position: relative;
//           align-items: flex-end;
//           justify-content: center;
//           perspective: 600px;
//         }

//         @keyframes initAnimation {
//           0% { transform: rotateY(-0deg); }
//           100% { transform: rotateY(-30deg); }
//         }

//         .book {
//           width: 120px;
//           height: 180px;
//           position: relative;
//           transform-style: preserve-3d;
//           transform: rotateY(-20deg);
//           transition: 0.8s ease;
//           animation: 1s ease 0s 1 initAnimation;
//           display: inline-block;
//           filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.3));
//         }

//         .book:hover {
//           transform: rotateY(0deg) translateY(-10px);
//           filter: drop-shadow(2px 8px 12px rgba(0, 0, 0, 0.4));
//         }

//         .book > :first-child {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 120px;
//           height: 180px;
//           transform: translateZ(24px);
//           background-color: #011131;
//           border-radius: 0 2px 2px 0;
//           box-shadow: 3px 3px 10px #666;
//           object-fit: cover;
//         }

//         .book::before {
//           position: absolute;
//           content: ' ';
//           left: 0;
//           top: 2px;
//           width: 34px;
//           height: 176px;
//           transform: translateX(97px) rotateY(90deg);
//           background: linear-gradient(90deg, 
//             #fff 0%, #f9f9f9 5%, #fff 10%, #f9f9f9 15%, 
//             #fff 20%, #f9f9f9 25%, #fff 30%, #f9f9f9 35%, 
//             #fff 40%, #f9f9f9 45%, #fff 50%, #f9f9f9 55%, 
//             #fff 60%, #f9f9f9 65%, #fff 70%, #f9f9f9 75%, 
//             #fff 80%, #f9f9f9 85%, #fff 90%, #f9f9f9 95%, 
//             #fff 100%
//           );
//         }

//         .book::after {
//           position: absolute;
//           top: 0;
//           left: 0;
//           content: ' ';
//           width: 120px;
//           height: 180px;
//           transform: translateZ(-15px);
//           background-color: #011131;
//           border-radius: 0 2px 2px 0;
//           box-shadow: -6px 0 30px 6px #666;
//         }

//         /* Shelf Styling */
//         .shelf-main {
//           // box-shadow: 
//           //   0 0px -15px rgba(147, 51, 234, 0.7),
//           //   0 -2px 35px rgba(147, 51, 234, 0.5),
//           //   0 -8px 15px rgba(0, 0, 0, 0.3),
//           //   inset 0 1px 0 rgba(255, 255, 255, 0.3);
//             height: 20px;
//         }

//         .shelf-edge {
//           // box-shadow: 0 -2px 20px rgba(192, 132, 252, 0.9);
//         }

//         /* Pulsing Glow Animation */
//         @keyframes pulseGlow {
//           0%, 100% { 
//             opacity: 0.6;
//             transform: translateY(0);
//           }
//           50% { 
//             opacity: 0.8;
//             transform: translateY(-2px);
//           }
//         }

//         .shelf-glow {
//           animation: pulseGlow 4s ease-in-out infinite;
//         }

//         .shelf-glow:nth-child(1) { 
//           animation-delay: 0s; 
//         }
//         .shelf-glow:nth-child(2) { 
//           animation-delay: 1s; 
//         }
//         .shelf-glow:nth-child(3) { 
//           animation-delay: 2s; 
//         }

//         /* Book Reflection on Shelf */
//         .book-container::after {
//           content: '';
//           position: absolute;
//           top: calc(100% + 5px);
//           left: 50%;
//           transform: translateX(-50%);
//           width: 80%;
//           height: 5px;
//           // background: linear-gradient(180deg, 
//           //   rgba(147, 51, 234, 0.4) 0%, 
//           //   transparent 100%
//           // );
//           border-radius: 50%;
//           filter: blur(8px);
//           z-index: 25;
//         }

//         /* Support Beam Animation */
//         @keyframes supportFade {
//           0%, 100% { opacity: 0.3; }
//           50% { opacity: 0.6; }
//         }

//         .shelf-support {
//           animation: supportFade 3s ease-in-out infinite;
//         }

//         .shelf-support:nth-child(1) { animation-delay: 0s; }
//         .shelf-support:nth-child(2) { animation-delay: 1s; }
//         .shelf-support:nth-child(3) { animation-delay: 2s; }
//       `}</style>
//     </div>
//   );
// }
 import React, { useState, useEffect, useRef } from 'react';
import '../BlogPage/BlogsPage/books.css';

// Icons
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5,3 19,12 5,21" fill="currentColor" />
  </svg>
);

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="4" width="4" height="16" fill="currentColor" />
    <rect x="14" y="4" width="4" height="16" fill="currentColor" />
  </svg>
);

const SaveIcon = ({ saved }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const Books = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(new Audio());

  const sampleAudiobooks = [
    {
      id: 1,
      title: "The Mysterious Affair at Styles",
      author: "Agatha Christie",
      coverUrl: "https://covers.openlibrary.org/b/id/8254436-L.jpg",
      audioUrl: "https://archive.org/download/mysteriousaffairatstyles_2110_librivox/mysteriousaffairatstyles_01_christie_128kb.mp3",
      duration: "5:24"
    },
    {
      id: 2,
      title: "Alice's Adventures",
      author: "Lewis Carroll",
      coverUrl: "https://covers.openlibrary.org/b/id/8231469-L.jpg",
      audioUrl: "https://archive.org/download/alices_adventures_in_wonderland_librivox/aliceinwonderland_01_carroll_128kb.mp3",
      duration: "15:30"
    },
    {
      id: 3,
      title: "A Room with a View",
      author: "E. M. Forster",
      coverUrl: "https://covers.openlibrary.org/b/id/8233954-L.jpg",
      audioUrl: "https://archive.org/download/room_with_a_view_1002_librivox/roomwithaview_01_forster_128kb.mp3",
      duration: "22:45"
    },
    {
      id: 4,
      title: "The Secret Garden",
      author: "Frances Burnett",
      coverUrl: "https://covers.openlibrary.org/b/id/8231570-L.jpg",
      audioUrl: "https://archive.org/download/secret_garden_0812_librivox/secretgarden_01_burnett_128kb.mp3",
      duration: "18:12"
    },
    {
      id: 5,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      coverUrl: "https://covers.openlibrary.org/b/id/8231545-L.jpg",
      audioUrl: "https://archive.org/download/pandp_1212_librivox/pandp_01_austen_128kb.mp3",
      duration: "27:18"
    },
    {
      id: 6,
      title: "Sherlock Holmes",
      author: "Arthur Conan Doyle",
      coverUrl: "https://covers.openlibrary.org/b/id/8260503-L.jpg",
      audioUrl: "https://archive.org/download/adventures_of_sherlock_holmes_1310_librivox/adventuresofsherlockholmes_01_doyle_128kb.mp3",
      duration: "31:42"
    },
    {
      id: 7,
      title: "Moby Dick",
      author: "Herman Melville",
      coverUrl: "https://covers.openlibrary.org/b/id/8231558-L.jpg",
      audioUrl: "https://archive.org/download/moby_dick_1005_librivox/mobydick_01_melville_128kb.mp3",
      duration: "43:15"
    },
    {
      id: 8,
      title: "Frankenstein",
      author: "Mary Shelley",
      coverUrl: "https://covers.openlibrary.org/b/id/8231467-L.jpg",
      audioUrl: "https://archive.org/download/frankenstein_0812_librivox/frankenstein_01_shelley_128kb.mp3",
      duration: "36:28"
    },
    {
      id: 9,
      title: "Dracula",
      author: "Bram Stoker",
      coverUrl: "https://covers.openlibrary.org/b/id/8231655-L.jpg",
      audioUrl: "https://archive.org/download/dracula_0812_librivox/dracula_01_stoker_128kb.mp3",
      duration: "29:33"
    }
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        setAudiobooks(sampleAudiobooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
    
    const saved = localStorage.getItem('dyslexia_saved_books');
    if (saved) {
      setSavedBooks(new Set(JSON.parse(saved)));
    }

    // Audio event listeners
    audioRef.current.addEventListener('ended', handleAudioEnded);
    
    return () => {
      audioRef.current.removeEventListener('ended', handleAudioEnded);
      audioRef.current.pause();
    };
  }, []);

  const toggleSaveBook = (bookId) => {
    const updatedSavedBooks = new Set(savedBooks);
    if (updatedSavedBooks.has(bookId)) {
      updatedSavedBooks.delete(bookId);
    } else {
      updatedSavedBooks.add(bookId);
    }
    setSavedBooks(updatedSavedBooks);
    localStorage.setItem('dyslexia_saved_books', JSON.stringify([...updatedSavedBooks]));
  };

  const playAudio = async (audioUrl, bookId) => {
    try {
      if (playingId === bookId) {
        // Pause if same book is playing
        audioRef.current.pause();
        setPlayingId(null);
      } else {
        // Play new book
        if (audioRef.current.src !== audioUrl) {
          audioRef.current.src = audioUrl;
          audioRef.current.load();
        }
        
        await audioRef.current.play();
        setPlayingId(bookId);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleAudioEnded = () => {
    setPlayingId(null);
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setPlayingId(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading audiobooks...</div>
      </div>
    );
  }

  return (
    <div className="books-container">
      <div className="library-header">
        <h1>Audio Library</h1>
        <p className="library-subtitle">Listen to audiobooks designed for dyslexia support</p>
        <div className="controls-info">
          <div className="control-tip">
            <span className="icon-demo play-demo">▶️</span>
            <span>Click cover to play/pause</span>
          </div>
          <div className="control-tip">
            <span className="icon-demo save-demo">❤️</span>
            <span>Click heart to save</span>
          </div>
        </div>
      </div>

      <div className="books-shelf">
        <div className="books-grid">
          {audiobooks.map((book) => {
            const isPlaying = playingId === book.id;
            const isSaved = savedBooks.has(book.id);

            return (
              <div key={book.id} className="book-item">
                <div className="book-container">
                  <div className="book">
                    <div className="book-cover" onClick={() => playAudio(book.audioUrl, book.id)}>
                      <img 
                        src={book.coverUrl} 
                        alt={`${book.title} by ${book.author}`}
                        className="book-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/200x300/011131/ffffff?text=Cover';
                        }}
                      />
                      
                      <div className="book-play-overlay">
                        <button 
                          className={`play-icon-btn ${isPlaying ? 'playing' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            playAudio(book.audioUrl, book.id);
                          }}
                          aria-label={isPlaying ? 'Pause audiobook' : 'Play audiobook'}
                        >
                          {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>
                      </div>

                      <div className="book-top-overlay">
                        <button 
                          className={`save-icon-btn ${isSaved ? 'saved' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveBook(book.id);
                          }}
                          aria-label={isSaved ? 'Remove from saved' : 'Save audiobook'}
                        >
                          <SaveIcon saved={isSaved} />
                        </button>
                      </div>

                      {isPlaying && (
                        <div className="playing-indicator">
                          <div className="sound-wave">
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                            <div className="wave-bar"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="shelf"></div>
      </div>

      {playingId && (
        <div className="audio-player-controls">
          <div className="now-playing">
            <span className="now-playing-label">Now Playing:</span>
            <span className="now-playing-title">
              {audiobooks.find(b => b.id === playingId)?.title}
            </span>
          </div>
          <div className="player-buttons">
            <button 
              className="player-btn stop-btn"
              onClick={stopAudio}
              aria-label="Stop playback"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="6" y="6" width="12" height="12" fill="currentColor" />
              </svg>
            </button>
            <button 
              className="player-btn volume-btn"
              onClick={() => {
                audioRef.current.muted = !audioRef.current.muted;
              }}
              aria-label="Toggle mute"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;