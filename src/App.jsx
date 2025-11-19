import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing.jsx";  
import Home from "./pages/Home.jsx";
import Podcasts from "./pages/Podcasts.jsx";
import Games from "./pages/games.jsx";
import BlogPage from "./pages/Blog.jsx";
import Bloggy from "./pages/Bloggy.jsx";
import Layout from "./components/GenerealFixes/layout.jsx";
import ToolsResources from "./components/Tools/tools.jsx";
function App() {
  return (
    <Router>
  <Routes>
  <Route path="/home" element={<Layout><Home /></Layout>} />
  <Route path="/games" element={<Layout><Games /></Layout>} />
  <Route path="/podcasts" element={<Layout><Podcasts /></Layout>} />
  <Route path="/Bloggy" element={<Layout><Bloggy /></Layout>} />
  <Route path="/Landing" element={<LandingPage />} /> 
  <Route path="/" element={<Layout><ToolsResources /></Layout>} />
  </Routes>
    </Router>
  );
}

export default App;

