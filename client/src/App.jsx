// Importing React and necessary routing components
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing pages and components
import LandingPage from "./pages/Landing.jsx";  
import Home from "./pages/Home.jsx";
import Podcasts from "./pages/Podcasts.jsx";
import AudioBooks from "./pages/BooksPage.jsx";
import ToolsResources from "./components/ToolsPage/tools.jsx";
import Layout from "./components/GenerealFixes/layout.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import SavedPage from "./components/GenerealFixes/saved_db.jsx";

// Main App component that handles routing
function App() {
  return (
    // Router wrapper for handling client-side navigation
    <Router>
      <Routes>
        {/* Home page wrapped in Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        {/* Podcasts page */}
        <Route path="/Podcasts" element={<Layout><Podcasts /></Layout>} />
        {/* AudioBooks page */}
        <Route path="/AudioBooks" element={<Layout><AudioBooks /></Layout>} />
        {/* Landing page without Layout */}
        <Route path="/landing" element={<LandingPage />} /> 
        {/* Tools page */}
        <Route path="/Tools" element={<Layout><ToolsResources /></Layout>} />
        {/* Authentication page */}
        <Route path="/auth" element={<AuthPage />} />
        {/* Saved items page */}
        <Route path="/SavedPage" element={<Layout><SavedPage /></Layout>} />
      </Routes>
    </Router>
  );
}

// Exporting the App component as default
export default App;
