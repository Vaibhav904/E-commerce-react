import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  /* ================= CATEGORY ================= */
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");

  /* ================= PRODUCT ================= */
  const [form, setForm] = useState({
    name: "",
    description: "",
    product_status: "published",
    is_variant: 1,
  });

  /* ================= VARIANT ================= */
  const [variant, setVariant] = useState({
    sku: "",
    base_price: "",
    discount: "",
    stock: "",
    weight: "",
    dimensions: "",
  });

  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const loadData = async () => {
      await fetchCategories();
      await fetchProduct();
      setLoading(false);
    };

    loadData();
  }, []);

  /* ================= FETCH CATEGORIES ================= */
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/v1/category/categoryListing",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Category Fetch Error:", error);
    }
  };

  /* ================= FETCH PRODUCT ================= */
  const fetchProduct = async () => {
    try {
      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/products/show",
        { product_id: Number(id) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const p = res.data.data;

      /* PRODUCT */
      setForm({
        name: p.name || "",
        description: p.description || "",
        product_status: p.product_status || "published",
        is_variant: p.is_variant || 1,
      });

      /* CATEGORY */
      if (p.category?.sub) {
        setParentCategory(String(p.category.main.id));
        setChildCategory(String(p.category.sub.id));
      } else {
        setParentCategory(String(p.category?.main?.id || ""));
      }

      /* VARIANT */
      if (p.variants && p.variants.length > 0) {
        const v = p.variants[0];

        setVariant({
          sku: v.sku || "",
          base_price: v.base_price || v.price || "",
          discount: v.discount || "",
          stock: v.stock || "",
          weight: v.weight || "",
          dimensions: v.dimensions || "",
        });

        setOldImages(v.images || []);
      }
    } catch (error) {
      console.error("Product Fetch Error:", error);
    }
  };

  /* ================= HANDLERS ================= */
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (e) => {
    setVariant({ ...variant, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  /* ================= CATEGORY FILTER ================= */
  const parentCategories = categories.filter((c) => c.parent === 0);
  const childCategories = categories.filter(
    (c) => String(c.parent) === String(parentCategory)
  );

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("product_id", Number(id));
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("product_status", form.product_status);
    fd.append("is_variant", form.is_variant);

    fd.append(
      "category_id",
      childCategory ? Number(childCategory) : Number(parentCategory)
    );

    fd.append("variants[0][sku]", variant.sku);
    fd.append("variants[0][base_price]", variant.base_price);
    fd.append("variants[0][discount]", variant.discount);
    fd.append("variants[0][stock]", variant.stock);
    fd.append("variants[0][weight]", variant.weight);
    fd.append("variants[0][dimensions]", variant.dimensions);

    newImages.forEach((img) => {
      fd.append("variant_images[0][]", img);
    });

    try {
      await axios.post(
        "http://tech-shop.techsaga.live/api/v1/products/update",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product Updated Successfully ✅");
      navigate("/adminproducts");
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Update Failed ❌");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container mt-4">
          <h2>Edit Product</h2>

       <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">

  {/* PRODUCT NAME */}
  <label className="form-label">Product Name</label>
  <input
    className="form-control mb-3"
    name="name"
    value={form.name}
    onChange={handleFormChange}
    placeholder="Product Name"
    required
  />

  {/* CATEGORY */}
  <label className="form-label">Parent Category</label>
  <select
    className="form-control mb-3"
    value={parentCategory}
    onChange={(e) => {
      setParentCategory(e.target.value);
      setChildCategory("");
    }}
  >
    <option value="">Select Parent Category</option>
    {parentCategories.map((c) => (
      <option key={c.id} value={c.id}>
        {c.category_name}
      </option>
    ))}
  </select>

  <label className="form-label">Child Category</label>
  <select
    className="form-control mb-3"
    value={childCategory}
    onChange={(e) => setChildCategory(e.target.value)}
    disabled={!parentCategory}
  >
    <option value="">Select Child Category</option>
    {childCategories.map((c) => (
      <option key={c.id} value={c.id}>
        {c.category_name}
      </option>
    ))}
  </select>

  {/* DESCRIPTION */}
  <label className="form-label">Description</label>
  <textarea
    className="form-control mb-3"
    name="description"
    value={form.description}
    onChange={handleFormChange}
    placeholder="Description"
  />

  {/* VARIANT */}
  <h5 className="mt-3">Variant</h5>

  <label className="form-label">SKU</label>
  <input
    className="form-control mb-2"
    name="sku"
    value={variant.sku}
    onChange={handleVariantChange}
    placeholder="SKU"
  />

  <label className="form-label">Price</label>
  <input
    className="form-control mb-2"
    name="base_price"
    value={variant.base_price}
    onChange={handleVariantChange}
    placeholder="Price"
  />

  <label className="form-label">Discount</label>
  <input
    className="form-control mb-2"
    name="discount"
    value={variant.discount}
    onChange={handleVariantChange}
    placeholder="Discount"
  />

  <label className="form-label">Stock</label>
  <input
    className="form-control mb-2"
    name="stock"
    value={variant.stock}
    onChange={handleVariantChange}
    placeholder="Stock"
  />

  {/* IMAGES */}
  <label className="form-label">Product Images</label>
  <input
    type="file"
    multiple
    className="form-control mb-3"
    onChange={handleImageChange}
  />

  {/* OLD IMAGE PREVIEW */}
  <label className="form-label">Existing Images</label>
  <div className="d-flex gap-2 mb-3">
    {oldImages.map((img, i) => (
      <img
        key={i}
        src={img}
        alt=""
        width="60"
        height="60"
        style={{
          objectFit: "cover",
          borderRadius: "6px",
        }}
      />
    ))}
  </div>

  <button className="btn btn-primary px-5" type="submit">
    Update Product
  </button>

</form>

        </div>
      </div>
    </div>
  );
}
