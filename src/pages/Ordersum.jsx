import React from 'react';

export default function Ordersum() {
  return (
    <div className="right-side">
      <h5 className="section-title mb-4">
        <i className="fas fa-shopping-bag section-title-icon"></i>Order Summary
      </h5>

      <div className="product-summary d-flex align-items-center">
        <div className="product-thumb position-relative">
          <div className="quantity-bubble">7</div>
          <img src="https://cdn-icons-png.flaticon.com/512/30/30543.png" alt="Sunglasses" />
        </div>
        <div className="product-info">
          <p className="product-name mb-0">Cateye sunglasses</p>
          <p className="product-desc mb-0">Black • Size: Standard</p>
        </div>
        <div className="product-price">$69.30</div>
      </div>

      <div className="order-totals">
        <div className="giftcard-input input-group mb-4">
          <input type="text" className="form-control" placeholder="Gift card or discount code" />
          <button className="btn" type="button">Apply</button>
        </div>

        <div className="totals">
          <div className="label">Subtotal</div>
          <div className="value">$69.30</div>
        </div>
        <div className="totals">
          <div className="label">Shipping</div>
          <div className="text-muted">Enter shipping address</div>
        </div>
        <div className="totals">
          <div className="label">Estimated taxes</div>
          <div className="value">$6.93</div>
        </div>
        <div className="total-container">
          <div>Total</div>
          <div>
            <span className="total-currency">USD</span>
            <span>$76.23</span>
          </div>
        </div>
      </div>
    </div>
  );
}
