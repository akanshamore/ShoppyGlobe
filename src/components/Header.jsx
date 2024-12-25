import { Link } from "react-router";
import "./Header.css";
import logo from "../assets/logo.svg"; // You'll need to add this logo image to your assets folder

export const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="ShoppyGlobe Logo" />
        <h2>ShoppyGlobe</h2>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
};
