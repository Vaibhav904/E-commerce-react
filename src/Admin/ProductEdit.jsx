// import React, { useEffect, useState } from "react";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Form from "react-bootstrap/Form";
// import { Spinner } from "react-bootstrap";

// export default function ProductEdit() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [loading, setLoading] = useState(true);

//   /* ================= BASIC ================= */
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [isVariant, setIsVariant] = useState(false);

//   /* ================= CATEGORY ================= */
//   const [categories, setCategories] = useState([]);
//   const [attributes, setAttributes] = useState([]);
//   const [parentCategory, setParentCategory] = useState("");
//   const [childCategory, setChildCategory] = useState("");

//   /* ================= VARIANTS ================= */
//   const createDefaultVariant = () => ({
//     id: null,
//     sku: "",
//     base_price: "",
//     discount: "",
//     stock: "",
//     weight: "",
//     dimensions: "",
//     images: [],
//     oldImages: [],
//     attr: {
//       size: "",
//       color: [""], // ✅ array
//     },
//   });

//   const [variants, setVariants] = useState([createDefaultVariant()]);

//   /* ================= LOAD ================= */
//   useEffect(() => {
//     const loadData = async () => {
//       await fetchCategories();
//       await fetchProduct();
//       setLoading(false);
//     };
//     loadData();
//   }, []);

//   /* ================= FETCH CATEGORY ================= */
//   const fetchCategories = async () => {
//     const res = await axios.get(
//       "http://tech-shop.techsaga.live/api/v1/category/categoryListing",
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     setCategories(res.data.data || []);
//     setAttributes(res.data.attributes || []);
//   };

//   /* ================= FETCH PRODUCT ================= */
//   const fetchProduct = async () => {
//     const res = await axios.post(
//       "http://tech-shop.techsaga.live/api/v1/products/show",
//       { product_id: Number(id) },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const p = res.data.data;

//     setName(p.name || "");
//     setDescription(p.description || "");
//     setIsVariant(p.is_variant == 1);

//     if (p.category?.sub) {
//       setParentCategory(String(p.category.main.id));
//       setChildCategory(String(p.category.sub.id));
//     } else {
//       setParentCategory(String(p.category?.main?.id || ""));
//     }

//     if (p.variants?.length > 0) {
//       const mapped = p.variants.map((v) => {
//         let sizeId = "";
//         let colorIds = [];

//         v.attributes?.forEach((attr) => {
//           if (attr.name?.toLowerCase() === "size") {
//             sizeId = String(attr.value_id);
//           }
//           if (attr.name?.toLowerCase() === "color") {
//             colorIds.push(String(attr.value_id));
//           }
//         });

//         return {
//           id: v.id,
//           sku: v.sku || "",
//           base_price: v.price || "",
//           discount: v.discount || "",
//           stock: v.stock || "",
//           weight: v.weight || "",
//           dimensions: v.dimensions || "",
//           images: [],
//           oldImages: v.image || [],
//           attr: {
//             size: sizeId,
//             color: colorIds.length ? colorIds : [""],
//           },
//         };
//       });

//       setVariants(mapped);
//     }
//   };

//   /* ================= HANDLERS ================= */

//   const handleVariantChange = (index, field, value) => {
//     const updated = [...variants];
//     updated[index][field] = value;
//     setVariants(updated);
//   };

//   const handleAttrChange = (index, field, value) => {
//     const updated = [...variants];
//     updated[index].attr[field] = value;
//     setVariants(updated);
//   };

//   const handleColorChange = (variantIndex, colorIndex, value) => {
//     const updated = [...variants];
//     updated[variantIndex].attr.color =
//       updated[variantIndex].attr.color.map((c, i) =>
//         i === colorIndex ? value : c
//       );
//     setVariants(updated);
//   };

//   const addColorField = (variantIndex) => {
//     const updated = [...variants];
//     updated[variantIndex].attr.color.push("");
//     setVariants(updated);
//   };

//   const removeColorField = (variantIndex, colorIndex) => {
//     const updated = [...variants];
//     updated[variantIndex].attr.color.splice(colorIndex, 1);
//     setVariants(updated);
//   };

//   const handleImages = (index, files) => {
//     const updated = [...variants];
//     updated[index].images = [...files];
//     setVariants(updated);
//   };

//   const addVariant = () => {
//     setVariants([...variants, createDefaultVariant()]);
//   };

//   /* ================= DELETE IMAGE ================= */

//   const deleteVariantImage = async (imageId, variantIndex) => {
//     await axios.post(
//       "http://tech-shop.techsaga.live/api/v1/products/variant-image/delete",
//       { image_id: imageId },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const updated = [...variants];
//     updated[variantIndex].oldImages =
//       updated[variantIndex].oldImages.filter((img) => img.id !== imageId);

