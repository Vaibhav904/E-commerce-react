import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function BannerEdit() {
  const { id } = useParams(); // banner id from route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    status: 1,
  });

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // -----------------------------------
  // ✅ Fetch Single Banner (from list API)
  // -----------------------------------
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(
          "http://tech-shop.techsaga.live/api/v1/banners",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const banner = res.data.banners.find(
          (item) => item.id === parseInt(id)
        );

        if (banner) {
          setFormData({
            title: banner.title,
            url: banner.url,
            status: banner.status,
          });
          setOldImage(banner.image_url);
        }
      } catch (error) {
        console.error("Error fetching banner", error);
      }
    };

    fetchBanner();
  }, [id]);

  // -----------------------------------
  // ✅ Input Change
  // -----------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -----------------------------------
  // ✅ Submit Edit Banner
  // -----------------------------------
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = new FormData();
    data.append("banner_id", id);
    data.append("title", formData.title);
    data.append("url", formData.url);
    data.append("status", Number(formData.status));

    if (image) {
      data.append("image", image);
    }

    await axios.post(
      "http://tech-shop.techsaga.live/api/v1/banners/update",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Banner updated successfully");
    navigate("/bannerlisting");
  } catch (error) {
    console.error("Edit banner error", error);
    alert("Update failed");
  }

  setLoading(false);
};

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <h2 className="dashboard-title mb-4">Edit Banner</h2>

        <Form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Banner Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* URL */}
          <Form.Group className="mb-3">
            <Form.Label>Banner URL</Form.Label>
            <Form.Control
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Status */}
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

          {/* Image */}
          <Form.Group className="mb-3">
            <Form.Label>Banner Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            {oldImage && (
              <div className="mt-2">
                <img
                  src={oldImage}
                  alt="old-banner"
                  style={{ width: "200px", borderRadius: "6px" }}
                />
              </div>
            )}
          </Form.Group>

          {/* Submit */}
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Banner"}
          </Button>
        </Form>
      </div>
    </div>
  );
}
