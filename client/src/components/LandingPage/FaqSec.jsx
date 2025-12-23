import React, { useState } from "react";
import "../../components/LandingPage/LandingPageStyles/faq.css";
import faqImg from "../../assets/images/faq.png";
const faqs = [
  {
    q: "Can I save audiobooks, podcasts, or articles I like?",
    a: "Yes. Tap the save icon and your favourites will be easy to find later.",
  },
  {
    q: "Can I change the text style to make reading easier?",
    a: "Yes. Use the accessibility panel to adjust font size, spacing, and line height.",
  },
  {
    q: "Does the website support listening instead of reading?",
    a: "Yes. You can turn text into speech, or speech into text, using our tools.",
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
