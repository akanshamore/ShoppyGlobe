import { Link } from "react-router";
import "./Header.css";
import logo from "../assets/logo.svg"; // You'll need to add this logo image to your assets folder
import { useSelector } from "react-redux";

export const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="ShoppyGlobe Logo" />
        <h2>ShoppyGlobe</h2>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart {cartItemCount}</Link>
      </nav>
    </header>
  );
};
