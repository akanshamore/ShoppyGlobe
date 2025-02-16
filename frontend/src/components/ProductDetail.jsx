import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../redux/slices/cartSlice";
import { useNavigate, useParams } from "react-router";
import "./ProductDetail.css";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const cartItems = useSelector((state) => state.cart.items);

  // Check if the product exists in the cart and get its quantity
  const cartItem = cartItems.find((item) => item.id === Number(id));
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1);
  };

  // Fetch product details from API when the component is mounted
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch product (${response.status})`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e, productId, newQuantity) => {
    e.stopPropagation();
    if (newQuantity >= 0) {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }
  };

  // Add product to the cart with an initial quantity of 1
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="error-container">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  // Display a message if the product is not found
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <button className="back-button" onClick={handleBack}>
        ← Back
      </button>
      <div className="product-detail-container">
        <div className="product-images">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="main-image"
          />
          <div className="image-gallery">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title} ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="brand">Brand: {product.brand}</p>
          <p className="price">Price: ${product.price}</p>
          <p className="rating">Rating: {product.rating}⭐</p>
          <p className="description">{product.description}</p>
          <p className="category">Category: {product.category}</p>

          {quantityInCart === 0 ? (
            <button className="add-to-cart" onClick={(e) => handleAddToCart(e)}>
              Add to Cart
            </button>
          ) : (
            <div className="quantity-controls">
              <button
                onClick={(e) =>
                  handleQuantityChange(e, product.id, quantityInCart - 1)
                }
                disabled={quantityInCart <= 0}
              >
                -
              </button>
              <span>{quantityInCart}</span>
              <button
                onClick={(e) =>
                  handleQuantityChange(e, product.id, quantityInCart + 1)
                }
              >
                +
              </button>
            </div>
          )}

          <div className="additional-info">
            <h3>Additional Information</h3>
            <p>SKU: {product.sku}</p>
            <p>Warranty: {product.warrantyInformation}</p>
            <p>Shipping: {product.shippingInformation}</p>
            <p>Return Policy: {product.returnPolicy}</p>

            <h3>Reviews</h3>
            <div className="reviews">
              {product.reviews?.map((review, index) => (
                <div key={index} className="review">
                  <p>Rating: {review.rating}⭐</p>
                  <p>{review.comment}</p>
                  <p>By: {review.reviewerName}</p>
                  <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
