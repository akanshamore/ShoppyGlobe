import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";

// load critical components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// Lazy load non-critical components
const ProductList = lazy(() => import("./components/ProductList"));
const Cart = lazy(() => import("./components/Cart"));
const Checkout = lazy(() => import("./components/Checkout"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const NotFound = lazy(() => import("./components/NotFound"));

// Home component with suspense wrapper for product listing
const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
};
//Main App component
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
