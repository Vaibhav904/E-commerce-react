import { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function VendorProfile() {
  const [errors, setErrors] = useState({});
  const [bankDetails, setBankDetails] = useState(null);
const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
const [toastType, setToastType] = useState("success"); // success / danger
  const [Bank, setBank] = useState({
    accountHolder: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
      accountType: ""
  })
const validate = () => {
  let newErrors = {};

  if (!Bank.accountHolder) newErrors.accountHolder = "Account holder required";
  if (!Bank.accountNumber || Bank.accountNumber.length < 9 || Bank.accountNumber.length > 18)
    newErrors.accountNumber = "Account number must be 9–18 digits";
  if (!Bank.ifscCode || Bank.ifscCode.length !== 11)
    newErrors.ifscCode = "IFSC code must be 11 characters";
  if (!Bank.bankName) newErrors.bankName = "Bank name required";
  if (!Bank.accountType) newErrors.accountType = "Select account type";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
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
      fetchBankDetails(); // 👈 add this

  }, []);
  const handleChange = (e)=>{
    const {name , value}=e.target;
    setBank((Bank) =>({
      ...Bank,
      [name]:value
    }));
  }
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!validate()) return;

//   setLoading(true);
//   setErrors({});

//   try {
//     const res = await axios.post(
//       "http://tech-shop.techsaga.live/api/v1/vendor/bank-details",
//       {
//         account_holder_name: Bank.accountHolder,
//         account_number: Bank.accountNumber,
//         ifsc_code: Bank.ifscCode,
//         bank_name: Bank.bankName,
//         account_type: Bank.accountType,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${vendorToken}`,
//         },
//       }
//     );

//     setToastType("success");
//     setToastMessage(res.data.message);

//     // reset form
//     setBank({
//       accountHolder: "",
//       accountNumber: "",
//       ifscCode: "",
//       bankName: "",
//       accountType: ""
//     });

//   } catch (err) {
//     if (err.response?.data?.errors) {
//       const backendErrors = err.response.data.errors;
//       setErrors({
//         accountNumber: backendErrors.account_number?.[0],
//         ifscCode: backendErrors.ifsc_code?.[0],
//       });
//     }

//     setToastType("danger");
//     setToastMessage("Failed to submit. Please check the form.");
//   } finally {
//     setLoading(false);
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);
  setErrors({});

  try {
    const res = await axios.post(
      "http://tech-shop.techsaga.live/api/v1/vendor/bank-details",
      {
        account_holder_name: Bank.accountHolder,
        account_number: Bank.accountNumber,
        ifsc_code: Bank.ifscCode,
        bank_name: Bank.bankName,
        account_type: Bank.accountType,
      },
      {
        headers: {
          Authorization: `Bearer ${vendorToken}`,
        },
      }
    );

    // ✅ Success toast
    setToastType("success");
    setToastMessage(res.data.message || "Bank details submitted successfully!");

    // reset form
    setBank({
      accountHolder: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      accountType: ""
    });

  } catch (err) {
    if (err.response?.data?.errors) {
      const backendErrors = err.response.data.errors;
      setErrors({
        accountNumber: backendErrors.account_number?.[0],
        ifscCode: backendErrors.ifsc_code?.[0],
      });
    }

    // ❌ Error toast
    setToastType("danger");
    setToastMessage(
      err.response?.data?.message ||
        "Failed to submit. Please check the form."
    );
  } finally {
    setLoading(false);
  }
};


const fetchBankDetails = () => {
  axios
    .get("http://tech-shop.techsaga.live/api/v1/vendor/bank-details", {
      headers: {
        Authorization: `Bearer ${vendorToken}`,
      },
    })
    .then((res) => {
      setBankDetails(res.data.data);
    })
    .catch((err) => {
      console.error("Error fetching bank details:", err);
    });
};

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
                {/* bank details */}
                     <div className="card p-4 shadow-sm border-0 rounded-4 my-4">
                  <h5 className="mb-3 fw-semibold text-primary">
                    Bank Details
                  </h5>
                  <form className="" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Account Holder Name</label>
                      <input
                        className="form-control"
                        name="accountHolder"
                        value={Bank.accountHolder}
                        onChange={handleChange}
                      />
                      
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Account Number</label>
                      <input
                        type="number"

                        className="form-control"
                        name="accountNumber"
                        value={Bank.accountNumber}
                        onChange={handleChange}
                      />
                      {errors.accountNumber && <p className="text-danger">{errors.accountNumber}</p>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">IFSC Code</label>
                      <input
                        className="form-control"
                        name="ifscCode"
                        value={Bank.ifscCode}
                        onChange={handleChange}
                      />
                      {errors.ifscCode && <p className="text-danger">{errors.ifscCode}</p>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Bank Name</label>
                      <input
                        className="form-control"
                        name="bankName"
                        value={Bank.bankName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Account Type</label>
                      <select
                        className="form-control"
                        name="accountType"
                        value={Bank.accountType}
                        onChange={handleChange}>

                        <option value="">Select Account Type</option>
                        <option value="savings">Savings</option>
                        <option value="current">Current</option>

                      </select>
                    </div>
                  </div>
                  <div className="my-3">
                   <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                  {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                  </div>
                  </form>
                </div>
                {/* bank details */}
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
              <div>
                {bankDetails && (
  <>
    <hr />

    <h6 className="fw-semibold mb-3 text-primary">
      Bank Details
    </h6>

    <div style={{ fontSize: "14px", color: "#555" }}>
      <div className="mb-2">
        <strong>Account Holder:</strong>
        <div className="text-muted">
          {bankDetails.account_holder_name}
        </div>
      </div>

      <div className="mb-2">
        <strong>Account Number:</strong>
        <div className="text-muted">
          ****{bankDetails.account_number.slice(-4)}
        </div>
      </div>

      <div className="mb-2">
        <strong>IFSC:</strong>
        <div className="text-muted">
          {bankDetails.ifsc_code}
        </div>
      </div>

      <div className="mb-2">
        <strong>Bank Name:</strong>
        <div className="text-muted">
          {bankDetails.bank_name}
        </div>
      </div>

      <div className="mb-2">
        <strong>Account Type:</strong>
        <div className="text-muted text-capitalize">
          {bankDetails.account_type}
        </div>
      </div>

      <div className="mb-2">
        <strong>Status:</strong>
        <div
          className={`badge ${
            bankDetails.status === "active"
              ? "bg-success"
              : "bg-secondary"
          }`}
        >
          {bankDetails.status}
        </div>
      </div>

      <div>
        <strong>Verification:</strong>
        <div
          className={`badge ${
            bankDetails.is_verified
              ? "bg-success"
              : "bg-warning text-dark"
          }`}
        >
          {bankDetails.is_verified ? "Verified" : "Pending"}
        </div>
      </div>
    </div>
  </>
)}
{!bankDetails && (
  <p className="text-muted text-center mt-3">
    No bank details added yet.
  </p>
)}
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
      <div
  aria-live="polite"
  aria-atomic="true"
  className="position-relative"
  style={{ minHeight: "100px" }}
>
  <div className="toast-container position-fixed top-0 end-0 p-3">
    {toastMessage && (
      <div
        className={`toast show align-items-center text-bg-${toastType} border-0`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{toastMessage}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() => setToastMessage("")}
            aria-label="Close"
          ></button>
        </div>
      </div>
    )}
  </div>
</div>
    </div>
  );
}