import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentFailed = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [sessionData, setSessionData] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      cancelPayment();
    } else {
      setErrorMessage("Invalid payment session");
      setLoading(false);
    }
  }, []);

  const cancelPayment = async () => {
    try {
      // 🔥 FORM DATA (Backend compatible)
      const formData = new FormData();
      formData.append("session_id", sessionId);

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/payment-cancel",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.status === "error") {
        setErrorMessage(res.data.message);
        setSessionData(res.data.stripe_session);
      } else {
        setErrorMessage("Payment failed");
      }
    } catch (error) {
      setErrorMessage("Unable to process payment cancellation");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Loader
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Processing payment cancellation...</h2>;
  }

  // ❌ Failed UI
  return (
    <div className="payment-wrapper failed">
      <h2>Payment Failed ❌</h2>

      <p>{errorMessage}</p>

      {sessionData?.id && (
        <p><strong>Session ID:</strong> {sessionData.id}</p>
      )}

      <div className="shop-all">
        <button onClick={() => navigate("/checkout")}>
          Try Again
        </button>

        <button onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
