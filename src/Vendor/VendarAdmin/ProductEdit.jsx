import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const vendorToken = localStorage.getItem("vendorToken");
  const [loading, setLoading] = useState(true);

  /* ================= BASIC ================= */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isVariant, setIsVariant] = useState(false);

  /* ================= CATEGORY ================= */
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");

  /* ================= VARIANTS ================= */
  const createDefaultVariant = () => ({
    id: null,
    sku: "",
    base_price: "",
    discount: "",
    stock: "",
    weight: "",
    dimensions: "",
    images: [],
    oldImages: [],
    attr: {
      size: "",
      color: [""], // ✅ array
    },
  });

  const [variants, setVariants] = useState([createDefaultVariant()]);

  /* ================= LOAD ================= */
  useEffect(() => {
    const loadData = async () => {
      await fetchCategories();
      await fetchProduct();
      setLoading(false);
    };
    loadData();
  }, []);

  /* ================= FETCH CATEGORY ================= */
  const fetchCategories = async () => {
    const res = await axios.get(
      "http://tech-shop.techsaga.live/api/v1/category/categoryListing", 
      {  headers: {
            Authorization: `Bearer ${vendorToken}`,
            "Content-Type": "application/json",
          }, }
    );
    setCategories(res.data.data || []);
    setAttributes(res.data.attributes || []);
  };

  /* ================= FETCH PRODUCT ================= */
  const fetchProduct = async () => {
    const res = await axios.post(
      "http://tech-shop.techsaga.live/api/v1/vendor/products/show",
      { product_id: Number(id) },
      {
        headers: {
            Authorization: `Bearer ${vendorToken}`,
            "Content-Type": "application/json",
          },
      }
    );

    const p = res.data.data;

    setName(p.name || "");
    setDescription(p.description || "");
    setIsVariant(p.is_variant == 1);

    if (p.category?.sub) {
      setParentCategory(String(p.category.main.id));
      setChildCategory(String(p.category.sub.id));
    } else {
      setParentCategory(String(p.category?.main?.id || ""));
    }

    if (p.variants?.length > 0) {
      const mapped = p.variants.map((v) => {
        let sizeId = "";
        let colorIds = [];

        v.attributes?.forEach((attr) => {
          if (attr.name?.toLowerCase() === "size") {
            sizeId = String(attr.value_id);
          }
          if (attr.name?.toLowerCase() === "color") {
            colorIds.push(String(attr.value_id));
          }
        });

        return {
          id: v.id,
          sku: v.sku || "",
          base_price: v.price || "",
          discount: v.discount || "",
          stock: v.stock || "",
          weight: v.weight || "",
          dimensions: v.dimensions || "",
          images: [],
          oldImages: v.image || [],
          attr: {
            size: sizeId,
            color: colorIds.length ? colorIds : [""],
          },
        };
      });

      setVariants(mapped);
    }
  };

  /* ================= HANDLERS ================= */

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleAttrChange = (index, field, value) => {
    const updated = [...variants];
    updated[index].attr[field] = value;
    setVariants(updated);
  };

  const handleColorChange = (variantIndex, colorIndex, value) => {
    const updated = [...variants];
    updated[variantIndex].attr.color =
      updated[variantIndex].attr.color.map((c, i) =>
        i === colorIndex ? value : c
      );
    setVariants(updated);
  };

  const addColorField = (variantIndex) => {
    const updated = [...variants];
    updated[variantIndex].attr.color.push("");
    setVariants(updated);
  };

  const removeColorField = (variantIndex, colorIndex) => {
    const updated = [...variants];
    updated[variantIndex].attr.color.splice(colorIndex, 1);
    setVariants(updated);
  };

  const handleImages = (index, files) => {
    const updated = [...variants];
    updated[index].images = [...files];
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, createDefaultVariant()]);
  };

  /* ================= DELETE IMAGE ================= */

  const deleteVariantImage = async (imageId, variantIndex) => {
    await axios.post(
      "http://tech-shop.techsaga.live/api/v1/products/variant-image/delete",
      { image_id: imageId },
      {  headers: {
            Authorization: `Bearer ${vendorToken}`,
            "Content-Type": "application/json",
          }, },
    );

    const updated = [...variants];
    updated[variantIndex].oldImages =
      updated[variantIndex].oldImages.filter((img) => img.id !== imageId);

    setVariants(updated);
  };

  /* ================= SUBMIT ================= */

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  // ✅ FIX 1: correct key name
  formData.append("product_id", id);

  formData.append("name", name);
  formData.append("description", description);

  formData.append(
    "category_id",
    childCategory ? Number(childCategory) : Number(parentCategory)
  );

  formData.append("is_variant", isVariant ? 1 : 0);

  variants.forEach((v, i) => {
    // ✅ IMPORTANT for update
    if (v.id) {
      formData.append(`variants[${i}][id]`, v.id);
    }

    formData.append(`variants[${i}][sku]`, v.sku || "");
    formData.append(`variants[${i}][price]`, Number(v.base_price) || 0);
    formData.append(`variants[${i}][discount]`, Number(v.discount) || 0);
    formData.append(`variants[${i}][stock]`, Number(v.stock) || 0);
    formData.append(`variants[${i}][weight]`, v.weight || "");
    formData.append(`variants[${i}][dimensions]`, v.dimensions || "");

    // ✅ SIZE
    if (v.attr?.size) {
      formData.append(`variants[${i}][attr][2]`, Number(v.attr.size));
    }

    // ✅ COLOR
    if (v.attr?.color?.filter(Boolean).length > 0) {
      v.attr.color.forEach((c) => {
        formData.append(`variants[${i}][attr][1][]`, Number(c));
      });
    }

    // ✅ IMAGES (optional)
    if (v.images?.length > 0) {
      v.images.forEach((img) => {
        formData.append(`variant_images[${i}][]`, img);
      });
    }
  });

  try {
    await axios.post(
      "http://tech-shop.techsaga.live/api/v1/vendor/products/update",
      formData,
      {
        headers: {
          Authorization: `Bearer ${vendorToken}`,
          "Content-Type": "multipart/form-data", // ✅ FIX 2
        },
      }
    );

    alert("Product Updated Successfully ✅");
    navigate("/vendor/products");
  } catch (error) {
    console.log("ERROR:", error.response?.data);
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

  const parentCategories = categories.filter((c) => c.parent === 0);
  const childCategories = categories.filter(
    (c) => String(c.parent) === String(parentCategory)
  );

  const sizeAttribute = attributes.find(
    (a) => a.name?.toLowerCase() === "size"
  );

  const colorAttribute = attributes.find(
    (a) => a.name?.toLowerCase() === "color"
  );

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="dash-header w-100">
        <AdminHeader />
        <div className="container mt-4">
          <h2>V Edit Product</h2>

          <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
            <input
              className="form-control mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
            />
            

            <select
              className="form-control mb-3"
              value={parentCategory}
              onChange={(e) => {
                setParentCategory(e.target.value);
                setChildCategory("");
              }}
            >
              <option value="">Parent Category</option>
              {parentCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.category_name}
                </option>
              ))}
            </select>

            <select
              className="form-control mb-3"
              value={childCategory}
              onChange={(e) => setChildCategory(e.target.value)}
              disabled={!parentCategory}
            >
              <option value="">Child Category</option>
              {childCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.category_name}
                </option>
              ))}
            </select>

            <textarea
              className="form-control mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            {variants.map((v, i) => (
              <div key={i} className="border p-3 mb-3 rounded">
                <input
                  className="form-control mb-2"
                  value={v.sku}
                  onChange={(e) =>
                    handleVariantChange(i, "sku", e.target.value)
                  }
                  placeholder="SKU"
                />

                <Form.Select
                  value={v.attr.size}
                  onChange={(e) =>
                    handleAttrChange(i, "size", e.target.value)
                  }
                  className="mb-2"
                >
                  <option value="">Select Size</option>
                  {sizeAttribute?.values?.map((val) => (
                    <option key={val.id} value={String(val.id)}>
                      {val.value}
                    </option>
                  ))}
                </Form.Select>

                {v.attr.color.map((colorValue, colorIndex) => (
                  <div key={colorIndex} className="d-flex mb-2 gap-2">
                    <Form.Select
                      value={colorValue}
                      onChange={(e) =>
                        handleColorChange(i, colorIndex, e.target.value)
                      }
                    >
                      <option value="">Select Color</option>
                      {colorAttribute?.values?.map((val) => (
                        <option key={val.id} value={String(val.id)}>
                          {val.value}
                        </option>
                      ))}
                    </Form.Select>

                    {v.attr.color.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeColorField(i, colorIndex)}
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-sm btn-secondary mb-2"
                  onClick={() => addColorField(i)}
                >
                  + Add Color
                </button>

                <input
                  type="file"
                  multiple
                  className="form-control"
                  onChange={(e) => handleImages(i, e.target.files)}
                />
              </div>
            ))}

            <button className="btn btn-primary w-100">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}