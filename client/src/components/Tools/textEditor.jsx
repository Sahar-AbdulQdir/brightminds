import { useState } from "react";
import React from "react";

export default function GrammarChecker() {
  const [text, setText] = useState("");
  const [corrections, setCorrections] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkGrammar = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setCorrections([]);

    try {
      const res = await fetch("http://localhost:5000/api/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setCorrections(data.matches || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <h2>Grammar & Spelling Checker</h2>
      <textarea
        rows="6"
        placeholder="Type or paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />
      <button onClick={checkGrammar} disabled={loading} style={{ marginTop: "10px" }}>
        {loading ? "Checking..." : "Check Grammar"}
      </button>

      {corrections.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Suggestions:</h3>
          <ul>
            {corrections.map((c, idx) => (
              <li key={idx}>
                <strong>Issue:</strong> "{text.slice(c.offset, c.offset + c.length)}" <br />
                <strong>Suggestion:</strong> {c.replacements.map(r => r.value).join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
