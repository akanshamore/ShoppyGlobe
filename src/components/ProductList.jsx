import { useProducts } from "../hooks/useProducts";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router";
import ProductItem from "./ProductItem";
import "./ProductList.css";

const ProductList = () => {
  const { products, loading, error, searchQuery, setSearchQuery } =
    useProducts();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleQuantityChange = (e, productId, newQuantity) => {
    e.stopPropagation();
    dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getCartItemQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            quantity={getCartItemQuantity(product.id)}
            onAddToCart={handleAddToCart}
            onQuantityChange={handleQuantityChange}
            onProductClick={handleProductClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
