import React, { useEffect, useState } from "react";
import "../styles/blogpage.css";


export default function BlogPage() {
  const [books, setBooks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books from Google Books
  useEffect(() => {
    async function fetchBooks() {
      setLoadingBooks(true);
      try {
        const res = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=brain+health+OR+mental+health+neuroscience&maxResults=12"
        );
        const json = await res.json();
        if (json.items) {
          const parsed = json.items.map((it) => {
            const info = it.volumeInfo || {};
            return {
              id: it.id,
              title: info.title || "Unknown title",
              authors: info.authors || [],
              thumbnail:
                (info.imageLinks && info.imageLinks.thumbnail) ||
                (info.imageLinks && info.imageLinks.smallThumbnail) ||
                null,
              infoLink: info.infoLink || "#",
            };
          });
          setBooks(parsed);
        } else {
          setBooks([]);
        }
      } catch (e) {
        console.error("Books fetch error:", e);
        setError("Could not load books.");
      } finally {
        setLoadingBooks(false);
      }
    }

    fetchBooks();
  }, []);

  // Fetch articles (Medium tag -> RSS2JSON fallback)
  useEffect(() => {
    async function fetchArticles() {
      setLoadingArticles(true);
      try {
        // Try RSS2JSON Medium 'mental-health' tag feed
        const rssUrl =
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/tag/mental-health";
        const res = await fetch(rssUrl);
        const json = await res.json();
        if (json && json.items && json.items.length > 0) {
          const parsed = json.items.slice(0, 9).map((it, idx) => ({
            id: it.guid || idx,
            title: it.title,
            link: it.link,
            thumbnail: it.thumbnail || null,
            pubDate: it.pubDate,
            excerpt:
              (it.description && it.description.replace(/(<([^>]+)>)/gi, "").slice(0, 180)) ||
              "",
          }));
          setArticles(parsed);
        } else {
          setArticles([]);
        }
      } catch (e) {
        console.error("Articles fetch error:", e);
        setError((prev) => prev || "Could not load articles.");
      } finally {
        setLoadingArticles(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div className="brain-page">
      <nav className="top-nav">
        <div className="logo">LOGO</div>
        <div className="nav-links">
          <a>Home</a>
          <a>Puzzles</a>
          <a>Podcasts</a>
          <a>Blog</a>
        </div>
        <div className="avatar">A</div>
      </nav>

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

      {/* TOPIC ICONS (small row) */}
      <section className="topic-row" aria-hidden>
        {["Memory", "Sleep", "Stress", "Creativity", "Focus", "Neuro"].map((t, i) => (
          <div className="topic" key={i}>
            <div className="topic-icon">{t[0]}</div>
            <div className="topic-label">{t}</div>
          </div>
        ))}
      </section>

      {/* ARTICLES */}
      <section id="articles" className="articles-section">
        <h2 className="section-title">Latest Articles</h2>

        {loadingArticles ? (
          <div className="loader">Loading articles…</div>
        ) : articles.length === 0 ? (
          <div className="empty">No articles available right now.</div>
        ) : (
          <div className="articles-grid">
            {articles.map((a, idx) => (
              <article
                key={a.id}
                className={`floating-card card-variant-${(idx % 4) + 1}`}
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                {a.thumbnail ? (
                  <img src={a.thumbnail} alt={a.title} className="article-thumb" />
                ) : (
                  <div className="article-thumb placeholder" aria-hidden />
                )}
                <div className="article-content">
                  <h3 className="article-title">{a.title}</h3>
                  <p className="article-excerpt">{a.excerpt}</p>
                  <a className="read-more" href={a.link} target="_blank" rel="noreferrer">
                    Read more →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* BOOKS - Roof layout */}
      <section id="books" className="books-section">
        <h2 className="section-title">Recommended Reads</h2>

        {loadingBooks ? (
          <div className="loader">Loading books…</div>
        ) : books.length === 0 ? (
          <div className="empty">No book recommendations right now.</div>
        ) : (
          <div className="book-container" role="list" aria-label="book recommendations">
            {/* We'll render the books as a "roof" row; center the container */}
            {books.map((b, i) => (
              <div
                className="book"
                role="listitem"
                key={b.id}
                style={{ transform: `rotateY(${ -25 + (i % 5) * -1 }deg)`, animationDelay: `${i * 80}ms` }}
              >
                <a className="book-front" href={b.infoLink} target="_blank" rel="noreferrer" title={b.title}>
                  {b.thumbnail ? (
                    <img src={b.thumbnail} alt={b.title} />
                  ) : (
                    <div className="no-thumb">No Cover</div>
                  )}
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SUGGESTIONS */}
      <section className="suggestions">
        <h2 className="section-title">Our Top Suggestions</h2>
        <div className="suggestion-row">
          {["Suggestion", "Suggestion", "Suggestion"].map((txt, i) => (
            <div className="suggestion-card" key={i}>
              <div className="suggest-icon">🧩</div>
              <h3>{txt}</h3>
              <p>Short intro text that explains why this suggestion helps your brain health or attention.</p>
              <button className="btn small">Read More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="page-footer">
        <div className="faves">
          <div className="fav-row">
            <div className="fav">Favourites</div>
            <div className="fav">Favourites</div>
            <div className="fav">Favourites</div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60"
            alt="Person drinking tea"
            className="footer-image"
          />
        </div>

        <div className="copyright">©YourSite - All rights reserved</div>
      </footer>

      {error && <div className="error-toast">{error}</div>}
    </div>
  );
}
