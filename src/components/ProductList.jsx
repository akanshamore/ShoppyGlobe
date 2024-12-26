import { useProducts } from "../hooks/useProducts";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router";
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
        {products.map((product) => {
          const quantity = getCartItemQuantity(product.id);
          return (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="price">${product.price}</p>
              <p className="brand">Brand: {product.brand}</p>
              <p className="rating">Rating: {product.rating}⭐</p>
              <p className="stock">Stock: {product.stock}</p>
              <p className="category">Category: {product.category}</p>

              {quantity === 0 ? (
                <button onClick={(e) => handleAddToCart(e, product)}>
                  Add to Cart
                </button>
              ) : (
                <div className="quantity-controls">
                  <button
                    onClick={(e) =>
                      handleQuantityChange(e, product.id, quantity - 1)
                    }
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={(e) =>
                      handleQuantityChange(e, product.id, quantity + 1)
                    }
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
