import React, { useState } from "react";
import axios from "axios";

export default function VendorVerifyOtp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("vendorEmail");

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/vendor-verify-otp",
        {
          email: email,
          otp: otp,
        }
      );

      if (res.data.status) {
        setMessage("✅ OTP Verified Successfully");

        // 👉 clear temp email
        localStorage.removeItem("vendorEmail");

        // 👉 redirect to login
        // window.location.href = "/vendor-auth";
        window.location.href = "/vendor-login";

      }
    } catch (err) {
      setMessage("❌ " + err.response?.data?.message);
    }

    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Verify OTP</h3>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            className="form-control mb-3"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button className="btn btn-dark w-100" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-3 small">{message}</p>
        )}
      </div>
    </div>
  );
}