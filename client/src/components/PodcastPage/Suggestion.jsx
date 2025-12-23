import React from "react";
import sugPodImg from "../../assets/images/Pod_Suggestion.png";
import "../../components/PodcastPage/PodcastPageStyles/PodSuggestion.css";
import { PiRankingFill } from "react-icons/pi";


const Suggestion = () => (
  <section className="suggestion-section">
    <h2>Our Suggestion, <span className="circle-sketch-highlight">Justin Sung</span> Podcast</h2>
    <p className="suggestion_name">Top <PiRankingFill className="rank_icon"/> <span>TEDx</span> speaker</p>
    <div className="suggestion-content">
      <div className="suggestion-card">
        <div className="card-text">
<p>
  Dr. Justin Sung is a learning coach, former medical doctor, and <span>top 1% TEDx</span> speaker
  who specialises in learning science and effective study strategies.
</p>
<hr />
<p>
  He has trained over <span>20k</span> learners worldwide through workshops, lectures,
  and online education, bridging research with real-world learning.
</p>
<hr />
<p>
  As a social entrepreneur and lead at <span>iCanStudy</span>, Justin is passionate about
  making high-quality education accessible at scale.
</p>

          <hr />
        </div>
      </div>
      <img src={sugPodImg} alt="Podcast suggestion" className="suggestion-img" />
    </div>
  </section>
);

export default Suggestion;

