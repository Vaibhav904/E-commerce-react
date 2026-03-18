import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCartFromApi } from "../Redux/CartSlice";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const cartItems = useSelector((state) => state.cart.cart);

  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setApiError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/user-auth",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      if (res.data.status) {
        setSuccessMessage("Login successful ✅");

        const token = res.data?.data?.token;
        const userData = res.data.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("name", userData.name);

        // 🛒 Redux cart → API cart sync
        // 🛒 Guest cart → API sync

        // console.log('cartItems', cartItems);
        if (cartItems.length > 0) {
          for (const item of cartItems) {
            try {
              await axios.post(
                "http://tech-shop.techsaga.live/api/cart/add",
                {
                  product_id: item.product_id || item.variant_id,
                  quantity: item.quantity,
                  variant_attribute_id: item.variant_attribute_id,
                  variant_id: item.variant_id,
                },
                {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
            } catch (cartErr) {
              console.log("Cart sync error:", cartErr.response?.data);
            }
          }
        }

        // ✅ 🔥 MOST IMPORTANT STEP (missing in your code)
        try {
          const cartRes = await axios.post(
            "http://tech-shop.techsaga.live/api/cart/view",
            {},
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          );

          // ✅ Redux update with API cart
          dispatch(setCartFromApi(cartRes.data.cart));
        } catch (err) {
          console.log("Fetch cart error:", err);
        }

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setApiError(res.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.log("FULL ERROR:", error.response);

      if (error.response?.status === 401) {
        setApiError("Invalid email or password ❌");
      } else if (error.response?.status === 403) {
        setApiError(error.response?.data?.message || "Access Forbidden ❌");
      } else {
        setApiError(error.response?.data?.message || "Server error ❌");
      }
    } finally {
      setIsLoading(false);
    }
  };

  {
    successMessage && <Alert variant="success">{successMessage}</Alert>;
  }

  {
    apiError && <Alert variant="danger">{apiError}</Alert>;
  }

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-md-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h3>Welcome Back</h3>
                <p>Sign in to your account</p>
              </div>

              {apiError && <Alert variant="danger">{apiError}</Alert>}

              <Form onSubmit={handleLogin}>
                {/* EMAIL */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* PASSWORD */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="text-end mb-3">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>

                <Button
                  type="submit"
                  className="w-100"
                  disabled={isLoading}
                  style={{ background: "black", border: "none" }}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p>
                  Don't have an account?{" "}
                  <Link to="/sign-up">Create Account</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