//     setVariants(updated);
//   };

//   /* ================= SUBMIT ================= */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append("id", id);
//     formData.append("name", name);
//     formData.append("description", description);

//     formData.append(
//       "category_id",
//       childCategory ? Number(childCategory) : Number(parentCategory)
//     );

//     formData.append("is_variant", isVariant ? 1 : 0);

//   variants.forEach((v, i) => {
//   if (v.id) formData.append(`variants[${i}][id]`, v.id);

//   formData.append(`variants[${i}][sku]`, v.sku || "");
//   formData.append(`variants[${i}][price]`, v.base_price || 0);  // ✅ FIX
//   formData.append(`variants[${i}][discount]`, v.discount || 0);
//   formData.append(`variants[${i}][stock]`, v.stock || 0);
//   formData.append(`variants[${i}][weight]`, v.weight || "");
//   formData.append(`variants[${i}][dimensions]`, v.dimensions || "");
// });

//     try {
//       await axios.post(
//         "http://tech-shop.techsaga.live/api/v1/products/update",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert("Product Updated Successfully ✅");
//       navigate("/adminproducts");
//     } catch (error) {
//       console.log(error.response?.data);
//       alert("Update Failed ❌");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   const parentCategories = categories.filter((c) => c.parent === 0);
//   const childCategories = categories.filter(
//     (c) => String(c.parent) === String(parentCategory)
//   );

//   const sizeAttribute = attributes.find(
//     (a) => a.name?.toLowerCase() === "size"
//   );

//   const colorAttribute = attributes.find(
//     (a) => a.name?.toLowerCase() === "color"
//   );

//   return (
//     <div className="d-flex">
//       <AdminSidebar />
//       <div className="dash-header w-100">
//         <AdminHeader />
//         <div className="container mt-4">
//           <h2>Edit Product</h2>

//           <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded card mb-4">
//             <input
//               className="form-control mb-3"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Product Name"
//             />
            

//             <select
//               className="form-control mb-3"
//               value={parentCategory}
//               onChange={(e) => {
//                 setParentCategory(e.target.value);
//                 setChildCategory("");
//               }}
//             >
//               <option value="">Parent Category</option>
//               {parentCategories.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.category_name}
//                 </option>
//               ))}
//             </select>

//             <select
//               className="form-control mb-3"
//               value={childCategory}
//               onChange={(e) => setChildCategory(e.target.value)}
//               disabled={!parentCategory}
//             >
//               <option value="">Child Category</option>
//               {childCategories.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.category_name}
//                 </option>
//               ))}
//             </select>

//             <textarea
//               className="form-control mb-3"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Description"
//             />

//             {variants.map((v, i) => (
//               <div key={i} className="border p-3 mb-3 rounded">
//                 <input
//                   className="form-control mb-2"
//                   value={v.sku}
//                   onChange={(e) =>
//                     handleVariantChange(i, "sku", e.target.value)
//                   }
//                   placeholder="SKU"
//                 />

//                 <Form.Select
//                   value={v.attr.size}
//                   onChange={(e) =>
//                     handleAttrChange(i, "size", e.target.value)
//                   }
//                   className="mb-2"
//                 >
//                   <option value="">Select Size</option>
//                   {sizeAttribute?.values?.map((val) => (
//                     <option key={val.id} value={String(val.id)}>
//                       {val.value}
//                     </option>
//                   ))}
//                 </Form.Select>

//                 {v.attr.color.map((colorValue, colorIndex) => (
//                   <div key={colorIndex} className="d-flex mb-2 gap-2">
//                     <Form.Select
//                       value={colorValue}
//                       onChange={(e) =>
//                         handleColorChange(i, colorIndex, e.target.value)
//                       }
//                     >
//                       <option value="">Select Color</option>
//                       {colorAttribute?.values?.map((val) => (
//                         <option key={val.id} value={String(val.id)}>
//                           {val.value}
//                         </option>
//                       ))}
//                     </Form.Select>

//                     {v.attr.color.length > 1 && (
//                       <button
//                         type="button"
//                         className="btn btn-danger"
//                         onClick={() => removeColorField(i, colorIndex)}
//                       >
//                         X
//                       </button>
//                     )}
//                   </div>
//                 ))}

//                 <button
//                   type="button"
//                   className="btn btn-sm btn-secondary mb-2"
//                   onClick={() => addColorField(i)}
//                 >
//                   + Add Color
//                 </button>

//                 <input
//                   type="file"
//                   multiple
//                   className="form-control"
//                   onChange={(e) => handleImages(i, e.target.files)}
//                 />
//               </div>
//             ))}

//             <button className="btn btn-primary w-100">
//               Update Product
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }





















