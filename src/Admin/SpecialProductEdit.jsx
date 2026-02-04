import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

export default function SpecialProductEdit() {
  const { id } = useParams(); // route: /edit/:id
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    url: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // ======================
  // FETCH SINGLE PRODUCT
  // ======================
  const fetchProduct = async () => {
    try {
      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/special-products/show",
        { product_id: id },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        const data = res.data.data;
        setForm({
          title: data.title,
          url: data.url,
        });
        setPreview(data.image_url);
      }
    } catch (error) {
      console.error("Fetch product error", error.response);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // ======================
  // HANDLE INPUT CHANGE
  // ======================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // HANDLE IMAGE CHANGE
  // ======================
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  // ======================
  // UPDATE PRODUCT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("title", form.title);
    formData.append("url", form.url);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/special-products/update",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert(res.data.message || "Product updated successfully");
        navigate("/specialproduct");
      }
    } catch (error) {
      console.error("Update product error", error.response);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          <h2 className="dashboard-title mb-4">Edit Special Product</h2>

          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* TITLE */}
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* URL */}
                <div className="mb-3">
                  <label className="form-label">Redirect URL</label>
                  <input
                    type="url"
                    name="url"
                    className="form-control"
                    value={form.url}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* IMAGE */}
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  {preview && (
                    <img
                      src={preview}
                      alt="preview"
                      className="mt-2"
                      width="150"
                    />
                  )}
                </div>

                {/* BUTTONS */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/specialproduct")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
