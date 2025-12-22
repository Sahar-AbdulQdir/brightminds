import React from "react";
import { useSpring, animated } from "@react-spring/web";
import "./BlogsPage/BooksHero.css";
import Author1 from "../../assets/images/Q_CharlesWEliot.jpg"
import Author2 from "../../assets/images/Q_JosephBrodsky.jpg"
import Author3 from "../../assets/images/Q_HarukiMurakami.jpg"
import Author4 from "../../assets/images/Q_william nicholson.jpg"

const FloatingCard = ({ children, style, className }) => {
  const float = useSpring({
    loop: { reverse: true },
  });

  return (
    <animated.div style={float} className={`floating-card ${className}`} >
      {children}
    </animated.div>
  );
};

const QuoteCardContent = ({ img, name, role, quote, highlight }) => (
  <div className="quote-card-content">
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
      <img src={img} alt={name} />
      <div>
        <div className="name">{name}</div>
        <div className="role">{role}</div>
      </div>
    </div>
    <p className={highlight ? "highlight" : ""}>{quote}</p>
  </div>
);

const BHeroSection = () => {
  return (
    <section className="bhero-section">
      <div className="bhero-inner">
        {/* LEFT CARDS */}
       <FloatingCard className="floating-left-top">
  <QuoteCardContent
    img={Author1}
    name="Charles W.Eliot"
    role="American academic"
    quote="❝Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers❞"
  />
</FloatingCard>


        <FloatingCard className="floating-left-black">
          <QuoteCardContent
            img={Author2}
            name="Joseph Brodsky"
            quote="❝There are worse crimes than burning books. One of them is not reading them.❞"
      />
        </FloatingCard>

        {/* RIGHT CARDS */}
        <FloatingCard className="floating-right-light">
          <QuoteCardContent
            img={Author3}
            name="Haruki Murakami"
            role="Japanese writer"
            quote="❝If you only read the books that everyone else is reading, you can only think what everyone else is thinking❞"
          />
        </FloatingCard>

        <FloatingCard className="floating-right-purple">
          <QuoteCardContent
            img={Author4}
            name="William Nicholson"
            quote="❝We read to know we're not alone.❞"
          />
        </FloatingCard>

        {/* MAIN TEXT */}
        <h1 className="bhero-title">Read Your Way</h1>
        <h2 className="bhero-subtitle">A Better Way to Enjoy Books</h2>
        <h2 className="bhero-subtitle-muted">listen at your own pace.</h2>
        <h1 className="bhero-title">Designed for you</h1>
        <p className="bhero-text">
          Listen to audiobooks, adjust text spacing, and get book suggestions that match your pace.
        </p>

        {/* BUTTON */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button className="bhero-button">
            Browse Audiobooks <span>➺</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BHeroSection;