// import React, { useEffect, useState } from "react";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Form from "react-bootstrap/Form";
// import { Spinner } from "react-bootstrap";

// export default function ProductEdit() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [loading, setLoading] = useState(true);

//   /* ================= BASIC ================= */
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [isVariant, setIsVariant] = useState(false);

//   /* ================= CATEGORY ================= */
//   const [categories, setCategories] = useState([]);
//   const [attributes, setAttributes] = useState([]);
//   const [parentCategory, setParentCategory] = useState("");
//   const [childCategory, setChildCategory] = useState("");

//   /* ================= VARIANTS ================= */
//   const createDefaultVariant = () => ({
//     id: null,
//     sku: "",
//     base_price: "",
//     discount: "",
//     stock: "",
//     weight: "",
//     dimensions: "",
//     images: [],
//     oldImages: [],
//     attr: {
//       size: "",
//       color: [""],
//     },
//   });

//   const [variants, setVariants] = useState([createDefaultVariant()]);

//   /* ================= LOAD ================= */
//   useEffect(() => {
//     const loadData = async () => {
//       await fetchCategories();
//       await fetchProduct();
//       setLoading(false);
//     };
//     loadData();
//   }, []);

//   /* ================= FETCH CATEGORY ================= */
//   const fetchCategories = async () => {
//     const res = await axios.get(
//       "http://tech-shop.techsaga.live/api/v1/category/categoryListing",
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     setCategories(res.data.data || []);
//     setAttributes(res.data.attributes || []);
//   };

//   /* ================= FETCH PRODUCT ================= */
//   const fetchProduct = async () => {
//     const res = await axios.post(
//       "http://tech-shop.techsaga.live/api/v1/products/show",
//       { product_id: Number(id) },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const p = res.data.data;

//     setName(p.name || "");
//     setDescription(p.description || "");
//     setIsVariant(p.is_variant == 1);

//     if (p.category?.sub) {
//       setParentCategory(String(p.category.main.id));
//       setChildCategory(String(p.category.sub.id));
//     } else {
//       setParentCategory(String(p.category?.main?.id || ""));
//     }

//     if (p.variants?.length > 0) {
//       const mapped = p.variants.map((v) => {
//         let sizeId = "";
//         let colorIds = [];

//         v.attributes?.forEach((attr) => {
//           if (attr.name?.toLowerCase() === "size") sizeId = String(attr.value_id);
//           if (attr.name?.toLowerCase() === "color") colorIds.push(String(attr.value_id));
//         });

//         return {
//           id: v.id,
//           sku: v.sku || "",
//           base_price: v.price || "",
//           discount: v.discount || "",
//           stock: v.stock || "",
//           weight: v.weight || "",
//           dimensions: v.dimensions || "",
//           images: [],
//           oldImages: v.image || [],
//           attr: { size: sizeId, color: colorIds.length ? colorIds : [""] },
//         };
//       });

//       setVariants(mapped);
//     }
//   };

//   /* ================= HANDLERS ================= */
//   const handleVariantChange = (index, field, value) => {
//     const updated = [...variants];
//     updated[index][field] = value;
//     setVariants(updated);
//   };

//   const handleAttrChange = (index, field, value) => {
//     const updated = [...variants];
//     updated[index].attr[field] = value;
//     setVariants(updated);
//   };

//   const handleColorChange = (variantIndex, colorIndex, value) => {
//     const updated = [...variants];
//     updated[variantIndex].attr.color =
//       updated[variantIndex].attr.color.map((c, i) => (i === colorIndex ? value : c));
//     setVariants(updated);
//   };

//   const addColorField = (variantIndex) => {
//     const updated = [...variants];
//     updated[variantIndex].attr.color.push("");
//     setVariants(updated);
//   };

//   const removeColorField = (variantIndex, colorIndex) => {
//     const updated = [...variants];
//     updated[variantIndex].attr.color.splice(colorIndex, 1);
//     setVariants(updated);
//   };

//   const handleImages = (index, files) => {
//     const updated = [...variants];
//     updated[index].images = [...files];
//     setVariants(updated);
//   };

//   const addVariant = () => setVariants([...variants, createDefaultVariant()]);

//   /* ================= DELETE IMAGE ================= */
//   const deleteVariantImage = async (imageId, variantIndex) => {
//     await axios.post(
//       "http://tech-shop.techsaga.live/api/v1/products/variant-image/delete",
//       { image_id: imageId },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const updated = [...variants];
//     updated[variantIndex].oldImages = updated[variantIndex].oldImages.filter(
//       (img) => img.id !== imageId
//     );

//     setVariants(updated);
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const categoryId = childCategory || parentCategory;
//     if (!categoryId) {
//       alert("Please select a valid category");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("product_id", id); // ✅ use product_id for edit
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("category_id", Number(categoryId));
//     formData.append("is_variant", isVariant ? 1 : 0);

