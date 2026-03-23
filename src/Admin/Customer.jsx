import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import { FaFileExport  } from "react-icons/fa";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Added search term state

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
const navigate = useNavigate();
  useEffect(() => {
    fetchCustomers();
  }, []);

  // ================= FETCH CUSTOMERS =================
  const fetchCustomers = async (query = "") => {
    try {
      const res = await axios.get(
        `http://tech-shop.techsaga.live/api/v1/customers?search=${query}`, // API with search query

        // "http://tech-shop.techsaga.live/api/v1/customers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCustomers(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


 // ================= HANDLE SEARCH =================
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    fetchCustomers(query); // Fetch filtered customers
  };

  // ================= STATUS TOGGLE =================
  const handleStatusChange = async (id, currentStatus) => {
    // 🔁 STRING → NUMBER
    // const newStatus = currentStatus === "active" ? 1 : 1;

    try {
      const result = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/customers/customerStatus",
        {
          customer_id: id, // ✅ correct key
          status: !currentStatus?1:0, // ✅ 0 / 1 only
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (result?.status === 200) {
        fetchCustomers();
      }

      // 🔥 UI update (number → string)
      // setCustomers((prev) =>
      //   prev.map((item) =>
      //     item.id === id
      //       ? { ...item, status: newStatus === 1 ? "active" : "inactive" }
      //       : item
      //   )
      // );
    } catch (error) {
      console.log(error.response?.data); // 👈 backend message
      alert("Status update failed");
    }
  };

 const handleOrderDetailsClick = (id) => {
    // Logging the customer ID (just for debugging)
    console.log("Navigating to order details for customer ID:", id);
    
    // Navigating with the customer id passed to the order details page
    navigate('/customer-orderlisting', { state: { customerId: id } });
  };


// ================= DOWNLOAD CSV =================
const handleDownloadCSV = () => {
  if (!customers.length) {
    alert("No data to download");
    return;
  }

  // CSV header
  const headers = ["ID", "Name", "Email", "Phone", "Status", "Verified", "Orders Count"];

  // CSV rows
  const rows = customers.map((item) => [
    item.id,
    item.name,
    item.email,
    item.phone_number,
    item.status === 1 ? "Active" : "Inactive",
    item.is_verified === 1 ? "Verified" : "Not Verified",
    item.orders?.length || 0,
  ]);

  // Convert array to CSV string
  const csvContent =
    [headers, ...rows]
      .map((e) => e.join(","))
      .join("\n");

  // Create a blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "customers.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const formatDate = (timestamp) => {
  const date = new Date(timestamp); // Parse ISO string
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format with AM/PM
  });
};
  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          <h2 className="dashboard-title mb-4">Customer Overview</h2>
          <div className="d-flex justify-content-between mb-4">
          <div className=" col-md-3">
            <input
              type="text"
              placeholder="Search by name, email, or phone"
              value={searchTerm}
              onChange={handleSearch}
              className="form-control"
            />
            
          </div>
          <button
            className="btn btn-primary mt-md-0 mt-3"
            onClick={handleDownloadCSV}
          >
          <FaFileExport  />  Download CSV
          </button>
        </div>
          <div className="card shadow-sm">
            <div className="card-body">
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Verified</th>
                        <th>Orders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone_number}</td>
                          <td>{formatDate(item.created_at)}</td>

                          {/* ===== ACTIVE / INACTIVE BUTTON ===== */}
                          <td>
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, item.status)
                              }
                              style={{
                                padding: "6px 14px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                backgroundColor:
                                  item.status === 1 ? "#28a745" : "#dc3545",
                                color: "#fff",
                                fontWeight: "600",
                              }}
                            >
                              {item.status === 1 ? "Active" : "Inactive"}
                            </button>
                          </td>

                          {/* ===== VERIFIED ===== */}
                          <td>
                            {item.is_verified === 1 ? (
                              <span className="badge bg-success">Verified</span>
                            ) : (
                              <span className="badge bg-secondary">
                                Not Verified
                              </span>
                            )}
                          </td>

                          {/* <td>
                             {item.orders?.length === 0 ? (
                            <p>No Orders</p>
                          ) : (
                           
                            <button
                                onClick={() => handleOrderDetailsClick(item.id)} // Trigger the click handler
                                className="btn btn-link"
                              >
                                Order Details
                              </button>
                          )}
                         
                          </td> */}
                          <td>
                              {item.orders?.length === 0 ? (
                                <p>No Orders</p>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleOrderDetailsClick(item.id)
                                  }
                                  className="btn btn-link"
                                >
                                  Order Details
                                </button>
                              )}
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
