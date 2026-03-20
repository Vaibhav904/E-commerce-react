import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminVendor() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Modal + state
  const [showModal, setShowModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [commission, setCommission] = useState("");
  const [verifiedIds, setVerifiedIds] = useState([]);

  const token = localStorage.getItem("token");

  // 🔹 Fetch Vendors
  const getVendors = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/v1/vendor",
        {
         headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
        }
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

  // 🔹 Open Modal
  const openModal = (vendor) => {
    setSelectedVendor(vendor);
    setCommission("");
    setShowModal(true);
  };

  // 🔹 Verify API
  const handleVerify = async () => {
    if (!commission) {
      alert("Please enter commission");
      return;
    }

    try {
      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/vendor/verify-account",
        {
         headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
        },
        {
          vendor_id: selectedVendor.id,
          account_verify: 1,
          commission: commission,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.status || res.data.success) {
        // ✅ Mark success locally
        setVerifiedIds((prev) => [...prev, selectedVendor.id]);

        setShowModal(false);
        setCommission("");
        getVendors();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to verify vendor");
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          <h2 className="dashboard-title mb-4">Vendor Listing</h2>

          {loading && <p>Loading vendors...</p>}
          {error && <p className="text-danger">{error}</p>}

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
                    <th>Account Status</th>
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

                        {/* Status */}
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

                        {/* Action Button */}
                        <td>
                          {vendor.account_verify === 1 ||
                          verifiedIds.includes(vendor.id) ? (
                            <button
                              className=" badge bg-success"
                              disabled
                            >
                              Verfied
                            </button>
                          ) : (
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => openModal(vendor)}
                            >
                              Pending
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No vendors found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 🔥 Modal */}
        {showModal && (
          <div className="modal d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Verify Vendor</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <label>Commission (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                    placeholder="Enter commission"
                  />
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={handleVerify}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backdrop */}
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </div>
  );
}