//     variants.forEach((v, i) => {
//       if (v.id) formData.append(`variants[${i}][id]`, v.id);
//       formData.append(`variants[${i}][sku]`, v.sku || "");
//       formData.append(`variants[${i}][price]`, v.base_price || 0);
//       formData.append(`variants[${i}][discount]`, v.discount || 0);
//       formData.append(`variants[${i}][stock]`, v.stock || 0);
//       formData.append(`variants[${i}][weight]`, v.weight || "");
//       formData.append(`variants[${i}][dimensions]`, v.dimensions || "");

//       // ✅ Append size & color attributes
//       if (v.attr.size) formData.append(`variants[${i}][attributes][size]`, v.attr.size);
//       v.attr.color.forEach((colorId, cIdx) => {
//         if (colorId) formData.append(`variants[${i}][attributes][color][${cIdx}]`, colorId);
//       });

//       // Append new images
//       v.images.forEach((file) => formData.append(`variants[${i}][images][]`, file));
//     });

//     try {
//       await axios.post("http://tech-shop.techsaga.live/api/v1/products/update", formData, {
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
//       });

//       alert("Product Updated Successfully ✅");
//       navigate("/adminproducts");
//     } catch (error) {
//       console.log(error.response?.data);
//       alert("Update Failed ❌");
//     }
//   };

//   if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

//   const parentCategories = categories.filter((c) => c.parent === 0);
//   const childCategories = categories.filter((c) => String(c.parent) === String(parentCategory));
//   const sizeAttribute = attributes.find((a) => a.name?.toLowerCase() === "size");
//   const colorAttribute = attributes.find((a) => a.name?.toLowerCase() === "color");

//   return (
//     <div className="d-flex">
//       <AdminSidebar />
//       <div className="dash-header w-100">
//         <AdminHeader />
//         <div className="container mt-4">
//           <h2>Edit Product</h2>

//           <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded card mb-4">
//             <input
//               className="form-control mb-3"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Product Name"
//             />

//             <select
//               className="form-control mb-3"
//               value={parentCategory}
//               onChange={(e) => { setParentCategory(e.target.value); setChildCategory(""); }}
//             >
//               <option value="">Parent Category</option>
//               {parentCategories.map((c) => <option key={c.id} value={c.id}>{c.category_name}</option>)}
//             </select>

//             <select
//               className="form-control mb-3"
//               value={childCategory}
//               onChange={(e) => setChildCategory(e.target.value)}
//               disabled={!parentCategory}
//             >
//               <option value="">Child Category</option>
//               {childCategories.map((c) => <option key={c.id} value={c.id}>{c.category_name}</option>)}
//             </select>

//             <textarea
//               className="form-control mb-3"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Description"
//             />

//             {variants.map((v, i) => (
//               <div key={i} className="border p-3 mb-3 rounded">
//                 <input
//                   className="form-control mb-2"
//                   value={v.sku}
//                   onChange={(e) => handleVariantChange(i, "sku", e.target.value)}
//                   placeholder="SKU"
//                 />

//                 <Form.Select
//                   value={v.attr.size}
//                   onChange={(e) => handleAttrChange(i, "size", e.target.value)}
//                   className="mb-2"
//                 >
//                   <option value="">Select Size</option>
//                   {sizeAttribute?.values?.map((val) => (
//                     <option key={val.id} value={String(val.id)}>{val.value}</option>
//                   ))}
//                 </Form.Select>

//                 {v.attr.color.map((colorValue, colorIndex) => (
//                   <div key={colorIndex} className="d-flex mb-2 gap-2">
//                     <Form.Select
//                       value={colorValue}
//                       onChange={(e) => handleColorChange(i, colorIndex, e.target.value)}
//                     >
//                       <option value="">Select Color</option>
//                       {colorAttribute?.values?.map((val) => (
//                         <option key={val.id} value={String(val.id)}>{val.value}</option>
//                       ))}
//                     </Form.Select>

//                     {v.attr.color.length > 1 && (
//                       <button
//                         type="button"
//                         className="btn btn-danger"
//                         onClick={() => removeColorField(i, colorIndex)}
//                       >
//                         X
//                       </button>
//                     )}
//                   </div>
//                 ))}

//                 <button
//                   type="button"
//                   className="btn btn-sm btn-secondary mb-2"
//                   onClick={() => addColorField(i)}
//                 >
//                   + Add Color
//                 </button>

//                 <input
//                   type="file"
//                   multiple
//                   className="form-control"
//                   onChange={(e) => handleImages(i, e.target.files)}
//                 />
//               </div>
//             ))}

