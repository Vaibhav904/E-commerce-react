import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function AddBanner() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    status: 1,
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -----------------------------
  // ✅ ADD BANNER (NO banner_id)
  // -----------------------------
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!image) {
    alert("Please select banner image");
    setLoading(false);
    return;
  }

  try {
    const data = new FormData();
    data.append("title", formData.title); // ✅ required
    data.append("image", image);          // ✅ required (NOT banner_image)
    data.append("url", formData.url);
    data.append("status", Number(formData.status));

    const res = await axios.post(
      "http://tech-shop.techsaga.live/api/v1/banners/store",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Banner added successfully");
    navigate("/subcategory");
  } catch (error) {
    console.error(error.response?.data || error);
    alert("Banner add failed");
  }

  setLoading(false);
};


  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />
   <div className="container">
         <h2 className="dashboard-title mb-4">Add Banner</h2>

        <Form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Banner Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Form.Group>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Banner"}
          </Button>
        </Form>
   </div>
      </div>
    </div>
  );
}
