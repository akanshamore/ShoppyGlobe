import { useEffect, useState } from "react";

import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./redux/slices/counterSlice";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";

const Home = () => {
  return (
    <div>
      <ProductList />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