//             <button className="btn btn-primary w-100">Update Product</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Form from "react-bootstrap/Form";
// import { Spinner } from "react-bootstrap";

// export default function ProductEdit() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("adminToken");

//   const [loading, setLoading] = useState(true);

//   /* ================= BASIC ================= */
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [isVariant, setIsVariant] = useState(false);

//   /* ================= CATEGORY ================= */
//   const [categories, setCategories] = useState([]);
//   const [attributes, setAttributes] = useState([]);
//   const [parentCategory, setParentCategory] = useState(0);
//   const [childCategory, setChildCategory] = useState(0);

//   /* ================= VARIANTS ================= */
//   const createDefaultVariant = () => ({
//     id: null,
//     sku: "",
//     base_price: "",
//     discount: "",
//     stock: "",
//     weight: "",
//     dimensions: "",
//     images: [],
//     oldImages: [],
//     attr: { size: "", color: [""] },
//   });

//   const [variants, setVariants] = useState([createDefaultVariant()]);

//   /* ================= LOAD ================= */
//   useEffect(() => {
//     const loadData = async () => {
//       await fetchCategories();
//       await fetchProduct();
//       setLoading(false);
//     };
//     loadData();
//   }, []);

//   /* ================= FETCH CATEGORY ================= */
//   const fetchCategories = async () => {
//     const res = await axios.get(
//       "http://tech-shop.techsaga.live/api/v1/category/categoryListing",
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     setCategories(res.data.data || []);
//     setAttributes(res.data.attributes || []);
//   };

//   /* ================= FETCH PRODUCT ================= */
//   const fetchProduct = async () => {
//     const res = await axios.post(
//       "http://tech-shop.techsaga.live/api/v1/products/show",
//       { product_id: Number(id) },
//       { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
//     );

//     const p = res.data.data;

//     setName(p.name || "");
//     setDescription(p.description || "");
//     setIsVariant(p.is_variant == 1);

//     // Set category numbers
//     if (p.category?.sub?.id) {
//       setParentCategory(Number(p.category.main.id));
//       setChildCategory(Number(p.category.sub.id));
//     } else {
//       setParentCategory(Number(p.category?.main?.id || 0));
//       setChildCategory(0);
//     }

//     if (p.variants?.length > 0) {
//       const mapped = p.variants.map((v) => {
//         let sizeId = "";
//         let colorIds = [];

//         v.attributes?.forEach((attr) => {
//           if (attr.name?.toLowerCase() === "size") sizeId = String(attr.value_id);
//           if (attr.name?.toLowerCase() === "color") colorIds.push(String(attr.value_id));
//         });

//         return {
//           id: v.id,
//           sku: v.sku || "",
//           base_price: v.price || "",
//           discount: v.discount || "",
//           stock: v.stock || "",
//           weight: v.weight || "",
//           dimensions: v.dimensions || "",
//           images: [],
//           oldImages: v.image || [],
//           attr: { size: sizeId, color: colorIds.length ? colorIds : [""] },
//         };
//       });

//       setVariants(mapped);
//     }
//   };

//   /* ================= HANDLERS ================= */
//   const handleVariantChange = (index, field, value) => {
//     const updated = [...variants];
//     updated[index][field] = value;
//     setVariants(updated);
//   };

//   const handleAttrChange = (index, field, value) => {
//     const updated = [...variants];
//     updated[index].attr[field] = value;
//     setVariants(updated);
//   };

//   const handleColorChange = (variantIndex, colorIndex, value) => {
//     const updated = [...variants];
//     updated[variantIndex].attr.color = updated[variantIndex].attr.color.map((c, i) =>
//       i === colorIndex ? value : c
//     );
//     setVariants(updated);
//   };

//   const addColorField = (variantIndex) => {
//     const updated = [...variants];
//     updated[variantIndex].attr.color.push("");
//     setVariants(updated);
//   };

//   const removeColorField = (variantIndex, colorIndex) => {
//     const updated = [...variants];
//     updated[variantIndex].attr.color.splice(colorIndex, 1);
//     setVariants(updated);
//   };

//   const handleImages = (index, files) => {
//     const updated = [...variants];
//     updated[index].images = [...files];
//     setVariants(updated);
//   };

//   const addVariant = () => setVariants([...variants, createDefaultVariant()]);

//   /* ================= DELETE IMAGE ================= */
//   const deleteVariantImage = async (imageId, variantIndex) => {
//     await axios.post(
//       "http://tech-shop.techsaga.live/api/v1/products/variant-image/delete",
//       { image_id: imageId },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const updated = [...variants];
//     updated[variantIndex].oldImages = updated[variantIndex].oldImages.filter((img) => img.id !== imageId);
//     setVariants(updated);
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const categoryId = childCategory && childCategory !== 0 ? childCategory : parentCategory;
//     if (!categoryId || categoryId === 0) {
//       alert("Please select a valid category");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("product_id", id); // ✅ edit API requires product_id
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("category_id", categoryId); // ✅ always a number
//     formData.append("is_variant", isVariant ? 1 : 0);

