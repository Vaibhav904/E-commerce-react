import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function Updatepassword() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ CHANGE PASSWORD API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // validation
    if (formData.new_password !== formData.confirm_password) {
      alert("New password and confirm password do not match");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("old_password", formData.old_password);
      data.append("new_password", formData.new_password);
      data.append("confirm_password", formData.confirm_password);

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/changeAdminPassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password updated successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error.response?.data || error);
      alert(error.response?.data?.message || "Password update failed");
    }

    setLoading(false);
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mb-4">
          <h2 className="dashboard-title mb-4">Update Password</h2>

          <Form
            className="card mx-auto p-4"
            onSubmit={handleSubmit}
            style={{ maxWidth: "600px" }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                name="old_password"
                value={formData.old_password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}