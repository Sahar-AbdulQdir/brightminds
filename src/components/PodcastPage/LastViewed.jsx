import React from "react";
import "../../styles/PodcastPageStyles/LastViewed.css";

const sampleViewed = [
  { id: 1, title: "Episode 62: Things I did well", author: "Lindsey", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, title: "Episode 61: Calm in chaos", author: "James", img: "https://randomuser.me/api/portraits/men/45.jpg" },
];

const LastViewed = () => (
  <section className="last-viewed">
    <h2>Last viewed</h2>
    {sampleViewed.map((item) => (
      <div key={item.id} className="last-viewed-item">
        <div className="item-left">
          <img src={item.img} alt={item.author} className="item-img" />
          <div>
            <h4>{item.title}</h4>
            <p>{item.author}</p>
          </div>
        </div>
        <div className="item-right">
          <span className="listen-text">Listen now</span>
          <div className="play-button">
            <div className="triangle" />
          </div>
        </div>
      </div>
    ))}
  </section>
);

export default LastViewed;
