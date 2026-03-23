import { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function VendorProfile() {
  const [profile, setProfile] = useState(null);

  const vendorToken = localStorage.getItem("vendorToken");

  const fetchProfile = () => {
    axios
      .get("http://tech-shop.techsaga.live/api/v1/vendor-profile", {
        headers: {
          Authorization: `Bearer ${vendorToken}`,
        },
      })
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          <div className="text-center mb-4">
            <h2 className="dashboard-title mb-5">Vendor Profile</h2>
          </div>

          {profile && (
            <div className="row">
              
              {/* LEFT SIDE - FORM */}
              <div className="col-md-8">
                <div className="card p-4 shadow-sm border-0 rounded-4">
                  <h5 className="mb-3 fw-semibold text-primary">
                    Profile Details
                  </h5>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input
                        className="form-control"
                        value={profile.first_name || ""}
                        disabled
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input
                        className="form-control"
                        value={profile.last_name || ""}
                        disabled
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        value={profile.email || ""}
                        disabled
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        value={profile.phone_number || ""}
                        disabled
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Business Name</label>
                      <input
                        className="form-control"
                        value={profile.business_name || ""}
                        disabled
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">GSTIN</label>
                      <input
                        className="form-control"
                        value={profile.gstin_no || ""}
                        disabled
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Business Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={profile.business_description || ""}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - INFO CARD */}
            <div className="col-md-4">
  <div
    className="card border-0 rounded-4 p-4"
    style={{
      background: "#f8f9ff", // ✅ soft pastel
      boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
    }}
  >
    {/* Profile Circle */}
    <div className="text-center mb-3">
      <div
        className="mx-auto d-flex align-items-center justify-content-center"
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background: "#e0e7ff", // pastel circle
          color: "#4f46e5",
          fontSize: "26px",
          fontWeight: "600",
        }}
      >
        {profile.first_name?.charAt(0)}
      </div>
    </div>

    {/* Seller Name */}
    <div className="text-center mb-2">
      <h5 className="fw-semibold mb-1" style={{ color: "#2d2d2d" }}>
        {profile.name || "N/A"}
      </h5>
      <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
        Seller Account
      </p>
    </div>

    {/* Business Name Badge */}
    <div className="text-center my-3">
      <span
        style={{
          background: "#eef2ff",
          color: "#4f46e5",
          padding: "6px 14px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "500",
        }}
      >
        {profile.business_name || "No Business Name"}
      </span>
    </div>

    <hr />

    {/* Info */}
    <div style={{ fontSize: "14px", color: "#555" }}>
      <div className="mb-2">
        <strong>Email:</strong>
        <div className="text-muted">{profile.email}</div>
      </div>

      <div className="mb-2">
        <strong>Phone:</strong>
        <div className="text-muted">{profile.phone_number}</div>
      </div>

      <div>
        <strong>GSTIN:</strong>
        <div className="text-muted">
          {profile.gstin_no || "Not Available"}
        </div>
      </div>
    </div>
  </div>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}