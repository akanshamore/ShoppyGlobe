import { useProducts } from "../hooks/useProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router";

const ProductList = () => {
  const { products, loading, error, searchQuery, setSearchQuery } =
    useProducts();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
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
            <button onClick={(e) => handleAddToCart(e, product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
