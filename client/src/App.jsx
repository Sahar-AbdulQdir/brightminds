import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing.jsx";  
import Home from "./pages/Home.jsx";
import Podcasts from "./pages/Podcasts.jsx";
import AudioBooks from "./pages/BooksPage.jsx";
import ToolsResources from "./components/Tools/tools.jsx";
import Layout from "./components/GenerealFixes/layout.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import SavedPage from "./components/GenerealFixes/saved_db.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Layout><Home /></Layout>} />
        <Route path="/Podcasts" element={<Layout><Podcasts /></Layout>} />
        <Route path="/AudioBooks" element={<Layout><AudioBooks /></Layout>} />
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/tools" element={<Layout><ToolsResources /></Layout>} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/SavedPage" element={<Layout><SavedPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
