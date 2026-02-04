import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function AddCategory() {
  const [mode, setMode] = useState("main"); // main OR sub
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    category_name: "",
    category_id: "",
    file: null, // Image for both main & sub
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch Category list for Subcategory dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://tech-shop.techsaga.live/api/v1/category/categoryListing",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(res.data.data);
      } catch (err) {
        console.log("Error Fetching Categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setErrors({});
    setFormData({ ...formData, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ------------------------
    // VALIDATION
    // ------------------------
    if (!formData.category_name) {
      setErrors({ category_name: "Category name is required" });
      return;
    }
    if (!formData.file) {
      setErrors({ file: "Image is required" });
      return;
    }
    if (mode === "sub" && !formData.category_id) {
      setErrors({ category_id: "Please select a parent Category" });
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const form = new FormData();
      form.append("category_name", formData.category_name);
      form.append("category_img", formData.file);
      form.append(
        "parent",
        mode === "main" ? 0 : formData.category_id // 0 for main, parent id for sub
      );

      await axios.post(
        "http://tech-shop.techsaga.live/api/v1/category/storeCategory",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(
        mode === "main"
          ? "Main Category added successfully"
          : "Subcategory added successfully"
      );

      // RESET
      setFormData({
        category_name: "",
        category_id: "",
        file: null,
      });
      setErrors({});
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header">
        <AdminHeader />
        <Outlet />
        <h2 className="dashboard-title">Add Category / Subcategory</h2>

        <div className="container-fluid edit-cards">
          <div className="row gy-4">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">
                    Select Mode & Fill Information
                  </h5>
                </div>

                <div className="card-body">
                  {/* MODE SELECT */}
                  <Form.Select
                    className="mb-3"
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                  >
                    <option value="main">Add MAIN Category</option>
                    <option value="sub">Add SUB Category</option>
                  </Form.Select>

                  <form onSubmit={handleSubmit}>
                    {/* SUB CATEGORY PARENT SELECT */}
                    {mode === "sub" && (
                      <>
                        <Form.Select
                          className="mb-3"
                          value={formData.category_id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category_id: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Parent Category</option>
                          {categories
                            .filter((cat) => cat.parent === 0) // only main categories
                            .map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.category_name}
                              </option>
                            ))}
                        </Form.Select>

                        {errors.category_id && (
                          <div className="text-danger mb-2">
                            {errors.category_id}
                          </div>
                        )}
                      </>
                    )}

                    {/* CATEGORY NAME */}
                    <div className="mb-3">
                      <label className="form-label">
                        {mode === "main" ? "Category Name" : "Subcategory Name"}
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.category_name ? "is-invalid" : ""
                        }`}
                        value={formData.category_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category_name: e.target.value,
                          })
                        }
                      />
                      {errors.category_name && (
                        <div className="invalid-feedback">
                          {errors.category_name}
                        </div>
                      )}
                    </div>

                    {/* IMAGE */}
                    <Form.Group className="position-relative mb-3">
                      <Form.Label>
                        Upload {mode === "main" ? "Category" : "Subcategory"}{" "}
                        Image
                      </Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        isInvalid={!!errors.file}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.file}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* PREVIEW */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Image Preview</h5>
                </div>
                <div className="card-body text-center">
                  <img
                    src={
                      formData.file
                        ? URL.createObjectURL(formData.file)
                        : "https://via.placeholder.com/250"
                    }
                    className="img-fluid rounded"
                    alt="Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
