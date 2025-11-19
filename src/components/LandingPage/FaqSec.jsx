import React, { useState } from "react";
import "../../styles/LandingPageStyles/faq.css";
import faqImg from "../../assets/L-faq.png";
const faqs = [
  {
    q: "How can I save my favourite podcast or article?",
    a: "Simply click the 'Save' icon under the content you like, and it will appear in your saved section.",
  },
  {
    q: "Can I track my progress over time?",
    a: "Yes! Your learning history and puzzle scores are automatically stored.",
  },
  {
    q: "Is there a mobile app version?",
    a: "Yes, BrainBoost mobile is available on iOS and Android.",
  },
];

const FaqSec = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="faq-section">
      <div className="faqTop">
      <h2>Any Concerns?</h2>
      <img src={faqImg} alt="Podcast" className="podcast-img" />
      </div>
      <div className="faq-container">
        {faqs.map((faq, i) => (
          <div key={i} className="faq-card">
            <div className="faq-question" onClick={() => toggleFAQ(i)}>
              <span>{faq.q}</span>
              <span className="faq-icon">{openIndex === i ? "✖" : "➺"}</span>
            </div>
            {openIndex === i && <p className="faq-answer">{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSec;
