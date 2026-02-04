import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  // 👉 user_id OTP verify ke baad pass hona chahiye
  // example: navigate("/reset-password", { state: { user_id } })
  const location = useLocation();
  const dataState = location.state.statedata.data;
//   console.log("location", dataState);
  const user_id = dataState?.user_id;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!user_id) {
      setError("Invalid request. User not found ❌");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("password", password);
      formData.append("confirm_password", confirmPassword);

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/create-newpassword",
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (res.data.status) {
        setSuccess(res.data.message);

        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(res.data.message || "Password reset failed ❌");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h3>Reset Password</h3>
                <p>Create your new password</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleReset}>
                {/* NEW PASSWORD */}
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {/* CONFIRM PASSWORD */}
                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  disabled={loading}
                  style={{ background: "black", border: "none" }}
                >
                  {loading ? "Updating..." : "Reset Password"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <small>Password reset via OTP verification</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
