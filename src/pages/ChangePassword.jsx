import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;  


  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  

  if (!oldPassword || !newPassword || !confirmPassword) {
    setError("All fields are required");
    return;
  }

  if (newPassword !== confirmPassword) {
    setError("New password and confirm password do not match");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("user_id", user?.user_id);// ✅ FIX HERE
    formData.append("old_password", oldPassword);
    formData.append("new_password", newPassword);
    formData.append("confirm_password", confirmPassword);

    const res = await axios.post(
      "http://tech-shop.techsaga.live/api/v1/changeUserPassword",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ already correct
          Accept: "application/json",
        },
      }
    );

    if (res.data.status) {
      setSuccess(res.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setError(res.data.message || "Password update failed");
    }
  } catch (err) {
    if (err.response?.status === 401) {
      setError("Unauthorized. Please login again ❌");
    } else {
      setError("Something went wrong ❌");
    }
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
                <h3>Change Password</h3>
                <p>Update your account password</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                {/* OLD PASSWORD */}
                <Form.Group className="mb-3">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Form.Group>

                {/* NEW PASSWORD */}
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>

                {/* CONFIRM PASSWORD */}
                <Form.Group className="mb-4">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
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
                  {loading ? "Updating..." : "Change Password"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
