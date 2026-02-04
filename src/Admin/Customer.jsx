import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ================= FETCH CUSTOMERS =================
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/v1/customers",
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

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          <h2 className="dashboard-title mb-4">Customer Overview</h2>

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
                        <th>Status</th>
                        <th>Verified</th>
                        <th>Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.first_name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone_number}</td>

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

                          <td>
                            {new Date(item.created_at).toLocaleDateString()}
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
