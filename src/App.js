import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";  // Import Box for styling
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import ContactPage from "./pages/Contact";
import ProductDetails from "./pages/Productdetails";
import Rodolphe from "./pages/Rodolphe";
import HowToSell from "./pages/HowToSell";

const App = () => (
  <Router>
   
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/rodolphe-meyer" element={<Rodolphe />} />
        <Route path="/comment-vendre" element={<HowToSell />} />
      </Routes>
  </Router>
);

export default App;
