import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Category from "./Pages/Categories";
import Popular from "./Pages/Popular";
import Collections from "./Pages/Collections";
import About from "./Pages/About";
import MobileView from "./Pages/MobileView";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <main className="pt-16"> {/* Padding so content isn’t hidden behind navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/mobile" element={<MobileView />} />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={
              <div className="text-center py-20 text-white text-2xl">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
