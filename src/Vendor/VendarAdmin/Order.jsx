import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Order() {
  const [data, setData] = useState([]);

  const vendorToken = localStorage.getItem("vendorToken");

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/v1/category/categoryListing",
        {
          headers: {
          Authorization: `Bearer ${vendorToken}`,
          "Content-Type": "multipart/form-data", // ✅ FIX 2
        },
        }
      );
      setData(res.data.data);
    } catch (error) {
      console.log("Fetching Error:", error);
      alert("Failed to fetch categories!");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);








// ⭐ DISPLAY / NO DISPLAY TOGGLE
const handleDisplayToggle = async (id, currentDisplay) => {
  const updatedDisplay = currentDisplay == 1 ? 0 : 1;

  try {
    // 🔥 API CALL
    const formData = new FormData();
    formData.append("category_id", id);
    formData.append("is_display", updatedDisplay);

    await axios.post(
      "http://tech-shop.techsaga.live/api/v1/category/display-category-status",
      formData,
      {
       headers: {
          Authorization: `Bearer ${vendorToken}`,
          "Content-Type": "multipart/form-data", // ✅ FIX 2
        },
      }
    );

    // 🔥 FRONTEND LOGIC (ONLY ONE DISPLAY ALLOWED)
    setData((prev) =>
      prev.map((item) => {
        // ❌ Child category → untouched
        if (item.parent !== 0 && item.parent !== null) {
          return item;
        }

        // ✅ Clicked parent
        if (item.id === id) {
          return { ...item, is_display: updatedDisplay };
        }

        // ❌ Baaki parent → auto No Display
        return { ...item, is_display: 0 };
      })
    );
  } catch (error) {
    console.log("Display toggle error:", error.response?.data || error);
    alert("Failed to update display status!");
  }
};












  // DELETE category
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this category?")) return;

  try {
    const formData = new FormData();
    formData.append("category_id", id); // 🔥 IMPORTANT

    await axios.post(
      "http://tech-shop.techsaga.live/api/v1/category/destroyCategory",
      formData,
      {
       headers: {
          Authorization: `Bearer ${vendorToken}`,
          "Content-Type": "multipart/form-data", // ✅ FIX 2
        },
      }
    );

    alert("Category deleted successfully!");

    setData((prev) => prev.filter((item) => item.id !== id));
  } catch (error) {
    console.log("Delete Error Response:", error.response?.data);
    alert("Delete failed!");
  }
};


  // ⭐ STATUS TOGGLE
//   const handleStatusChange = async (id, currentStatus) => {
//   const updatedStatus = currentStatus == 1 ? 0 : 1;

//   try {
//     const formData = new FormData();
//     formData.append("category_id", id);
//     formData.append("status", updatedStatus);

//     await axios.post(
//       "http://tech-shop.techsaga.live/api/v1/category/statusCategory",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${vendorToken}`,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
 
//     // 🔥 refresh from backend (BEST)
//     fetchCategories();

//   } catch (error) {
//     console.log(error.response?.data);
//     alert("Failed to update status!");
//   }
// };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },

    {
      name: "Thumbnail",
      cell: (row) => (
        <img
          src={row.image}
          alt={row.category_name}
          width="50"
          height="50"
          style={{ borderRadius: "8px", objectFit: "cover" }}
        />
      ),
    },

    {
      name: "Parent Category",
      selector: (row) => {
        if (row.parent === 0) return row.category_name;
        const parent = data.find((p) => p.id === row.parent);
        return parent ? parent.category_name : "Unknown";
      },
      sortable: true,
    },

    {
      name: "Child Category",
      selector: (row) => (row.parent !== 0 ? row.category_name : "—"),
      sortable: true,
    },

    // ⭐ STATUS BUTTON with TOGGLE
   {
  name: "STATUS",
  cell: (row) => (
    <div style={{ display: "flex", gap: "6px" }}>

      {/* ACTIVE / INACTIVE (sab ke liye) */}
      <button
        // onClick={() => handleStatusChange(row.id, row.status)}
        style={{
          padding: "5px 10px",
          borderRadius: "4px",
          border: "none",
           cursor: "default",
          backgroundColor: row.status == 1 ? "green" : "red",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {row.status == 1 ? "Active" : "Inactive"}
      </button>

      {/* DISPLAY LOGIC */}
      {(row.parent === 0 || row.parent === null) ? (
        // ✅ Parent category → Button
        <button
          onClick={() => handleDisplayToggle(row.id, row.is_display)}
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            border: "none",
            display: "none",
            cursor: "pointer",
            // backgroundColor: row.is_display == 1 ? "#0d6efd" : "#6c757d",
            // color: "#fff",
            fontWeight: "bold",
          }}
        >
          {row.is_display == 1 ? "" : "  "}
        </button>
      ) : (
        // ❌ Child category → Sirf text
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            backgroundColor: "#dee2e6",
            color: "#000",
            fontWeight: "bold",
            fontSize: "13px",
            display: "none",
            alignItems: "center",
          }}
        >
          
        </span>
      )}

    </div>
  ),
},


    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div style={{ display: "flex", gap: "8px" }}>
    //       <Link
    //         to={`/editcategory/${row.id}`}
    //         style={{
    //           padding: "4px 8px",
    //           backgroundColor: "#4caf50",
    //           color: "#fff",
    //           borderRadius: "4px",
    //         }}
    //       >
    //         Edit
    //       </Link>

    //       <button
    //         onClick={() => handleDelete(row.id)}
    //         style={{
    //           padding: "4px 8px",
    //           backgroundColor: "red",
    //           color: "#fff",
    //           borderRadius: "4px",
    //         }}
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   ),
    // },
  ];
// Place this inside your component, e.g., after useState declarations
const exportToCSV = (dataArray, filename = "categories.csv") => {
  if (!dataArray || !dataArray.length) {
    alert("No data to export!");
    return;
  }

  const headers = ["ID", "Parent Category", "Child Category", "Status", "Display"];
  const rows = dataArray.map((row) => [
    row.id,
    row.parent === 0 ? row.category_name : data.find((p) => p.id === row.parent)?.category_name || "Unknown",
    row.parent !== 0 ? row.category_name : "—",
    row.status === 1 ? "Active" : "Inactive",
    row.is_display === 1 ? "Display" : "No Display",
  ]);

  const csvContent =
    [headers, ...rows]
      .map((e) => e.map((v) => `"${v}"`).join(","))
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="dash-header">
        <AdminHeader />
        <Outlet />

        <h2 className="dashboard-title">My Category Overview</h2>

        <div className="container">
          <div className="text-end">
            <button
              className="btn btn-primary mb-3"
              onClick={() => exportToCSV(data)}
            >
              Export CSV
            </button>
          </div>
          {/* <div className="add-product">
            <Link to={`/addCategory`}>Add Category / SubCategory</Link>
          </div> */}

          <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            striped
            responsive
            className="custom-datagrid"
          />
        </div>
      </div>
    </div>
  );
}
