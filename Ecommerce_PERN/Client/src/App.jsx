import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";
import {Toaster} from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme="forest">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
