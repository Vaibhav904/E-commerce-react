import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function ProductAdd() {
  const token = localStorage.getItem("token");

  /* ================= BASIC ================= */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [productStatus, setProductStatus] = useState("published");
  const [isVariant, setIsVariant] = useState(false);

  /* ================= CATEGORY ================= */
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");

  /* ================= VARIANTS ================= */
const [variants, setVariants] = useState([
  {
    sku: "",
    base_price: "",
    discount: "",
    stock: "",
    weight: "",
    dimensions: "",
    images: [],
    attr: {
      size: "",
      color: [""],   // must be array
    },
  },
]);

const handleColorChange = (variantIndex, colorIndex, value) => {
  const updated = [...variants];
  updated[variantIndex] = {
    ...updated[variantIndex],
    attr: {
      ...updated[variantIndex].attr,
      color: updated[variantIndex].attr.color.map((c, i) =>
        i === colorIndex ? value : c
      ),
    },
  };
  setVariants(updated);
};

const addColorField = (variantIndex) => {
  const updated = [...variants];
  updated[variantIndex] = {
    ...updated[variantIndex],
    attr: {
      ...updated[variantIndex].attr,
      color: [...updated[variantIndex].attr.color, ""],
    },
  };
  setVariants(updated);
};

  const removeColorField = (variantIndex, colorIndex) => {
    const updated = [...variants];
    updated[variantIndex].attr.color.splice(colorIndex, 1);
    setVariants(updated);
  };

 

  console.log("variants", variants);

  /* ================= CATEGORY API ================= */
  useEffect(() => {
    axios
      .get("http://tech-shop.techsaga.live/api/v1/category/categoryListing", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCategories(res.data.data);
        setAttributes(res.data.attributes);
      })
      .catch(console.error);
  }, []);

  const parentCategories = categories.filter((c) => c.parent === 0);
  const childCategories = categories.filter((c) => c.parent == parentCategory);

  const sizeAttribute = attributes?.find(
    (a) => a?.name?.toLowerCase() === "size",
  );

  const colorAttribute = attributes?.find(
    (a) => a?.name?.toLowerCase() === "color",
  );

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

  const handleOtherChange = (index, type, field, value) => {
    const updated = [...variants];
    updated[index][type][field] = value;
    setVariants(updated);
  };

  const handleImages = (index, files) => {
    const updated = [...variants];
    updated[index].images = [...files];
    setVariants(updated);
  };

