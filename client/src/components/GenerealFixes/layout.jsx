import React from "react";

export default function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: `linear-gradient(90deg, #D2ACE8ff, #B5A6E9ff, #EDB9DCff, #FEFCFEff, #E4BCE4ff)`,
      }}
    >
      {children}
    </div>
  );
}
