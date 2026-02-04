import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearBuyNowProduct } from "../Redux/buyNowSlice";

export default function Ordersum({ selectedAddress }) {
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(false);

  const buyNowProduct = useSelector((state) => state.buyNow?.product || null);

  // console.log("buyNowProduct", checkoutData);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  /* ================= CART CHECKOUT ================= */
  const fetchCheckout = async () => {
    try {
      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/checkout",
        { is_quick: false },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCheckoutData(res.data);
    } catch (err) {
      console.error("Checkout error", err);
    }
  };

  /* ================= SET CHECKOUT DATA ================= */
  useEffect(() => {
    if (buyNowProduct) {
      const price = Number(buyNowProduct.price) || 0;
      const qty = buyNowProduct.quantity || 1;

      setCheckoutData({
        items: [
          {
            id: buyNowProduct.id,
            product: buyNowProduct.name,
            price: price,
            quantity: qty,
            total: price * qty,
            image:
              buyNowProduct.image ||
              buyNowProduct.image_url ||
              buyNowProduct.thumbnail ||
              buyNowProduct.product_image ||
              "https://cdn-icons-png.flaticon.com/512/30/30543.png",
          },
        ],
        subtotal: price * qty,
        offerdiscount: 0,
        taxes: 0,
        shipping: 0,
        total: price * qty,
      });
    } else {
      fetchCheckout();
    }
  }, [buyNowProduct]);

  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    if (!selectedAddress?.id) {
      alert("Please select shipping address");
      return;
    }

    setLoading(true);

    try {
      const isQuickOrder = Boolean(buyNowProduct);

      // 1️⃣ PLACE ORDER
      const { data: orderData } = await axios.post(
        "http://tech-shop.techsaga.live/api/place-order",
        {
          is_quick: isQuickOrder,
          address_id: selectedAddress.id,
          total: checkoutData.total,

          // ⚠️ total sirf BUY NOW ke liye
          ...(isQuickOrder && {
            product_id: checkoutData?.items?.[0]?.id,
            quantity: checkoutData?.items?.[0]?.quantity,
          }),
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (orderData?.order_id) {
        localStorage.setItem("last_order_id", String(orderData.order_id));
      }

      // 🔥 CART FALLBACK FIX
      const finalAmount =
        Number(orderData.amount) > 0
          ? Number(orderData.amount)
          : Number(checkoutData.total);

      const stripeAmount = finalAmount;

      // 2️⃣ STRIPE CHECKOUT
      const { data } = await axios.post(
        "http://tech-shop.techsaga.live/api/create-checkout-session",
        {
          amount: stripeAmount,
          order_id: orderData.order_id,
          url: window.location.origin,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      window.location.href = data.url;
    } catch (err) {
      console.error("Payment error", err.response?.data || err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CLEAR BUY NOW ================= */
  useEffect(() => {
    return () => {
      dispatch(clearBuyNowProduct());
    };
  }, []);

  return (
    <div className="right-side">
      <h5 className="section-title mb-4">
        {buyNowProduct ? "Buy Now Order Summary" : "Cart Order Summary"}
      </h5>

      {/* PRODUCTS */}
      {checkoutData?.items?.map((item, index) => (
        <div className="product-summary d-flex align-items-center" key={index}>
          <div className="product-thumb position-relative">
            <span className="quantity-bubble">{item.quantity}</span>
            <img src={item.image} alt={item.product} />
          </div>

          <div className="product-info">
            <p className="mb-0">{item.product}</p>
            <small>₹{item.price}</small>
          </div>

          <div className="product-price">₹{item.total}</div>
        </div>
      ))}

      {/* TOTALS */}
      {checkoutData && (
        <div className="order-totals">
          <div className="totals">
            <span>Subtotal</span>
            <span>₹{checkoutData.subtotal}</span>
          </div>
          <div className="totals">
            <span>Discount</span>
            <span>₹{checkoutData.offerdiscount}</span>
          </div>
          <div className="totals">
            <span>GST</span>
            <span>₹{checkoutData.taxes}</span>
          </div>
          <div className="totals">
            <span>Shipping</span>
            <span>₹{checkoutData.shipping}</span>
          </div>
          <div className="totals total">
            <strong>Total</strong>
            <strong>₹{checkoutData.total}</strong>
          </div>
        </div>
      )}

      {/* PAY BUTTON */}
      <button
        onClick={handlePlaceOrder}
        className="btn-shop-pay mt-4"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay & Place Order"}
      </button>
    </div>
  );
}
