import { Link } from "react-router";
import "./Header.css";
import logo from "../assets/logo.svg"; // You'll need to add this logo image to your assets folder
import { useSelector } from "react-redux";

export const Header = () => {
  // Retrieve cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.items);
  // Calculate the total number of items in the cart
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <header className="header">
      <Link to="/" className="logo">
        <div className="logo">
          <img src={logo} alt="ShoppyGlobe Logo" />
          <h2>ShoppyGlobe</h2>
        </div>
      </Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart {cartItemCount}</Link>
      </nav>
    </header>
  );
};
