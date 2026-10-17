// Importing React and necessary routing components
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing pages and components
import LandingPage from "./pages/Landing.jsx";  
import Home from "./pages/Home.jsx";
import Podcasts from "./pages/Podcasts.jsx";
import AudioBooks from "./pages/BooksPage.jsx";
import ToolsResources from "./components/Toolspage/tools.jsx";
import Layout from "./components/GenerealFixes/layout.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import SavedPage from "./components/GenerealFixes/saved_db.jsx";
import "./styles/colors.css";

// Main App component that handles routing
function App() {
  return (
    // Router wrapper for handling client-side navigation
    <Router>
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/Podcasts" element={<Layout><Podcasts /></Layout>} />
  <Route path="/AudioBooks" element={<Layout><AudioBooks /></Layout>} />
  <Route path="/landing" element={<LandingPage />} />
  <Route path="/Tools" element={<Layout><ToolsResources /></Layout>} />
  <Route path="/auth" element={<AuthPage />} />
  <Route path="/SavedPage" element={<Layout><SavedPage /></Layout>} />
</Routes>
    </Router>
  );
}

// Exporting the App component as default
export default App;
