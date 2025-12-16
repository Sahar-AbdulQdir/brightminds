import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing.jsx";  
import Home from "./pages/Home.jsx";
import Podcasts from "./pages/Podcasts.jsx";
import Games from "./pages/games.jsx";
import Bloggy from "./pages/Bloggy.jsx";
import ToolsResources from "./components/Tools/tools.jsx";
import Layout from "./components/GenerealFixes/layout.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import SavedPage from "./components/GenerealFixes/saved_db.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/games" element={<Layout><Games /></Layout>} />
        <Route path="/podcasts" element={<Layout><Podcasts /></Layout>} />
        <Route path="/Bloggy" element={<Layout><Bloggy /></Layout>} />
        <Route path="/Landing" element={<LandingPage />} /> 
        <Route path="/tools" element={<Layout><ToolsResources /></Layout>} />
        <Route path="/auth" element={<AuthPage />} />
         <Route path="/SavedPage" element={<Layout><SavedPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
