import React, { useState } from "react";
import axios from "axios";
import signup from "../assets/Image/sign-up.gif";

export default function SignUp() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // OTP STATES
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ===============================
  // VALIDATION
  // ===============================
  const validate = () => {
    const newErrors = {};
   if (!form.first_name.trim())
  newErrors.first_name = "First name is required";

if (!form.last_name.trim())
  newErrors.last_name = "Last name is required";

    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone_number) newErrors.phone_number = "Phone is required";
    if (!form.password || form.password.length < 8)
      newErrors.password = "Min 8 characters required";
    if (form.password !== form.confirm_password)
      newErrors.confirm_password = "Passwords do not match";
    return newErrors;
  };

  // ===============================
  // SIGNUP SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/user-register",
        formData
      );

      if (res.data.status) {
        setShowOtpModal(true); // OPEN OTP POPUP
      } else {
        setErrors(res.data.message || {});
      }
    } catch (err) {
      alert("Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // VERIFY OTP
  // ===============================
  const handleVerifyOtp = async () => {
    if (!otp) {
      setOtpError("OTP is required");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const formData = new FormData();
      formData.append("first_name", form.first_name);
formData.append("last_name", form.last_name);
      formData.append("email", form.email);
      formData.append("otp", otp);

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/verify-otp",
        formData
      );

      if (res.data.status) {
        alert("Account verified successfully 🎉");
        setShowOtpModal(false);
        setOtp("");
        setForm({
           first_name: "",
           last_name: "",
          email: "",
          phone_number: "",
          password: "",
          confirm_password: "",
        });
      } else {
        setOtpError(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      setOtpError("OTP verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-wrapper">
          <div className="signup-left">
            <h2>Create Account</h2>
            <p>Create your account and start shopping today.</p>
            <img src={signup} alt="signup" />
          </div>

          <div className="signup-right">
            <form onSubmit={handleSubmit} className="signup-form">
             <div className="input-group">
    <input
      type="text"
      name="first_name"
      value={form.first_name}
      onChange={handleChange}
      placeholder="First Name"
    />
    <span>{errors.first_name}</span>
  </div>

  <div className="input-group">
    <input
      type="text"
      name="last_name"
      value={form.last_name}
      onChange={handleChange}
      placeholder="Last Name"
    />
    <span>{errors.last_name}</span>
  </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
              <span className="error">{errors.email}</span>

              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={form.phone_number}
                onChange={handleChange}
              />
              <span className="error">{errors.phone_number}</span>

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <span className="error">{errors.password}</span>

              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={form.confirm_password}
                onChange={handleChange}
              />
              <span className="error">{errors.confirm_password}</span>

              <button className="signup-button" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= OTP MODAL ================= */}
      {showOtpModal && (
        <div className="otp-modal">
          <div className="otp-box">
            <h3>Verify OTP</h3>
            <p>OTP sent to <b>{form.email}</b></p>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {otpError && <span className="error">{otpError}</span>}

            <button onClick={handleVerifyOtp} disabled={otpLoading}>
              {otpLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
