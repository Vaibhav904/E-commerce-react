import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Order() {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/v1/category/categoryListing",
        {
          headers: { Authorization: `Bearer ${token}` },
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
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
          // ❌ Content-Type MAT DO
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
  const handleStatusChange = async (id, currentStatus) => {
    // 🔥 0 → 1 और 1 → 0
    const updatedStatus = currentStatus == 1 ? 0 : 1;

    try {
      await axios.post(
        "http://tech-shop.techsaga.live/api/v1/category/statusCategory",
        {
          category_id: id,
          status: updatedStatus, // 👈 API को नया status भेज रहे हैं
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 🔥 UI में तुरंत update
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: updatedStatus } : item
        )
      );
    } catch (error) {
      alert("Failed to update status!");
      console.log(error);
    }
  };

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
        onClick={() => handleStatusChange(row.id, row.status)}
        style={{
          padding: "5px 10px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
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
            cursor: "pointer",
            backgroundColor: row.is_display == 1 ? "#0d6efd" : "#6c757d",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {row.is_display == 1 ? "Display" : "No Display"}
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


    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Link
            to={`/editcategory/${row.id}`}
            style={{
              padding: "4px 8px",
              backgroundColor: "#4caf50",
              color: "#fff",
              borderRadius: "4px",
            }}
          >
            Edit
          </Link>

          <button
            onClick={() => handleDelete(row.id)}
            style={{
              padding: "4px 8px",
              backgroundColor: "red",
              color: "#fff",
              borderRadius: "4px",
            }}
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

        <h2 className="dashboard-title">Category Overview</h2>

        <div className="container">
          <div className="add-product">
            <Link to={`/addCategory`}>Add Category / SubCategory</Link>
          </div>

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
