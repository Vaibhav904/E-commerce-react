import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, decreaseQty, setCartFromApi } from "../Redux/CartSlice";
import axios from "axios";

export default function Addcart({ open, close }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [countdown, setCountdown] = useState(246);
  const [cartData, setCartData] = useState(null);

  // console.log("cartData", cartData);

  const [cartList, setCartList] = useState([]);
  // console.log("cartData", cartData);
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

  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}m ${seconds}s`;
  };

  // const handleIncrease = (item) => {
  //   dispatch(addToCart(item));
  // };

  // const handleDecrease = (id) => {
  //   dispatch(decreaseQty(id));
  // };

  const cartItems = useSelector((state) => state.cart.cart);
  // const subtotal = useSelector((state) =>
  //   state.cart.cart.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   )
  // );

  const apiSubtotal =
    cartData?.reduce(
      (total, item) => total + Number(item.price) * Number(item.quantity),
      0
    ) || 0;
  const reduxSubtotal = useSelector((state) =>
    state.cart.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
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
        }
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

  const removeCartItem = async (cartId) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("cart_id", cartId);

      await axios.post(
        "http://tech-shop.techsaga.live/api/cart/remove",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      fetchCart(); // 🔁 cart refresh
    } catch (error) {
      console.log("Remove error:", error.response?.data || error.message);
    }
  };

  // ======================
  // UPDATE QUANTITY
  // ======================
  const updateCartQuantity = async (ProductId, quantity) => {
    if (quantity < 1) return;

    try {
      const formData = new FormData();
      formData.append("product_id", ProductId);
      formData.append("quantity", quantity);

      await axios.post(
        "http://tech-shop.techsaga.live/api/cart/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      fetchCart(); // refresh list
    } catch (err) {
      console.log("Update error:", err.response?.data || err);
    }
  };

  // ======================
  // BUTTON HANDLERS
  // ======================
  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrease = (id) => {
    console.log('id', id);
    dispatch(decreaseQty(id));
  };

  // useEffect(() => {
  //   if (token) fetchCartItems();
  // }, [token]);

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
        {/* Header */}
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
          {cartItems?.map((item, index) => (
            <div className="cart-item" key={item.id}>
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
                          updateCartQuantity(
                            item.product_id,
                            item.quantity - 1
                          );
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
                          updateCartQuantity(
                            item.product_id,
                            item.quantity + 1
                          );
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
                    onClick={() => removeCartItem(item.id)}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Recommendation */}
          {/* <div className="recommendation-section">
            <div className="recommendation-header">
              <h6 className="mb-0">
                <strong>Frequently bought together</strong>
              </h6>
              <span className="discount-badge">10% OFF</span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-check-circle text-success me-2"></i>
              <p className="mb-0 small">
                Add both to cart and get <strong>10% OFF</strong> on each
                product
              </p>
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
          </div> */}

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
              {/* <strong>₹{subtotal.toFixed(2)}</strong> */}
              <strong>
                ₹{(token ? apiSubtotal : reduxSubtotal).toFixed(2)}
              </strong>
            </div>
            <div className="d-flex justify-content-between align-items-center small text-muted">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
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
