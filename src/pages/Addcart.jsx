import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  decreaseQty,
  removeFromCart,
  setCartFromApi,
} from "../Redux/CartSlice";
import axios from "axios";

export default function Addcart({ open, close }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [countdown, setCountdown] = useState(246);
  const [cartData, setCartData] = useState(null);
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  // console.log("cartData", cartData);

  const [cartList, setCartList] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // ✅ TOKEN

  const handleCheckout = () => {
    close(false);

    if (!token) {
      navigate("/login", {
        state: { from: "/checkout" },
      });
    } else {
      navigate("/checkout");
    }
  };

  // const formatCountdown = () => {
  //   const minutes = Math.floor(countdown / 60);
  //   const seconds = countdown % 60;
  //   return `${minutes}m ${seconds}s`;
  // };

  const applyCoupon = async () => {
    if (!couponCode) {
      setCouponMessage("Please enter coupon code");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("coupon_code", couponCode);

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/coupon/apply",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      console.log("coupon response", res.data);

      if (res.data.success) {
        setDiscount(res.data.discount_amount || 0);
        setCouponMessage("Coupon Applied Successfully");
      } else {
        setCouponMessage(res.data.message || "Invalid Coupon");
      }
    } catch (error) {
      console.log("Coupon error", error.response?.data || error);
      setCouponMessage("Coupon failed");
    }
  };
  const cartItems = useSelector((state) => state.cart.cart);

  // const apiSubtotal =
  //   cartData?.reduce(
  //     (total, item) => total + Number(item.price) * Number(item.quantity),
  //     0,
  //   ) || 0;
  const reduxSubtotal = useSelector((state) =>
    state.cart.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ),
  );

  const fetchCart = async () => {
    try {
      if (!token) return;

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/cart/view",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log("res", res?.data?.cart);

      // ⚠️ adjust if backend sends data.cart
      dispatch(setCartFromApi(res.data.cart));
      setCartData(res?.data?.cart || null);
    } catch (error) {
      console.error("Fetch cart error", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeCartItem = async (item) => {
    // if (!token) {
    //   dispatch(removeFromCart(item.product_id));
    //   return;
    // }

    // 🔥 AGAR TOKEN NAHI HAI (Guest User)
    if (!token) {
      dispatch(removeFromCart(item));
      return;
    }

    try {
      const formData = new FormData();

      // safest way
      const cartId = item.cart_id || item.id;

      formData.append("cart_id", cartId);

      await axios.post(
        "http://tech-shop.techsaga.live/api/cart/remove",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      fetchCart();
    } catch (error) {
      console.log("Remove error:", error.response?.data || error);
    }
  };
  // ======================
  // UPDATE QUANTITY
  // ======================
  const updateCartQuantity = async (item, newQty) => {
    if (newQty < 1) return;

    try {
      const formData = new FormData();
      const cartId = item.cart_id || item.id;

      formData.append("cart_id", cartId);
      formData.append("quantity", newQty);

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/cart/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const updatedQty = Number(res.data.data.quantity);

      // 🔥 IMPORTANT FIX
      dispatch(
        setCartFromApi(
          cartItems.map((c) =>
            (c.cart_id || c.id) === cartId
              ? {
                  ...c,
                  quantity: updatedQty,
                }
              : c,
          ),
        ),
      );
    } catch (err) {
      console.log("Update error:", err.response?.data || err);
    }
  };

  const handleIncrease = (item) => {
    const updatedItem = { ...item, quantity: 1 }; // Set quantity to 1
    // console.log("updatedItem with quantity 1:", updatedItem);
    dispatch(addToCart(updatedItem)); // Dispatch updatedItem with quantity 1
  };

  const handleDecrease = (id) => {
    console.log("id", id);
    dispatch(decreaseQty(id));
  };

  return (
    <>
      <div className={`over-low transition-all ${open ? "d-block" : "d-none"}`}>
        {" "}
      </div>
      <div
        className={`cart-container transition-all ${
          open ? "d-block" : "d-none"
        }`}
      >
        <div className="cart-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="fas fa-shopping-cart me-2"></i>Shopping Cart
            </h5>
            <span className="close-icon " onClick={close} aria-label="Close">
              &times;
            </span>
          </div>

          <div className="urgency-bar d-flex align-items-center mt-2">
            <span className="me-2">
              <i className="fas fa-fire"></i>
            </span>
            <small>
              These products are limited, checkout
              {/* <strong className="countdown"> {formatCountdown()}</strong> */}
            </small>
          </div>

          {/* <p className="mb-2 mt-2">
            Buy <strong>$290.10</strong> more for <strong>FREE Shipping</strong>
          </p> */}

          {/* <div className="progress-container">
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
          </div> */}
        </div>

        <div className="cart-body">
          {cartItems?.map((item) => (
            <div
              className="cart-item"
              key={item.cart_id || item.id || item.product_id}
            >
              <div className="d-flex gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="product-img"
                />

                <div className="flex-grow-1">
                  <strong>{item.title}</strong>
                  <h5 className="mt-1 cart-price">₹{item.price}</h5>

                  <div className="quantity-control mt-2 d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-secondary"
                      disabled={item.quantity <= 1}
                      onClick={() => {
                        if (token) {
                          updateCartQuantity(item, item.quantity - 1);
                        } else {
                          handleDecrease(item.product_id);
                        }
                      }}
                    >
                      −
                    </button>

                    <input
                      type="number"
                      className="form-control text-center"
                      value={item.quantity}
                      readOnly
                      style={{ width: "60px" }}
                    />

                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        if (token) {
                          updateCartQuantity(item, item.quantity + 1);
                        } else {
                          handleIncrease(item);
                        }
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn mt-2"
                    onClick={() => removeCartItem(item)}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="action-buttons justify-content-end">
            <button
              type="button"
              className="action-btn"
              onClick={() => setShowCoupon(!showCoupon)}
            >
              <i className="fas fa-ticket-alt"></i> Coupon
            </button>
          </div>

          {showCoupon && (
            <div className="coupon-box mt-3">
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />

                <button className="btn btn-dark" onClick={applyCoupon}>
                  Apply
                </button>
              </div>

              {couponMessage && (
                <small className="text-success">{couponMessage}</small>
              )}
            </div>
          )}

          {/* Summary */}
          <div className="summary">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Subtotal</span>
              {/* <strong>₹{subtotal.toFixed(2)}</strong> */}
              <strong>₹{reduxSubtotal.toFixed(2)}</strong>
            </div>
            <div className="d-flex justify-content-between align-items-center small text-muted">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            {discount > 0 && (
              <div className="d-flex justify-content-between align-items-center text-success">
                <span>Discount</span>
                <strong>- ₹{discount}</strong>
              </div>
            )}
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            <i className="fas fa-lock me-2"></i> Proceed to Checkout
          </button>

          {/* <div className="view-cart">
            <a href="#" className="view-cart-link">
              View Cart Details
            </a>
          </div> */}
        </div>
      </div>
    </>
  );
}
