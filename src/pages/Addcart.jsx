import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";


export default function Addcart({open, close}) {
     const [quantity, setQuantity] = useState(1);
      const [countdown, setCountdown] = useState(246);
       const navigate = useNavigate();
       const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
   const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}m ${seconds}s`;
  };
  return (
    <>
          <div className={`over-low transition-all ${
          open ? "d-block" : "d-none"
        }`}>  </div>
      <div className={`cart-container transition-all ${
          open ? "d-block" : "d-none"
        }`} >
        {/* Header */}
        <div className="cart-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="fas fa-shopping-cart me-2"></i>Shopping Cart
            </h5>
            <span className="close-icon "  onClick={close} aria-label="Close">
              &times;
            </span>
          </div>

          <div className="urgency-bar d-flex align-items-center mt-2">
            <span className="me-2">
              <i className="fas fa-fire"></i>
            </span>
            <small>
              These products are limited, checkout within
              <strong className="countdown"> {formatCountdown()}</strong>
            </small>
          </div>

          <p className="mb-2 mt-2">
            Buy <strong>$290.10</strong> more for <strong>FREE Shipping</strong>
          </p>

          <div className="progress-container">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "22%" }}
                aria-valuenow="22"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="star-badge">
              <i className="fas fa-star"></i>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="cart-body">
          {/* Cart Item */}
          <div className="cart-item">
            <div className="d-flex gap-3">
              <img
                src="https://fashion.minimog.co/cdn/shop/products/15.1a.jpg?v=1708672061&width=360"
                alt="Cateye sunglasses"
                className="product-img"
              />
              <div className="flex-grow-1">
                <strong>Cateye sunglasses</strong>
                <div className="text-muted small">Color: Black</div>
                <h5 className="mt-1 text-primary">$9.90</h5>
                <div className="quantity-control mt-2">
                  <button className="quantity-btn" onClick={decreaseQty}>
                    −
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    min="1"
                    max="99"
                    readOnly
                  />
                  <button className="quantity-btn" onClick={increaseQty}>
                    +
                  </button>
                </div>
                <button className="remove-btn mt-2">
                  <i className="fas fa-trash-alt me-1"></i> Remove
                </button>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="recommendation-section">
            <div className="recommendation-header">
              <h6 className="mb-0">
                <strong>Frequently bought together</strong>
              </h6>
              <span className="discount-badge">10% OFF</span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-check-circle text-success me-2"></i>
              <p className="mb-0 small">
                Add both to cart and get <strong>10% OFF</strong> on each product
              </p>
            </div>

            <div className="recommended-item">
              <img
                src="https://fashion.minimog.co/cdn/shop/products/15.1a.jpg?v=1708672061&width=360"
                alt="Mini dress"
                className="recommended-img"
              />
              <div className="flex-grow-1">
                <div className="fw-medium">Mini dress with ruffled straps</div>
                <div className="text-primary fw-bold">$14.90</div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-2 colo-sel">
          <Form.Select aria-label="Default select example">
      <option value="1">Black</option>
      <option value="2">Red</option>
      <option value="3">Three</option>
    </Form.Select>
              <button type="button" className="btn-add">
                Add to Cart
              </button>
               </div>
         

            <div className="carousel-controls">
              <small className="text-muted me-auto">1/3</small>
              <button type="button" className="carousel-btn">
                &lt;
              </button>
              <button type="button" className="carousel-btn">
                &gt;
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button type="button" className="action-btn">
              <i className="fas fa-pencil-alt"></i> Note
            </button>
            <button type="button" className="action-btn">
              <i className="fas fa-truck"></i> Shipping
            </button>
            <button type="button" className="action-btn">
              <i className="fas fa-ticket-alt"></i> Coupon
            </button>
          </div>

          {/* Summary */}
          <div className="summary">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Subtotal</span>
              <strong>$9.90</strong>
            </div>
            <div className="d-flex justify-content-between align-items-center small text-muted">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            <i className="fas fa-lock me-2"></i> Proceed to Checkout
          </button>

          <div className="view-cart">
            <a href="#" className="view-cart-link">
              View Cart Details
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
