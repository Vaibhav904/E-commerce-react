// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";

// export default function AdminVendor() {
//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ Modal + state
//   const [showModal, setShowModal] = useState(false);
//   const [selectedVendor, setSelectedVendor] = useState(null);
//   const [commission, setCommission] = useState("");
//   const [verifiedIds, setVerifiedIds] = useState([]);

//   const token = localStorage.getItem("token");

//   // 🔹 Fetch Vendors
//   const getVendors = async () => {
//     try {
//       const res = await axios.get(
//         "http://tech-shop.techsaga.live/api/v1/vendor",
//         {
//          headers: {
//     Authorization: `Bearer ${token}`,
//     Accept: "application/json",
//   },
//         }
//       );

//       if (res.data.success) {
//         setVendors(res.data.data);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch vendors");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getVendors();
//   }, []);

//   // 🔹 Open Modal
//   const openModal = (vendor) => {
//     setSelectedVendor(vendor);
//     setCommission("");
//     setShowModal(true);
//   };

//   // 🔹 Verify API
//   const handleVerify = async () => {
//     if (!commission) {
//       alert("Please enter commission");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://tech-shop.techsaga.live/api/v1/vendor/verify-account",
//         {
//          headers: {
//     Authorization: `Bearer ${token}`,
//     Accept: "application/json",
//   },
//         },
//         {
//           vendor_id: selectedVendor.id,
//           account_verify: 1,
//           commission: commission,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.data.status || res.data.success) {
//         // ✅ Mark success locally
//         setVerifiedIds((prev) => [...prev, selectedVendor.id]);

//         setShowModal(false);
//         setCommission("");
//         getVendors();
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Failed to verify vendor");
//     }
//   };

//   return (
//     <div className="d-flex">
//       <AdminSidebar />

//       <div className="dash-header w-100">
//         <AdminHeader />

//         <div className="container-fluid mt-4">
//           <h2 className="dashboard-title mb-4">Vendor Listing</h2>

//           {loading && <p>Loading vendors...</p>}
//           {error && <p className="text-danger">{error}</p>}

//           {!loading && !error && (
//             <div className="table-responsive">
//               <table className="table table-bordered table-hover">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Status</th>
//                     <th>Account Status</th>
//                     <th>Total Products</th>
//                     <th>Total Orders</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {vendors.length > 0 ? (
//                     vendors.map((vendor) => (
//                       <tr key={vendor.id}>
//                         <td>{vendor.id}</td>
//                         <td>
//                           {vendor.first_name} {vendor.last_name}
//                         </td>
//                         <td>{vendor.email}</td>
//                         <td>{vendor.phone_number}</td>

//                         {/* Status */}
//                         <td>
//                           {vendor.status === 1 ? (
//                             <span className="badge bg-success">
//                               Active
//                             </span>
//                           ) : (
//                             <span className="badge bg-danger">
//                               Inactive
//                             </span>
//                           )}
//                         </td>

//                         {/* Action Button */}
//                         <td>
//                           {vendor.account_verify === 1 ||
//                           verifiedIds.includes(vendor.id) ? (
//                             <button
//                               className=" badge bg-success"
//                               disabled
//                             >
//                               Verfied
//                             </button>
//                           ) : (
//                             <button
//                               className="btn btn-warning btn-sm"
//                               onClick={() => openModal(vendor)}
//                             >
//                               Pending
//                             </button>
//                           )}
//                         </td>
//                         <td>{vendor.total_products}</td>
//                         <td>{vendor.total_purchased}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="6" className="text-center">
//                         No vendors found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* 🔥 Modal */}
//         {showModal && (
//           <div className="modal d-block">
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Verify Vendor</h5>
//                   <button
//                     className="btn-close"
//                     onClick={() => setShowModal(false)}
//                   ></button>
//                 </div>

//                 <div className="modal-body">
//                   <label>Commission (%)</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={commission}
//                     onChange={(e) => setCommission(e.target.value)}
//                     placeholder="Enter commission"
//                   />
//                 </div>

//                 <div className="modal-footer">
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="btn btn-success"
//                     onClick={handleVerify}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Backdrop */}
//         {showModal && <div className="modal-backdrop fade show"></div>}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFileExport  } from "react-icons/fa";

