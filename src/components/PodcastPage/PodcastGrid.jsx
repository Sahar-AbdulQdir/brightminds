import React, { useEffect, useState } from "react";
import { fetchHotPodcasts } from "../../api/podcastAPI";
import "../../styles/PodcastPageStyles/PodcastGrid.css";

const PodcastGrid = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetchHotPodcasts()
      .then(setPodcasts)
      .catch(console.error);
  }, []);

  return (
    <section className="podcast-section">
      <h2>Hottest this week</h2>
      <div className="podcast-grid">
        {podcasts.slice(0, 7).map((p, index) => (
          <div
            key={p.id}
            className={`podcast-card card-${index + 1}`}
            style={{ backgroundImage: `url(${p.image})` }}
          >
            <div className="overlay">
              <h3>{p.title}</h3>
              <p>{p.publisher}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PodcastGrid;
