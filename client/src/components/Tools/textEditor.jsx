import { useState } from "react";
import React from "react";

export default function TextEditor() {
  const [text, setText] = useState("");
  const [simplified, setSimplified] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const simplifyText = async () => {
  if (!text.trim()) return;

  setLoading(true);
  setError("");
  setSimplified("");

  try {
    const response = await fetch("http://localhost:5000/api/simplify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || data.message || "Failed");

    setSimplified(data.simplifiedText);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <h2>AI Text Simplifier</h2>

      <textarea
        rows="6"
        placeholder="Paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <button
        onClick={simplifyText}
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        {loading ? "Simplifying..." : "Simplify"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {simplified && (
        <>
          <h3>Simplified Text</h3>
          <textarea
            rows="6"
            value={simplified}
            readOnly
            style={{ width: "100%", padding: "10px" }}
          />
        </>
      )}
    </div>
  );
}