export default function AdminVendor() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Filter search term

  const [showModal, setShowModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [commission, setCommission] = useState("");
  const [verifiedIds, setVerifiedIds] = useState([]);
  // const { state } = useLocation();
  // const { customerId } = state || {};
  const token = localStorage.getItem("adminToken");
 const navigate = useNavigate();
  // 🔹 Fetch Vendors
  const getVendors = async (query = "") => {
    try {
      setLoading(true);
      const res = await axios.get("http://tech-shop.techsaga.live/api/v1/vendor", {
        params: {
          search: query, // ✅ Send search term to API if supported
        },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (res.data.success) {
        setVendors(res.data.data);
      } else {
        setVendors([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch vendors");
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVendors();
  }, []);

  // 🔹 Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    getVendors(query); // 🔹 Fetch filtered vendors
  };

  // 🔹 Open Modal
  const openModal = (vendor) => {
    setSelectedVendor(vendor);
    setCommission("");
    setShowModal(true);
  };

  // 🔹 Verify Vendor API
  const handleVerify = async () => {
    if (!commission) {
      alert("Please enter commission");
      return;
    }

    try {
      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/vendor/verify-account",
        {
          vendor_id: selectedVendor.id,
          account_verify: 1,
          commission: commission,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (res.data.status || res.data.success) {
        setVerifiedIds((prev) => [...prev, selectedVendor.id]);
        setShowModal(false);
        setCommission("");
        getVendors(searchTerm); // 🔹 Refresh list with current filter
      }
    } catch (err) {
      console.error(err);
      alert("Failed to verify vendor");
    }
  };

const handleDownloadCSV = () => {
  if (!vendors.length) {
    alert("No vendors to download");
    return;
  }

  // CSV headers
  const headers = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Status",
    "Account Status",
    "Total Products",
    "Total Orders",
  ];

  // CSV rows
  const rows = vendors.map((vendor) => [
    vendor.id,
    vendor.first_name,
    vendor.last_name,
    vendor.email,
    vendor.phone_number,
    vendor.status === 1 ? "Active" : "Inactive",
    vendor.account_verify === 1 || verifiedIds.includes(vendor.id)
      ? "Verified"
      : "Pending",
    vendor.total_products,
    vendor.total_purchased,
  ]);

  // Convert to CSV string
  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

  // Create blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "vendors.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const handleTotalProductsClick = (id)=>{
   console.log("Navigating to order details for customer ID:", id);
    navigate('/adminproducts', { state: { customerId: id } });
}
const handleTotalOrdersClick = (id)=>{
   console.log("Navigating to order details for Order ID:", id);
    navigate('/customer-orderlisting', { state: { vendor_id: id } });
}
// handleTotalOrdersClick


  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          <h2 className="dashboard-title mb-4">Vendor Listing</h2>

          <div className="d-flex justify-content-between mb-3">

          {/* ✅ Search Input */}
          <div className=" col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email or phone"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
            <button className="btn btn-primary mt-md-0 mt-3" onClick={handleDownloadCSV}>
            <FaFileExport  />  Download CSV
            </button>
          </div>
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
                    <th>Total Products</th>
                    <th>Total Orders</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.length > 0 ? (
                    vendors.map((vendor) => (
                      <tr key={vendor.id}>
                        <td>{vendor.id}</td>
                        <td>{vendor.first_name} {vendor.last_name}</td>
                        <td>{vendor.email}</td>
                        <td>{vendor.phone_number}</td>

                        {/* Status */}
                        <td>
                          {vendor.status === 1 ? (
                            <span className="badge bg-success">Active</span>
                          ) : (
                            <span className="badge bg-danger">Inactive</span>
                          )}
                        </td>

                        {/* Account Status */}
                        <td>
                          {vendor.account_verify === 1 || verifiedIds.includes(vendor.id) ? (
                            <button className="badge bg-success" disabled>
                              Verified
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

                        <td className="text-center">
                         <button   onClick={() =>
                                    handleTotalProductsClick(vendor.id)
                                  }  className="btn btn-link total_product">
                          {vendor.total_products}
                          </button> 
                          {/* {vendor.total_products} */}
                          </td>
                        <td className="text-center">
                          
                            <button   onClick={() =>
                                    handleTotalOrdersClick(vendor.id)
                                  }  className="btn btn-link total_order">
                          {vendor.total_purchased}
                          </button>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                            <button className="btn_details">Vendor Details</button>
                            <button className="bank_details">Bank Details</button>
                          </div>
                          </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center text-danger">
                        No vendors found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 🔹 Modal */}
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
                  <button className="btn btn-success" onClick={handleVerify}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Backdrop */}
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </div>
  );
}