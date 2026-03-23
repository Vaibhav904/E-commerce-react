import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentData, setPaymentData] = useState(null);

  const hasVerified = useRef(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!sessionId) {
          setError("Invalid payment session.");
          return;
        }

        const response = await axios.post(
          "http://tech-shop.techsaga.live/api/payment-success",
          { session_id: sessionId },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPaymentData(response.data);
      } catch (err) {
        console.log("Backend error:", err.response?.data);
        setError(err.response?.data?.message || "Payment failed.");
      } finally {
        setLoading(false);
      }
    };

    if (!hasVerified.current) {
      hasVerified.current = true;
      verifyPayment();
    }
  }, [sessionId, token]);
  console.log("my session id",sessionId);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "green" }}>Payment Successful</h1>

      {paymentData && (
        <>
          <p><strong>Order ID:</strong> {paymentData.order_id}</p>
          <p><strong>Amount:</strong> ₹{paymentData.amount}</p>
          <p><strong>Currency:</strong> {paymentData.currency}</p>
          <p><strong>Paid On:</strong> {paymentData.paid_on}</p>
          <p><strong>Email:</strong> {paymentData.customer_email}</p>

         <div className="my-4">

          <a
          
            href={paymentData.invoice_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Download Invoice
          </a>
          <div className="my-5">
          <Link to="/"className="p_link">
            Back to home page
          </Link>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;