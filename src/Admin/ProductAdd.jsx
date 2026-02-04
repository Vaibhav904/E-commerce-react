import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function ProductAdd() {
  const token = localStorage.getItem("token");

  /* ================= BASIC STATES ================= */
  const [name, setName] = useState("");
  const [productStatus, setProductStatus] = useState("published");
  const [isVariant, setIsVariant] = useState(1);
  const [description, setDescription] = useState("");

  /* ================= CATEGORY STATES ================= */
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");

  console.log('parentCategory', parentCategory);
  console.log('childCategory', childCategory);

  /* ================= VARIANT STATES ================= */
  const [sku, setSku] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");

  /* ================= ATTRIBUTES ================= */
  const [sizeValues, setSizeValues] = useState([{ label: "", value: "" }]);
  const [colorValues, setColorValues] = useState([{ label: "", value: "" }]);

  /* ================= IMAGES ================= */
  const [variantImages, setVariantImages] = useState([]);

  /* ================= CATEGORY API ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://tech-shop.techsaga.live/api/v1/category/categoryListing", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const parentCategories = categories.filter((c) => c.parent === 0);
  const childCategories = categories.filter((c) => c.parent == parentCategory);

  /* ================= ATTR HANDLERS ================= */
  const addRow = (setter, state) =>
    setter([...state, { label: "", value: "" }]);

  const removeRow = (setter, state, index) =>
    setter(state.filter((_, i) => i !== index));

  const handleAttrChange = (setter, state, index, field, value) => {
    const updated = [...state];
    updated[index][field] = value;
    setter(updated);
  };

  /* ================= SUBMIT ATTRIBUTES ================= */
  const submitAttributes = async () => {
    try {
      if (sizeValues.some((v) => v.label && v.value)) {
        const fd = new FormData();
        fd.append("name", "size");
        sizeValues.forEach((v) => {
          if (v.label && v.value) {
            fd.append("attribute_value[]", v.label);
            fd.append("values[]", v.value);
          }
        });
        await axios.post(
          "http://tech-shop.techsaga.live/api/v1/attribute/add",
          fd,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (colorValues.some((v) => v.label && v.value)) {
        const fd = new FormData();
        fd.append("name", "color");
        colorValues.forEach((v) => {
          if (v.label && v.value) {
            fd.append("attribute_value[]", v.label);
            fd.append("values[]", v.value);
          }
        });
        await axios.post(
          "http://tech-shop.techsaga.live/api/v1/attribute/add",
          fd,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= SUBMIT PRODUCT ================= */
const handleSubmit = async (e) => {
  e.preventDefault();

  const finalCategoryId = childCategory || parentCategory;

  if (!finalCategoryId) {
    alert("Please select category or sub category");
    return;
  }

  if (!sku || !basePrice || !stock) {
    alert("SKU, Base Price & Stock are required");
    return;
  }

  if (variantImages.length === 0) {
    alert("Please upload at least one product image");
    return;
  }

  const formData = new FormData();

  formData.append("name", name);
  formData.append("category_id", Number(parentCategory));
  formData.append("subcategory_id", Number(childCategory));
  formData.append("product_status", productStatus);
  formData.append("is_variant", isVariant);
  formData.append("description", description);

  formData.append("variants[0][sku]", sku);
  formData.append("variants[0][base_price]", basePrice);
  formData.append("variants[0][discount]", discount);
  formData.append("variants[0][stock]", stock);
  formData.append("variants[0][weight]", weight);
  formData.append("variants[0][dimensions]", dimensions);

  variantImages.forEach((file) =>
    formData.append("variant_images[0][]", file)
  );


  // console.log('formData', formData);
  try {
    await axios.post(
      "http://tech-shop.techsaga.live/api/v1/products/store",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    alert("Product Added Successfully ✅");
  } catch (err) {
    console.log(err.response.data);
    alert("Product Add Failed ❌");
  }
};


  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="dash-header w-100">
        <AdminHeader />
        <h2 className="dashboard-title">Add Product</h2>

        <div className="container mt-4">
          <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
            {/* BASIC */}
           <label className="form-label">Product Name</label>
<input
  className="form-control mb-3"
  placeholder="Product Name"
  onChange={(e) => setName(e.target.value)}
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

<label className="form-label">Description</label>
<textarea
  className="form-control mb-3"
  placeholder="Description"
  onChange={(e) => setDescription(e.target.value)}
/>

{/* VARIANT */}
<label className="form-label">SKU</label>
<input className="form-control mb-2" placeholder="SKU" onChange={(e) => setSku(e.target.value)} />

<label className="form-label">Base Price</label>
<input className="form-control mb-2" placeholder="Base Price" onChange={(e) => setBasePrice(e.target.value)} />

<label className="form-label">Discount</label>
<input className="form-control mb-2" placeholder="Discount" onChange={(e) => setDiscount(e.target.value)} />

<label className="form-label">Stock</label>
<input className="form-control mb-2" placeholder="Stock" onChange={(e) => setStock(e.target.value)} />

<label className="form-label">Variant Images</label>
<input
  type="file"
  multiple
  className="form-control mb-3"
  onChange={(e) => setVariantImages([...e.target.files])}
/>
            {/* SIZE */}
            <h5>Size</h5>
            {sizeValues.map((i, idx) => (
              <div className="d-flex gap-2 mb-2" key={idx}>
                <input
                  className="form-control"
                  placeholder="XL"
                  value={i.label}
                  onChange={(e) =>
                    handleAttrChange(
                      setSizeValues,
                      sizeValues,
                      idx,
                      "label",
                      e.target.value
                    )
                  }
                />
                <input
                  className="form-control"
                  placeholder="xl"
                  value={i.value}
                  onChange={(e) =>
                    handleAttrChange(
                      setSizeValues,
                      sizeValues,
                      idx,
                      "value",
                      e.target.value
                    )
                  }
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => addRow(setSizeValues, sizeValues)}
                >
                  +
                </button>
              </div>
            ))}

            {/* COLOR */}
            <h5>Color</h5>
            {colorValues.map((i, idx) => (
              <div className="d-flex gap-2 mb-2" key={idx}>
                <input
                  className="form-control"
                  placeholder="Red"
                  value={i.label}
                  onChange={(e) =>
                    handleAttrChange(
                      setColorValues,
                      colorValues,
                      idx,
                      "label",
                      e.target.value
                    )
                  }
                />
                <input
                  className="form-control"
                  placeholder="red"
                  value={i.value}
                  onChange={(e) =>
                    handleAttrChange(
                      setColorValues,
                      colorValues,
                      idx,
                      "value",
                      e.target.value
                    )
                  }
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => addRow(setColorValues, colorValues)}
                >
                  +
                </button>
              </div>
            ))}

            <button className="btn btn-primary mt-4 px-5" type="submit">
              Save Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