const addVariant = () => {
  setVariants([
    ...variants,
    {
      sku: "",
      base_price: "",
      discount: "",
      stock: "",
      weight: "",
      dimensions: "",
      images: [],
      attr: {
        size: "",
        color: [""],   // fresh array every time
      },
    },
  ]);
};

  /* ================= CREATE ATTRIBUTE ================= */

  const createAttributeValue = async (attrName, label, value) => {
    const fd = new FormData();
    fd.append("name", attrName);
    fd.append("attribute_value[]", label);
    fd.append("values[]", value);

    const res = await axios.post(
      "http://tech-shop.techsaga.live/api/v1/attribute/add",
      fd,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return res.data?.data?.attribute_value_id;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category_id", parentCategory);
    formData.append("subcategory_id", childCategory);
    formData.append("product_status", productStatus);
    formData.append("is_variant", isVariant ? 1 : 0);
    formData.append("description", description);

    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];

      let sizeId = v.attr.size;

      // SIZE OTHER CHECK (if you use it later)
      if (v.attr.size === "other") {
        sizeId = await createAttributeValue(
          v.otherSize.name,
          v.otherSize.label,
          v.otherSize.value,
        );
      }

      formData.append(`variants[${i}][sku]`, v.sku);
      formData.append(`variants[${i}][base_price]`, v.base_price);
      formData.append(`variants[${i}][discount]`, v.discount);
      formData.append(`variants[${i}][stock]`, v.stock);
      formData.append(`variants[${i}][weight]`, v.weight);
      formData.append(`variants[${i}][dimensions]`, v.dimensions);

      // ✅ SIZE (Single)
      if (sizeId) {
        formData.append(`variants[${i}][attr][2]`, Number(sizeId));
      }

      // ✅ COLOR (Multiple)
      if (v.attr.color?.length > 0) {
        v.attr.color.forEach((colorId) => {
          if (colorId) {
            formData.append(`variants[${i}][attr][1][]`, Number(colorId));
          }
        });
      }

      // ✅ IMAGES
      v.images.forEach((img) => {
        formData.append(`variant_images[${i}][]`, img);
      });
    }

    try {
      await axios.post(
        "http://tech-shop.techsaga.live/api/v1/products/store",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      alert("Product Added Successfully ✅");
    } catch (err) {
      console.log(err.response?.data);
      alert("Product Add Failed ❌");
    }
  };

  /* ================= JSX ================= */

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="dash-header w-100">
        <AdminHeader />
        <h2 className="dashboard-title">Add Product</h2>
        <div className="container mt-4">
          <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
            {/* PRODUCT NAME */}
            <input
              className="form-control mb-3"
              placeholder="Product Name"
              onChange={(e) => setName(e.target.value)}
            />

            {/* CATEGORY */}
            <select
              className="form-control mb-3"
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
              disabled={!parentCategory}
              onChange={(e) => setChildCategory(e.target.value)}
            >
              <option value="">Child Category</option>
              {childCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.category_name}
                </option>
              ))}
            </select>

            {/* DESCRIPTION */}
            <textarea
              className="form-control mb-3"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* VARIANT CHECK */}
            <div className="form-check mb-4">
              <input
                className="form-check-input variants-check"
                type="checkbox"
                checked={isVariant}
                onChange={(e) => setIsVariant(e.target.checked)}
              />
              <label className="form-check-label variants-text">
                This product has variants
              </label>
            </div>

            {/* VARIANTS */}
            {variants.map((v, i) => (
              <div key={i} className="border p-3 mb-3">
                <input
                  className="form-control mb-2"
                  placeholder="SKU"
                  onChange={(e) =>
                    handleVariantChange(i, "sku", e.target.value)
                  }
                />

                <input
                  className="form-control mb-2"
                  placeholder="Base Price"
                  onChange={(e) =>
                    handleVariantChange(i, "base_price", e.target.value)
                  }
                />

                <input
                  className="form-control mb-2"
                  placeholder="Discount"
                  onChange={(e) =>
                    handleVariantChange(i, "discount", e.target.value)
                  }
                />

                <input
                  className="form-control mb-2"
                  placeholder="Stock"
                  onChange={(e) =>
                    handleVariantChange(i, "stock", e.target.value)
                  }
                />

                {isVariant && (
                  <>
                    <select
                      className="form-control mb-2"
                      onChange={(e) =>
                        handleAttrChange(i, "size", e.target.value)
                      }
                    >
                      <option value="">Select Size</option>
                      {sizeAttribute?.values?.map((val) => (
                        <option key={val.id} value={val.id}>
                          {val.value}
                        </option>
                      ))}
                      {/* <option value="other">Other</option> */}
                    </select>

                    {/* {v.attr.size === "other" && (
                      <>
                        <input className="form-control mb-2" placeholder="Attribute Name (size)" onChange={(e)=>handleOtherChange(i,"otherSize","name",e.target.value)} />
                        <input className="form-control mb-2" placeholder="Label (XL)" onChange={(e)=>handleOtherChange(i,"otherSize","label",e.target.value)} />
                        <input className="form-control mb-2" placeholder="Value (xl)" onChange={(e)=>handleOtherChange(i,"otherSize","value",e.target.value)} />
                      </>
                    )} */}

                    {v.attr.color.map((colorValue, colorIndex) => (
                      <div key={colorIndex} className="d-flex mb-2 gap-2">
                        <select
                          className="form-control"
                          value={colorValue}
                          onChange={(e) =>
                            handleColorChange(i, colorIndex, e.target.value)
                          }
                        >
                          <option value="">Select Color</option>
                          {colorAttribute?.values?.map((val) => (
                            <option key={val.id} value={val.id}>
                              {val.value}
                            </option>
                          ))}
                        </select>

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
                      className="btn btn-sm btn-secondary"
                      onClick={() => addColorField(i)}
                    >
                      + Add Color
                    </button>
                    {/* 
                    {v.attr.color === "other" && (
                      <>
                        <input className="form-control mb-2" placeholder="Attribute Name (color)" onChange={(e)=>handleOtherChange(i,"otherColor","name",e.target.value)} />
                        <input className="form-control mb-2" placeholder="Label (Purple)" onChange={(e)=>handleOtherChange(i,"otherColor","label",e.target.value)} />
                        <input className="form-control mb-2" placeholder="Value (#800080)" onChange={(e)=>handleOtherChange(i,"otherColor","value",e.target.value)} />
                      </>
                    )} */}
                  </>
                )}

                <input
                  type="file"
                  multiple
                  className="form-control"
                  onChange={(e) => handleImages(i, e.target.files)}
                />
              </div>
            ))}

            {isVariant && (
              <button
                type="button"
                className="btn btn-secondary mb-3"
                onClick={addVariant}
              >
                + Add More Variant
              </button>
            )}

            <button className="btn btn-primary w-100">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}
