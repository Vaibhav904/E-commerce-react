import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddSpecial() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    url: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // =====================
  // HANDLE INPUT CHANGE
  // =====================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =====================
  // HANDLE IMAGE CHANGE
  // =====================
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // =====================
  // SUBMIT FORM
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("url", form.url);
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/special-products/store",
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
        alert(res.data.message);
        navigate("/specialproduct");
      }
    } catch (error) {
      console.error("Add special product error", error.response);
      alert("Something went wrong");
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
          <h2 className="dashboard-title mb-4">Add Special Product</h2>

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
                    required
                  />
                </div>

                {/* BUTTONS */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
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