//     variants.forEach((v, i) => {
//       if (v.id) formData.append(`variants[${i}][id]`, v.id);
//       formData.append(`variants[${i}][sku]`, v.sku || "");
//       formData.append(`variants[${i}][price]`, v.base_price || 0);
//       formData.append(`variants[${i}][discount]`, v.discount || 0);
//       formData.append(`variants[${i}][stock]`, v.stock || 0);
//       formData.append(`variants[${i}][weight]`, v.weight || "");
//       formData.append(`variants[${i}][dimensions]`, v.dimensions || "");

//       if (v.attr.size) formData.append(`variants[${i}][attributes][size]`, v.attr.size);
//       v.attr.color.forEach((colorId, cIdx) => {
//         if (colorId) formData.append(`variants[${i}][attributes][color][${cIdx}]`, colorId);
//       });

//       v.images.forEach((file) => formData.append(`variants[${i}][images][]`, file));
//     });

//     try {
//       await axios.post("http://tech-shop.techsaga.live/api/v1/products/update", formData, {
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
//       });

//       alert("Product Updated Successfully ✅");
//       navigate("/adminproducts");
//     } catch (error) {
//       console.log(error.response?.data);
//       alert("Update Failed ❌");
//     }
//   };

//   if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

//   const parentCategories = categories.filter((c) => c.parent === 0);
//   const childCategories = categories.filter((c) => String(c.parent) === String(parentCategory));
//   const sizeAttribute = attributes.find((a) => a.name?.toLowerCase() === "size");
//   const colorAttribute = attributes.find((a) => a.name?.toLowerCase() === "color");

//   return (
//     <div className="d-flex">
//       <AdminSidebar />
//       <div className="dash-header w-100">
//         <AdminHeader />
//         <div className="container mt-4">
//           <h2>Edit Product</h2>

//           <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded card mb-4">
//                         <label className="form-label">Product Name</label>
//             <input
//               className="form-control mb-3"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Product Name"
//             />
//             <label className="form-label">Parent Category</label>
//             <select
//               className="form-control mb-3"
//               value={parentCategory}
//               onChange={(e) => { setParentCategory(Number(e.target.value)); setChildCategory(0); }}
//             >
//               <option value={0}>Parent Category</option>
//               {parentCategories.map((c) => <option key={c.id} value={c.id}>{c.category_name}</option>)}
//             </select>
//             <label className="form-label">Child Category</label>
//             <select
//               className="form-control mb-3"
//               value={childCategory}
//               onChange={(e) => setChildCategory(Number(e.target.value))}
//               disabled={!parentCategory}
//             >
//               <option value={0}>Child Category</option>
//               {childCategories.map((c) => <option key={c.id} value={c.id}>{c.category_name}</option>)}
//             </select>
//         <label className="form-label">Description</label>
//             <textarea
//               className="form-control mb-3"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Description"
//             />

//             {variants.map((v, i) => (
//               <div key={i} className="border p-3 mb-3 rounded">
//                 <label className="form-label">SKU</label>
//                 <input
//                   className="form-control mb-2"
//                   value={v.sku}
//                   onChange={(e) => handleVariantChange(i, "sku", e.target.value)}
//                   placeholder="SKU"
//                 />
//                 <label className="form-label">Size</label>
//                 <Form.Select
//                   value={v.attr.size}
//                   onChange={(e) => handleAttrChange(i, "size", e.target.value)}
//                   className="mb-2"
//                 >
//                   <option value="">Select Size</option>
//                   {sizeAttribute?.values?.map((val) => (
//                     <option key={val.id} value={String(val.id)}>{val.value}</option>
//                   ))}
//                 </Form.Select>

//                 {v.attr.color.map((colorValue, colorIndex) => (
//                   <>
//                   <label className="form-label">Color</label>
//                   <div key={colorIndex} className="d-flex mb-2 gap-2">
                   
//                     <Form.Select
//                       value={colorValue}
//                       onChange={(e) => handleColorChange(i, colorIndex, e.target.value)}
//                     >
//                       <option value="">Select Color</option>
//                       {colorAttribute?.values?.map((val) => (
//                         <option key={val.id} value={String(val.id)}>{val.value}</option>
//                       ))}
//                     </Form.Select>

//                     {v.attr.color.length > 1 && (
//                       <button
//                         type="button"
//                         className="btn btn-danger"
//                         onClick={() => removeColorField(i, colorIndex)}
//                       >
//                         X
//                       </button>
//                     )}
//                   </div>
//                   </>
//                 ))}

