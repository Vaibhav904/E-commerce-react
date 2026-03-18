import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminVendor() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const token = localStorage.getItem("token");
  // API Call
  const getVendors = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/v1/vendor",
          {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.success) {
        setVendors(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVendors();
  }, []);

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          <h2 className="dashboard-title mb-4">Vendor Listing</h2>

          {/* Loading */}
          {loading && <p>Loading vendors...</p>}

          {/* Error */}
          {error && <p className="text-danger">{error}</p>}

          {/* Table */}
          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {vendors.length > 0 ? (
                    vendors.map((vendor) => (
                      <tr key={vendor.id}>
                        <td>{vendor.id}</td>
                        <td>
                          {vendor.first_name} {vendor.last_name}
                        </td>
                        <td>{vendor.email}</td>
                        <td>{vendor.phone_number}</td>
                        <td>
                          {vendor.status === 1 ? (
                            <span className="badge bg-success">
                              Active
                            </span>
                          ) : (
                            <span className="badge bg-danger">
                              Inactive
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No vendors found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 