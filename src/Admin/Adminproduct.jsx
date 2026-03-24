// import React, { useEffect, useState } from "react";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";
// import { Outlet, Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import axios from "axios";

// export default function Adminproduct() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//    const token = localStorage.getItem("token");

// // FETCH PRODUCTS FROM API
// const fetchProducts = async () => {
//   try {
//     setLoading(true);

//     const res = await fetch(
//       `${process.env.REACT_APP_TECHSHOP_API_BASE_URL}/products`,
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     if (!res.ok) {
//       console.log("API ERROR:", res.status);
//       throw new Error(`API Failed: ${res.status}`);
//     }

//     const result = await res.json();
//     console.log("API RESULT:", result);

//     if (result.status && Array.isArray(result.data)) {
//       setData(result.data);
//     }

//   } catch (error) {
//     console.error("Error fetching products:", error);
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => {
//   fetchProducts();
// }, []);



//     const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this category?"))
//       return;

//     try {
//       await axios.post(
//         "http://tech-shop.techsaga.live/api/v1/products/destroyproduct",
//         { product_id: id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       ); 

//       alert("Category deleted successfully!");
//       setData((prev) => prev.filter((item) => item.id !== id));
//     } catch (error) {
//       console.error("Delete API Error:", error);
//       alert("Delete failed! Something went wrong.");
//     }
//   };


//   const handleStatusChange = async (id, currentStatus) => {
//   // published ↔ draft
//   const newStatus =
//     currentStatus === "published" ? "draft" : "published";

//   try {
//     await axios.post(
//       "http://tech-shop.techsaga.live/api/v1/products/changeStatus",
//       {
//         product_id: id,
//         product_status: newStatus,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // UI update
//     setData((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, product_status: newStatus }
//           : item
//       )
//     );
//   } catch (error) {
//     console.error(error.response?.data || error);
//     alert("Failed to update product status!");
//   }
// };


//   // TABLE COLUMNS
//   const columns = [
//     { name: "ID", selector: (row) => row.id, sortable: true },

//     {
//       name: "Image",
//       cell: (row) =>
//         row.variants?.length > 0 && row.variants[0].images?.length > 0 ? (
//           <img
//             src={row.variants[0].images[0]}
//             alt={row.name}
//             width="60"
//             height="60"
//             style={{ borderRadius: "8px", objectFit: "cover" }}
//           />
//         ) : (
//           <span>No Image</span>
//         ),
//     },

//     { name: "Name", selector: (row) => row.name, sortable: true },
//     { name: "Description", selector: (row) => row.description },

//     {
//       name: "Category",
//       selector: (row) =>
//         `${row.category?.main?.name || "N/A"} → ${row.category?.sub?.name || "N/A"}`,
//     },

//     {
//       name: "Price",
//       selector: (row) =>
//         row.variants?.length > 0 ? `₹${row.variants[0].price}` : "N/A",
//     },

//     {
//       name: "Discount",
//       selector: (row) =>
//         row.variants?.length > 0 ? `${row.variants[0].discount}%` : "N/A",
//     },
//         // ⭐ STATUS BUTTON with TOGGLE
//   {
//   name: "STATUS",
//   cell: (row) => {
//     const ispublished = row.product_status === "published";

//     return (
//       <button
//         onClick={() =>
//           handleStatusChange(row.id, row.product_status)
//         }
//         style={{
//           padding: "5px 10px",
//           borderRadius: "4px",
//           border: "none",
//           cursor: "pointer",
//           backgroundColor: ispublished ? "green" : "red",
//           color: "#fff",
//           fontWeight: "bold",
//         }}
//       >
//         {ispublished ? "Published" : "Drfat"}
//       </button>
//     );
//   },
// },

//     //  { name: "Product Manage", selector: (row) => row.vendor_name },

// { name: "Product Manage", selector: (row) => {
//    // Checking the vendor_name and conditionally setting the class
//       const vendorClass = row.vendor_name === 'self' ? 'self' : 'vendor_specific';

//       return (
//         <div className={vendorClass}>
//           {row.vendor_name}
//         </div>
//       );
//       }
// },



//     {
//       name: "Actions",
//       cell: (row) => (
//         <div style={{ display: "flex", gap: "8px" }}>
//            <Link
//             to={`/productedit/${row.id}`}
//             style={{
//               padding: "4px 8px",
//               backgroundColor: "#4caf50",
//               color: "#fff",
//               borderRadius: "4px",
//               textDecoration: "none",
//             }}
//           >
//             Edit
//           </Link>

//           <button
//             onClick={() => handleDelete(row.id)}
//             style={{
//               padding: "4px 8px",
//               backgroundColor: "red",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="d-flex">
//       <AdminSidebar />
//       <div className="dash-header">
//         <AdminHeader />
//         <Outlet />

//         <h2 className="dashboard-title">
// </h2>

//         <div className="container">
//           <div className="add-product">
//             <Link to={`/productadd`}>Add Product</Link>
//           </div>

//           <DataTable
//             columns={columns}
//             data={data}
//             progressPending={loading}
//             pagination
//             highlightOnHover
//             striped
//             responsive
//           />
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet, Link, useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FaPlus } from "react-icons/fa";


export default function Adminproduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");  // Add state for search term
  const token = localStorage.getItem("token");
  const { state } = useLocation();
  const { customerId } = state || {};
  // Fetch products from API
  // const fetchProducts = async (searchQuery = "") => {
  //   try {
  //     setLoading(true);

  //     // Fetch products with search query
  //     const res = await fetch(
  //       `${process.env.REACT_APP_TECHSHOP_API_BASE_URL}/products?search=${searchQuery}`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     if (!res.ok) {
  //       console.log("API ERROR:", res.status);
  //       throw new Error(`API Failed: ${res.status}`);
  //     }

  //     const result = await res.json();
  //     console.log("API RESULT:", result);

  //     if (result.status && Array.isArray(result.data)) {
  //       setData(result.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchProducts = async (searchQuery = "") => {
  try {
    setLoading(true);

    // ✅ Base URL
    let url = `${process.env.REACT_APP_TECHSHOP_API_BASE_URL}/products?search=${searchQuery}`;

    // ✅ Agar customerId hai to add karo
    if (customerId) {
      url += `&vendor_id=${customerId}`;
    }

    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`API Failed: ${res.status}`);
    }

    const result = await res.json();

    if (result.status && Array.isArray(result.data)) {
      setData(result.data);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProducts();  // Initial load with no search query
  }, [customerId]);

  // Handle Search Input Change
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    fetchProducts(query);  // Fetch products based on search query
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await axios.post(
        "http://tech-shop.techsaga.live/api/v1/products/destroyproduct",
        { product_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Category deleted successfully!");
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete API Error:", error);
      alert("Delete failed! Something went wrong.");
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";

    try {
      await axios.post(
        "http://tech-shop.techsaga.live/api/v1/products/changeStatus",
        {
          product_id: id,
          product_status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, product_status: newStatus } : item
        )
      );
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Failed to update product status!");
    }
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    {
      name: "Image",
      cell: (row) =>
        row.variants?.length > 0 && row.variants[0].images?.length > 0 ? (
          <img
            src={row.variants[0].images[0]}
            alt={row.name}
            width="60"
            height="60"
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        ) : (
          <span>No Image</span>
        ),
    },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Description", selector: (row) => row.description },
    {
      name: "Category",
      selector: (row) =>
        `${row.category?.main?.name || "N/A"} → ${row.category?.sub?.name || "N/A"}`,
    },
    {
      name: "Price",
      selector: (row) =>
        row.variants?.length > 0 ? `₹${row.variants[0].price}` : "N/A",
    },
    {
      name: "Discount",
      selector: (row) =>
        row.variants?.length > 0 ? `${row.variants[0].discount}%` : "N/A",
    },
    {
      name: "STATUS",
      cell: (row) => {
        const ispublished = row.product_status === "published";

        return (
          <button
            onClick={() => handleStatusChange(row.id, row.product_status)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              backgroundColor: ispublished ? "green" : "red",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {ispublished ? "Published" : "Draft"}
          </button>
        );
      },
    },
    {
      name: "Product Manage",
      selector: (row) => {
        const vendorClass = row.vendor_name === "self" ? "self" : "vendor_specific";
        return (
          <div className={vendorClass}>
            {row.vendor_name}
          </div>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex",  }}>
          <Link className="cus-edit text-decoration-none"
            to={`/productedit/${row.id}`}
           
          >
            Edit
          </Link>

          <button className="del-btn"
            onClick={() => handleDelete(row.id)}
           
          >
            Delete
          </button>
        </div>
      ),
    },
  ];




  
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="dash-header">
        <AdminHeader />
        <Outlet />

        <h2 className="dashboard-title">Product Overview</h2>

        <div className="container-fluid">
          <div className="d-flex justify-content-between mb-3 flex-wrap">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
                style={{
                  padding: "8px",
                  marginBottom: "20px",
                  borderRadius: "4px",
                  width: "200px",
                  border: "1px solid #ccc",
                }}
              />
              <div className="add-product">
                <Link to={`/productadd`}><FaPlus /> Add Product</Link>
              </div>
          </div>
  <div className="card"> 
          <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            highlightOnHover
            striped
            responsive
          />
          </div>
        </div>
      </div>
    </div>
  );
}