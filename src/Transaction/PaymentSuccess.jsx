import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearBuyNowProduct } from "../Redux/buyNowSlice";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const hasVerified = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id"); // may be null
  const orderId =
    searchParams.get("order_id") ||
    localStorage.getItem("last_order_id");

  const token = localStorage.getItem("token");

  useEffect(() => {
    // ❌ already verified → stop
    if (hasVerified.current) return;

    // ❌ minimum requirement
    if (!token) {
      setLoading(false);
      return;
    }

    hasVerified.current = true;
    verifyPayment();
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/payment-success",
        {
          // order_id: orderId,
          session_id: sessionId || "", // optional
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.status === "success") {
        setPaymentData(res.data);

        // ✅ cleanup
        dispatch(clearBuyNowProduct());
        localStorage.removeItem("cart");
        localStorage.removeItem("last_order_id");
      }
    } catch (error) {
      console.error("Payment verification failed", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Verifying payment...
      </h2>
    );
  }

  if (!paymentData) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Payment verified, but no data found.
      </h2>
    );
  }

  return (
    <div className="payment-wrapper success">
      <FaRegCheckCircle size={80} color="#28a745" />
      <h2>Payment Successful 🎉</h2>

      <div className="payment-info">
        <p>
          <strong>Order ID:</strong> {paymentData.order_id}
        </p>
        <p>
          <strong>Amount:</strong> ₹{paymentData.amount}
        </p>
        <p>
          <strong>Currency:</strong> {paymentData.currency}
        </p>
        <p>
          <strong>Paid On:</strong> {paymentData.paid_on}
        </p>
        <p>
          <strong>Email:</strong> {paymentData.customer_email}
        </p>
      </div>

      {paymentData.invoice_url && (
        <button
          className="btn btn-outline-success"
          onClick={() => window.open(paymentData.invoice_url, "_blank")}
        >
          View Invoice
        </button>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;
