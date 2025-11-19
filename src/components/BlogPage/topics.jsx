import React, { useEffect, useState } from "react";
import "../../styles/blogpage.css";


export default function Topics() {
  const [books, setBooks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [error, setError] = useState(null);



  return (
    <div className="brain-page">


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
      {/* <section id="articles" className="articles-section">
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
      </section> */}



    </div>
  );
}
