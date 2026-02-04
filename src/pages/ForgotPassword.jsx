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
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/forgot-password",
        { email },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.status) {
        navigate("/verify-otp", { state: { data: res?.data } });
      } else {
        setError(res.data.message?.email?.[0] || res.data.message);
      }
    } catch (err) {
      setError("Something went wrong ❌");
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
              <h3 className="text-center mb-4">Forgot Password</h3>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  disabled={loading}
                  style={{ background: "black", border: "none" }}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
