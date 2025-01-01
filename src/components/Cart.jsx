import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CartItem from "./CartItem";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  // Navigate to the checkout page when the "Proceed to Checkout" button is clicked

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Calculate the total cost of all items in the cart, factoring in their quantity and price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
            <button onClick={handleCheckout} className="checkout-button">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
