import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageLogo from '../assets/Image/sign-in.jpg'

export default function VendorAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    business_name: "",
    gstin_no: "",
    gst_certificate: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
   const token = localStorage.getItem("token");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "gst_certificate") {
      setFormData({ ...formData, gst_certificate: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ================= LOGIN =================
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const res = await axios.post(
      "http://tech-shop.techsaga.live/api/vendor-login",
      {
        email: formData.email.trim(),
        password: formData.password.trim(),
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    console.log("RESPONSE 👉", res.data);

    if (res.data.status) {
      const token = res.data?.data?.token;

      if (token) {
        localStorage.setItem("vendorToken", token); // ✅ correct key
        console.log("TOKEN SAVED 👉", token);

        setMessage("✅ Login Successful");
        navigate("/vendor/dashboard");
      } else {
        setMessage("❌ Token not found");
      }
    }
  } catch (err) {
    console.log("ERROR 👉", err.response);

    // Laravel validation error show
    if (err.response?.status === 422) {
      const errors = err.response.data.errors;
      const firstError = Object.values(errors)[0][0];
      setMessage("❌ " + firstError);
    } else {
      setMessage("❌ " + err.response?.data?.message);
    }
  }

  setLoading(false);
};
  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {

      const form = new FormData();

      // Required fields
      form.append("first_name", formData.first_name);
      form.append("last_name", formData.last_name);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("confirm_password", formData.confirm_password);
      form.append("phone_number", formData.phone_number);

      // Optional fields
      if (formData.business_name)
        form.append("business_name", formData.business_name);

      if (formData.gstin_no) form.append("gstin_no", formData.gstin_no);

      if (formData.gst_certificate)
        form.append("gst_certificate", formData.gst_certificate);

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/vendor-register",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.status) {
        setMessage("✅ Registration Successful");

        // 👉 email save (OTP page ke liye)
        localStorage.setItem("vendorEmail", formData.email);
        // navigate('/vendor/dashboard')
        // 👉 redirect to OTP page
        window.location.href = "/vendor-verify-otp";
      }
    } catch (err) {
      console.log(err.response);
      setMessage("❌ " + err.response?.data?.message);
    }

    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center my-5 align-items-center h-100">
      <div className="row align-items-center">
        <div className="col-md-6">
            <img src={imageLogo} alt="" />
        </div>
        <div className="col-md-6">
            <div className="card p-4 shadow login-vendor">
              <h3 className="text-center mb-3">
                {isLogin ? "Vendor Login" : "Vendor Register"}
              </h3>

              <form onSubmit={isLogin ? handleLogin : handleRegister}>
                {/* REGISTER FIELDS */}
                {!isLogin && (
                  <>
                    <div className="row">
                      <div className="col-6">
                        <input
                          type="text"
                          name="first_name"
                          placeholder="First Name"
                          className="form-control mb-2"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Last Name"
                          className="form-control mb-2"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-12">
                        <input
                          type="text"
                          name="phone_number"
                          placeholder="Phone Number"
                          className="form-control mb-2"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* COMMON FIELDS */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control mb-2"
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control mb-2"
                  onChange={handleChange}
                  required
                />

                {!isLogin && (
                  <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    className="form-control mb-2"
                    onChange={handleChange}
                    required
                  />
                )}

                {/* OPTIONAL FIELDS */}
                {!isLogin && (
                  <>
                    <input
                      type="text"
                      name="business_name"
                      placeholder="Business Name (Optional)"
                      className="form-control mb-2"
                      onChange={handleChange}
                    />

                    <input
                      type="text"
                      name="gstin_no"
                      placeholder="GSTIN No (Optional)"
                      className="form-control mb-2"
                      onChange={handleChange}
                    />
                    <label className="mb-2" htmlFor="file">
                      Gst Certificate
                    </label>
                    <input
                      type="file"
                      name="gst_certificate"
                      placeholder="Upload gst_certificate "
                      className="form-control mb-2"
                      onChange={handleChange}
                    />
                  </>
                )}

                <button className="btn btn-dark w-100 mt-2" disabled={loading}>
                  {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
                </button>
              </form>

              {message && <p className="text-center mt-3 small">{message}</p>}

              <hr />

              <p className="text-center">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <span
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setMessage("");
                  }}
                >
                  {" "}
                  {isLogin ? "Register" : "Login"}
                </span>
              </p>
            </div>
            </div>
      </div>
      
    </div>
  );
}
