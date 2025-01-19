import React from "react";
import "./ProductItem.css";

const ProductItem = ({
  product, // Product data
  quantity, // Quantity of the product in the cart
  onAddToCart,
  onQuantityChange,
  onProductClick,
}) => {
  return (
    <div className="product-card" onClick={() => onProductClick(product.id)}>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
      <p className="brand">Brand: {product.brand}</p>
      <p className="rating">Rating: {product.rating} ⭐</p>
      <p className="stock">Stock: {product.stock}</p>
      <p className="category">Category: {product.category}</p>

      {/* Add to Cart or Quantity Controls */}
      {quantity === 0 ? (
        <button onClick={(e) => onAddToCart(e, product)}>Add to Cart</button>
      ) : (
        <div className="quantity-controls">
          <button
            onClick={(e) => onQuantityChange(e, product.id, quantity - 1)}
            disabled={quantity <= 0}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={(e) => onQuantityChange(e, product.id, quantity + 1)}
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
