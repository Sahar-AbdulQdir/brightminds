import React, { useEffect, useState, useRef } from "react";
import "../../styles/BlogsPage/Articles.css"
import { Heart, BookOpen, X } from "lucide-react";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const articleCardsRef = useRef([]);

  // Using NewsAPI - you'll need to get a free API key from newsapi.org
  const API_KEY = "fa03fb15b3f541bbb11b99005daf8c2a"; // Replace with your actual key
  const API_URL = `https://newsapi.org/v2/everything?q=brain+health+OR+neuroscience+OR+mental+health&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setLoading(false);
      });
  }, []);

  const toggleFavourite = (title) => {
    setFavourites((prev) =>
      prev.includes(title) ? prev.filter((fav) => fav !== title) : [...prev, title]
    );
  };

  const openArticleModal = (article, index) => {
    // Get the position of the clicked card
    if (articleCardsRef.current[index]) {
      const cardRect = articleCardsRef.current[index].getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      setModalPosition({
        top: cardRect.top + scrollTop,
        left: cardRect.left,
        cardWidth: cardRect.width
      });
    }
    
    setSelectedArticle(article);
  };

  const closeArticleModal = () => {
    setSelectedArticle(null);
  };

  // Fallback image for articles without images
  const getImageUrl = (urlToImage) => {
    return urlToImage || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
  };

  if (loading) {
    return <div className="loading">Loading brain health articles...</div>;
  }

  return (
    <div className="articles-container">
      <h1 className="articles-title">Our Suggestions</h1>

      {/* Full Article Modal Overlay */}
      {selectedArticle && (
        <div className="article-modal-overlay" onClick={closeArticleModal}>
          <div 
            className="article-modal-content"
            style={{
              top: `${modalPosition.top}px`,
              left: `${modalPosition.left}px`,
              '--card-width': `${modalPosition.cardWidth}px`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal-btn" onClick={closeArticleModal}>
              <X size={24} />
            </button>
            
            <div className="article-modal-header">
              <img 
                src={getImageUrl(selectedArticle.urlToImage)} 
                alt={selectedArticle.title}
                className="article-modal-img"
              />
              <div className="article-modal-info">
                <h2>{selectedArticle.title}</h2>
                <p className="article-modal-source">
                  <strong>Source:</strong> {selectedArticle.source?.name}
                  {selectedArticle.publishedAt && (
                    <span className="article-date">
                      • {new Date(selectedArticle.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="article-modal-body">
              <div className="article-description">
                <h3>Summary</h3>
                <p>{selectedArticle.description}</p>
              </div>
              
              <div className="article-content">
                <h3>Full Article</h3>
                <p>{selectedArticle.content ? selectedArticle.content.replace(/\[\+\d+ chars\]/g, '') : 'Full content not available...'}</p>
              </div>

              <div className="article-modal-actions">
                <button
                  className="fav-btn large"
                  onClick={() => toggleFavourite(selectedArticle.title)}
                >
                  <Heart
                    className={
                      favourites.includes(selectedArticle.title)
                        ? "fav-icon active"
                        : "fav-icon"
                    }
                  />
                  {favourites.includes(selectedArticle.title) ? 'Remove from Favourites' : 'Add to Favourites'}
                </button>

                <a 
                  href={selectedArticle.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="external-link-btn"
                >
                  View Original Article
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="articles-grid">
        {articles.length > 0 ? articles.slice(0, 9).map((article, index) =>  (
          <div
            key={index}
            className="article-card"
            ref={el => articleCardsRef.current[index] = el}
          >
            <img
              src={getImageUrl(article.urlToImage)}
              alt={article.title}
              className="article-img"
              onClick={() => openArticleModal(article, index)}
            />
            <div className="article-card-content" onClick={() => openArticleModal(article, index)}>
              <h3>{article.title}</h3>
              <p className="article-source">{article.source?.name}</p>
              <p className="article-desc">{article.description}</p>
            </div>

            <div className="card-footer">
              <button
                className="fav-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(article.title);
                }}
              >
                <Heart
                  className={
                    favourites.includes(article.title)
                      ? "fav-icon active"
                      : "fav-icon"
                  }
                />
                Favourite
              </button>

              <button 
                className="read-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  openArticleModal(article, index);
                }}
              >
                <BookOpen className="read-icon" />
                Read
              </button>
            </div>
          </div>
        )) : (
          <div className="no-articles">
            <p>No articles found. Please check your API key or try again later.</p>
          </div>
        )}
      </div>

           {/* HERO */}
      <header className="hero">
        <div className="blog-hero-inner">
          <div className="hero-left">
            <h1>
              Mind Matters.
              <span className="accent"> Empowering Mind</span>
            </h1>
            <p className="hero-sub">
              Digital therapeutics, neuroscience insights and science-backed reading to support brain
              health and creative imagination.
            </p>
            <div className="hero-ctas">
              <a className="btn primary" href="#books">
                Explore Books
              </a>
              <a className="btn ghost" href="#articles">
                Read Articles
              </a>
            </div>
          </div>

          <div className="hero-right">
            {/* Animated floating shapes */}
            <div className="floating-card hero-card">
              <div className="card-title">Neuroplasticity</div>
              <div className="card-body">How the brain rewires itself — quick summary.</div>
              <a href="#articles" className="card-btn">
                Read
              </a>
            </div>

            <div className="hero-orb" aria-hidden />
            <div className="hero-grid">
              <div className="stat">
                <strong>40+</strong>
                <span>Guides</span>
              </div>
              <div className="stat">
                <strong>300+</strong>
                <span>Articles</span>
              </div>
              <div className="stat">
                <strong>120</strong>
                <span>Books</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
    </div>
  );
}