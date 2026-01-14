import React from "react";
import "../../styles/colors.css" // Import color variables

// Layout component wraps pages with full-height gradient background
export default function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh", // Full viewport height
        padding: "2rem", // Inner spacing
        background: `linear-gradient(90deg, var(--sh1), var(--sh2), var(--sh3), var(--sh4), var(--sh5))`, // Horizontal gradient
      }}
    >
      {children} {/* Render child components inside layout */}
    </div>
  );
}
