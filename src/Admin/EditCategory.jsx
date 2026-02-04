import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [mode, setMode] = useState("main");
  const [categories, setCategories] = useState([]);
  const [isMainCategory, setIsMainCategory] = useState(true);

  const [formData, setFormData] = useState({
    category_name: "",
    category_id: "",
    file: null,
    oldImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ---------------- FETCH CATEGORY DETAILS ----------------
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://tech-shop.techsaga.live/api/v1/category/editCategory",
          { category_id: Number(id) },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data.data;
        const parents = res.data.parents || [];

        setCategories(parents);

        // Determine if MAIN or SUB
        const parentId = data.parent ?? 0;
        const autoMode = parentId === 0 ? "main" : "sub";

        setMode(autoMode);
        setIsMainCategory(parentId === 0);

        setFormData({
          category_name: data.title,
          category_id: autoMode === "sub" ? parentId : "",
          file: null,
          oldImage: data.img_path || null,
        });
      } catch (err) {
        console.error(err.response?.data);
        alert("Error loading category");
      }
    };

    fetchData();
  }, [id, token]);

  // ---------------- IMAGE CHANGE ----------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setErrors({});
    setFormData({ ...formData, file });
  };

  // ---------------- UPDATE CATEGORY ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category_name) {
      setErrors({ category_name: "Category name is required" });
      return;
    }
    if (!isMainCategory && !formData.category_id) {
      setErrors({ category_id: "Please select a parent category" });
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append("category_id", Number(id)); // update category ID
      form.append("category_name", formData.category_name);
      form.append(
        "parent",
        isMainCategory ? 0 : Number(formData.category_id) // parent must be number
      );

      if (formData.file) {
        form.append("category_img", formData.file);
      }

      await axios.post(
        "http://tech-shop.techsaga.live/api/v1/category/updateCategory",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Category Updated Successfully!");
      navigate("/order");
    } catch (error) {
      console.error(error.response?.data);
      alert(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="dash-header">
        <AdminHeader />
        <h2 className="dashboard-title">Edit Category / Subcategory</h2>

        <div className="container-fluid edit-cards">
          <div className="row gy-4">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Update Category</h5>
                </div>

                <div className="card-body">
                  {/* MODE SELECT - only for SUB category */}
                  {!isMainCategory && (
                    <Form.Select
                      className="mb-3"
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <option value="main">MAIN Category</option>
                      <option value="sub">SUB Category</option>
                    </Form.Select>
                  )}

                  <form onSubmit={handleSubmit}>
                    {/* Parent dropdown - only for SUB category */}
                    {!isMainCategory && mode === "sub" && (
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
                            .filter((cat) => cat.parent === 0)
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

                    {/* Name input */}
                    <div className="mb-3">
                      <label className="form-label">
                        {isMainCategory
                          ? "Category Name"
                          : mode === "sub"
                          ? "Subcategory Name"
                          : "Category Name"}
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

                    {/* Image */}
                    <Form.Group className="position-relative mb-3">
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>

                    <Button type="submit" disabled={loading}>
                      {loading ? "Updating..." : "Update"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* IMAGE PREVIEW */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Image Preview</h5>
                </div>
                <div className="card-body text-center">
                  {formData.file ? (
                    <img
                      src={URL.createObjectURL(formData.file)}
                      className="img-fluid rounded"
                      alt="Preview"
                    />
                  ) : formData.oldImage ? (
                    <img
                      src={formData.oldImage}
                      className="img-fluid rounded"
                      alt="Preview"
                    />
                  ) : (
                    <p className="text-muted">No Image Available</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