//                 <button
//                   type="button"
//                   className="btn btn-sm btn-secondary mb-2"
//                   onClick={() => addColorField(i)}
//                 >
//                   + Add Color
//                 </button>

//                 <input
//                   type="file"
//                   multiple
//                   className="form-control"
//                   onChange={(e) => handleImages(i, e.target.files)}
//                 />
//               </div>
//             ))}

//             <button className="btn btn-primary w-100">Update Product</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [loading, setLoading] = useState(true);

const handleDragEndImages = (result, variantIndex) => {
  if (!result.destination) return;

  const updated = [...variants];
  const items = Array.from(updated[variantIndex].images);

  const [moved] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, moved);

  updated[variantIndex].images = items;
  setVariants(updated);
};

  /* ================= BASIC ================= */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isVariant, setIsVariant] = useState(false);

  /* ================= CATEGORY ================= */
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [parentCategory, setParentCategory] = useState(0);
  const [childCategory, setChildCategory] = useState(0);

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
    attr: { size: "", color: [""] },
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
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCategories(res.data.data || []);
    setAttributes(res.data.attributes || []);
  };

  /* ================= FETCH PRODUCT ================= */
  const fetchProduct = async () => {
    const res = await axios.post(
      "http://tech-shop.techsaga.live/api/v1/products/show",
      { product_id: Number(id) },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
    );

    const p = res.data.data;

    setName(p.name || "");
    setDescription(p.description || "");
    setIsVariant(p.is_variant == 1);

    // Set category numbers
    if (p.category?.sub?.id) {
      setParentCategory(Number(p.category.main.id));
      setChildCategory(Number(p.category.sub.id));
    } else {
      setParentCategory(Number(p.category?.main?.id || 0));
      setChildCategory(0);
    }

    if (p.variants?.length > 0) {
      const mapped = p.variants.map((v) => {
        let sizeId = "";
        let colorIds = [];

        v.attributes?.forEach((attr) => {
          if (attr.name?.toLowerCase() === "size") sizeId = String(attr.value_id);
          if (attr.name?.toLowerCase() === "color") colorIds.push(String(attr.value_id));
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
          attr: { size: sizeId, color: colorIds.length ? colorIds : [""] },
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
    updated[variantIndex].attr.color = updated[variantIndex].attr.color.map((c, i) =>
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

  const newFiles = Array.from(files).map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));

  updated[index].images = [
    ...(updated[index].images || []),
    ...newFiles,
  ];

  setVariants(updated);
};


const handleDeleteNewImage = (variantIndex, imgIndex) => {
  const updated = [...variants];

  URL.revokeObjectURL(
    updated[variantIndex].images[imgIndex].preview
  );

  updated[variantIndex].images.splice(imgIndex, 1);
  setVariants(updated);
};

  const addVariant = () => setVariants([...variants, createDefaultVariant()]);

  /* ================= DELETE IMAGE ================= */
  const deleteVariantImage = async (imageId, variantIndex) => {
    await axios.post(
      "http://tech-shop.techsaga.live/api/v1/products/variant-image/delete",
      { image_id: imageId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const updated = [...variants];
    updated[variantIndex].oldImages = updated[variantIndex].oldImages.filter((img) => img.id !== imageId);
    setVariants(updated);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryId = childCategory && childCategory !== 0 ? childCategory : parentCategory;
    if (!categoryId || categoryId === 0) {
      alert("Please select a valid category");
      return;
    }

    const formData = new FormData();
    formData.append("product_id", id); // ✅ edit API requires product_id
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category_id", categoryId); // ✅ always a number
    formData.append("is_variant", isVariant ? 1 : 0);

    variants.forEach((v, i) => {
      if (v.id) formData.append(`variants[${i}][id]`, v.id);
      formData.append(`variants[${i}][sku]`, v.sku || "");
      formData.append(`variants[${i}][price]`, v.base_price || 0);
      formData.append(`variants[${i}][discount]`, v.discount || 0);
      formData.append(`variants[${i}][stock]`, v.stock || 0);
      formData.append(`variants[${i}][weight]`, v.weight || "");
      formData.append(`variants[${i}][dimensions]`, v.dimensions || "");

      if (v.attr.size) formData.append(`variants[${i}][attributes][size]`, v.attr.size);
      v.attr.color.forEach((colorId, cIdx) => {
        if (colorId) formData.append(`variants[${i}][attributes][color][${cIdx}]`, colorId);
      });

      // v.images.forEach((file) => formData.append(`variants[${i}][images][]`, file));
      v.images.forEach((img) =>
        formData.append(`variants[${i}][images][]`, img.file)
      );


    });

    try {
      await axios.post("http://tech-shop.techsaga.live/api/v1/products/update", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      alert("Product Updated Successfully ✅");
      navigate("/adminproducts");
    } catch (error) {
      console.log(error.response?.data);
      alert("Update Failed ❌");
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  const parentCategories = categories.filter((c) => c.parent === 0);
  const childCategories = categories.filter((c) => String(c.parent) === String(parentCategory));
  const sizeAttribute = attributes.find((a) => a.name?.toLowerCase() === "size");
  const colorAttribute = attributes.find((a) => a.name?.toLowerCase() === "color");

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="dash-header w-100">
        <AdminHeader />
        <div className="container mt-4">
          <h2>Edit Product</h2>

          <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded card mb-4">
                        <label className="form-label">Product Name</label>
            <input
              className="form-control mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
            />
            <label className="form-label">Parent Category</label>
            <select
              className="form-control mb-3"
              value={parentCategory}
              onChange={(e) => { setParentCategory(Number(e.target.value)); setChildCategory(0); }}
            >
              <option value={0}>Parent Category</option>
              {parentCategories.map((c) => <option key={c.id} value={c.id}>{c.category_name}</option>)}
            </select>
            <label className="form-label">Child Category</label>
            <select
              className="form-control mb-3"
              value={childCategory}
              onChange={(e) => setChildCategory(Number(e.target.value))}
              disabled={!parentCategory}
            >
              <option value={0}>Child Category</option>
              {childCategories.map((c) => <option key={c.id} value={c.id}>{c.category_name}</option>)}
            </select>
        <label className="form-label">Description</label>
            <textarea
              className="form-control mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            {variants.map((v, i) => (
              <div key={i} className="border p-3 mb-3 rounded">
                <label className="form-label">SKU</label>
                <input
                  className="form-control mb-2"
                  value={v.sku}
                  onChange={(e) => handleVariantChange(i, "sku", e.target.value)}
                  placeholder="SKU"
                />
                <label className="form-label">Size</label>
                <Form.Select
                  value={v.attr.size}
                  onChange={(e) => handleAttrChange(i, "size", e.target.value)}
                  className="mb-2"
                >
                  <option value="">Select Size</option>
                  {sizeAttribute?.values?.map((val) => (
                    <option key={val.id} value={String(val.id)}>{val.value}</option>
                  ))}
                </Form.Select>

                {v.attr.color.map((colorValue, colorIndex) => (
                  <>
                  <label className="form-label">Color</label>
                  <div key={colorIndex} className="d-flex mb-2 gap-2">
                   
                    <Form.Select
                      value={colorValue}
                      onChange={(e) => handleColorChange(i, colorIndex, e.target.value)}
                    >
                      <option value="">Select Color</option>
                      {colorAttribute?.values?.map((val) => (
                        <option key={val.id} value={String(val.id)}>{val.value}</option>
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
                  </>
                ))}

                <button
                  type="button"
                  className="btn btn-sm btn-secondary mb-2"
                  onClick={() => addColorField(i)}
                >
                  + Add Color
                </button>
{/* 
                <input
                  type="file"
                  multiple
                  className="form-control"
                  onChange={(e) => handleImages(i, e.target.files)}
                /> */}
                {/* Upload */}
<input
  type="file"
  multiple
  className="form-control mb-3"
  onChange={(e) => handleImages(i, e.target.files)}
/>

{/* OLD IMAGES (from backend) */}
<div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
  {v.oldImages?.map((img, idx) => (
    <div
      key={img.id}
      style={{
        width: "90px",
        height: "90px",
        position: "relative",
        border: "1px solid #ddd",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      <img
        src={img.image} // 👈 your API image url
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <button
        type="button"
        onClick={() => deleteVariantImage(img.id, i)}
        style={{
          position: "absolute",
          top: 3,
          right: 3,
          background: "red",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "18px",
          height: "18px",
          fontSize: "12px",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  ))}
</div>

{/* NEW IMAGES (Drag + Preview) */}
<DragDropContext onDragEnd={(result) => handleDragEndImages(result, i)}>
  <Droppable droppableId={`variant-${i}`} direction="horizontal">
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {v.images?.map((img, imgIndex) => (
          <Draggable
            key={imgIndex}
            draggableId={`${i}-${imgIndex}`}
            index={imgIndex}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  width: "90px",
                  height: "90px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "grab",
                  ...provided.draggableProps.style,
                }}
              >
                <img
                  src={img.preview}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <button
                  type="button"
                  onClick={() => handleDeleteNewImage(i, imgIndex)}
                  style={{
                    position: "absolute",
                    top: 3,
                    right: 3,
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>
              </div>
            ))}

            <button className="btn btn-primary w-100">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}