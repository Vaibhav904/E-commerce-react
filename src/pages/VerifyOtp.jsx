import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const statedata = location.state;

  console.log('statedata', statedata);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("OTP is required");
      return;
    }

    // ✅ NO API CALL (backend me route hi nahi hai)
    // Direct reset password page open
    navigate("/reset-password", {
      state: { statedata },
    });
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <h3 className="text-center mb-4">Verify OTP</h3>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleVerify}>
                <Form.Group className="mb-4">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  style={{ background: "black", border: "none" }}
                >
                  Verify OTP
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyOtp;
