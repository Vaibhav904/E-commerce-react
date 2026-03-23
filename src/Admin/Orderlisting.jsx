// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from 'react-router-dom';

// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";
// import { Link } from "react-router-dom";

// export default function Orderlisting() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState(null);
//   const [page, setPage] = useState(1);
//  const { state } = useLocation(); // Get the state passed during navigation
//   const { customerId } = state || {}; // Get customerId from the state
//   const token = localStorage.getItem("token");

//   const fetchOrders = async (pageNo = 1) => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         `http://tech-shop.techsaga.live/api/v1/orders?page=${pageNo}`,
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setOrders(res.data.data);
//       setPagination(res.data.pagination);
//       setLoading(false);
//     } catch (error) {
//       console.error("Order fetch error:", error.response || error);
//       setLoading(false);
//     }
//   };


  
//   const customerfetchOrders = async (pageNo = 1) => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         `http://tech-shop.techsaga.live/api/v1/orders?page=${pageNo}`,
//         {
//           params: {
//             customer_id: customerId, 
//           },
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setOrders(res.data.data);
//       setPagination(res.data.pagination);
//       setLoading(false);
//     } catch (error) {
//       console.error("Order fetch error:", error.response || error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {

//       // Now you can use customerId to fetch the customer's order details, for example.
//   console.log("Customer ID:", customerId);
//     // console.log('whfuisdbvsiudbsidcb', id)
//     if (token) {
//       // fetchOrders(page);
//        customerfetchOrders(page);
//     } else {
//       console.error("No auth token found");
//     }
//   }, [page, token]);

//   return (
//     <div className="d-flex">
//       <AdminSidebar />

//       <div className="dash-header w-100">
//         <AdminHeader />

//         <div className="container-fluid mt-4">
//           <h2 className="dashboard-title mb-4">
//             Customer Order Listing
//           </h2>

//           {loading ? (
//             <p>Loading orders...</p>
//           ) : (
//             <>
//               <table className="table table-bordered">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>Order ID</th>
//                     <th>Customer Name</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                     <th>Total</th>
//                     <th>Items</th>
//                     <th>Vendor Name</th>
//                     <th>View</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {orders.map((order) => (
//                     <tr key={order.order_id}>
//                       <td>#{order.order_id}</td>
//                       <td>  {order.customer_name} </td>
//                       <td>{order.created_at}</td>
//                       <td>
//                         <span className="badge bg-success">
//                           {order.status}
//                         </span>
//                       </td>
//                       <td>₹ {order.total}</td>
//                       <td>
//                         <ul className="mb-0">
//                           {order.items.map((item, i) => (
//                             <li key={i}>
//                               {item.product_name} × {item.quantity}
//                             </li>
//                           ))}
//                         </ul>
//                       </td>
//                       <td>
//                         {order?.items?.[0]?.vendor_name}
//                       </td>

//                       <td>
//                         {/* <a
//                           href={order.invoice_url}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="btn btn-sm btn-primary"
//                         >
//                           View Invoice
//                         </a> */}
//                       <Link
//   to={`/orderdetails/${order.order_id}`}
//   className="btn btn-sm btn-primary"
// >
//   View Order Details
// </Link>

//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Pagination */}
//               {pagination && (
//                 <div className="d-flex justify-content-end gap-2">
//                   <button
//                     className="btn btn-sm btn-outline-secondary"
//                     disabled={!pagination.prev_page}
//                     onClick={() => setPage(page - 1)}
//                   >
//                     Prev
//                   </button>

//                   <span className="btn btn-sm btn-light disabled">
//                     Page {pagination.current_page} of{" "}
//                     {pagination.last_page}
//                   </span>

//                   <button
//                     className="btn btn-sm btn-outline-secondary"
//                     disabled={!pagination.next_page}
//                     onClick={() => setPage(page + 1)}
//                   >
//                     Next
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation, Link } from "react-router-dom";

// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";

// export default function Orderlisting() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState(null);
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState(""); // Search term state

//   const { state } = useLocation();
//   const { customerId } = state || {};
//   const token = localStorage.getItem("token");

//   // Fetch orders filtered by customerId and searchTerm
//   const customerfetchOrders = async (pageNo = 1, query = "") => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`http://tech-shop.techsaga.live/api/v1/orders?page=${pageNo}`, {
//         params: {
//           customer_id: customerId,
//           search: query,
//         },
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setOrders(res.data.data);
//       setPagination(res.data.pagination);
//       setLoading(false);
//     } catch (error) {
//       console.error("Order fetch error:", error.response || error);
//       setOrders([]);
//       setPagination(null);
//       setLoading(false);
//     }
//   };

//   // Handle search input
//   const handleSearch = (event) => {
//     const query = event.target.value;
//     setSearchTerm(query);
//     customerfetchOrders(1, query); // Reset to page 1 when searching
//     setPage(1);
//   };

//   useEffect(() => {
//     if (token) {
//       customerfetchOrders(page, searchTerm);
//     } else {
//       console.error("No auth token found");
//     }
//   }, [page, token]);
// // ================= DOWNLOAD CSV =================
// const handleDownloadCSV = () => {
//   if (!orders.length) {
//     alert("No orders to download");
//     return;
//   }

//   // CSV header
//   const headers = [
//     "Order ID",
//     "Customer Name",
//     "Date",
//     "Status",
//     "Total",
//     "Items",
//     "Vendor Name",
//   ];

//   // CSV rows
//   const rows = orders.map((order) => [
//     order.order_id,
//     order.customer_name,
//     order.created_at,
//     order.status,
//     order.total,
//     order.items.map((item) => `${item.product_name} × ${item.quantity}`).join(" | "),
//     order?.items?.[0]?.vendor_name || "",
//   ]);

//   // Convert array to CSV string
//   const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

//   // Create a blob and trigger download
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", "customer_orders.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
//   return (
//     <div className="d-flex">
//       <AdminSidebar />
//       <div className="dash-header w-100">
//         <AdminHeader />

//         <div className="container mt-4">
//           <h2 className="dashboard-title mb-4">Customer Order Listing</h2>
// <div className="d-flex justify-content-between mb-3">
//           {/* Search Input */}
//           <div className="col-md-3">
//             <input
//               type="text"
//               placeholder="Search by product or order ID"
//               value={searchTerm}
//               onChange={handleSearch}
//               className="form-control"
//             />
//           </div>
//           <button className="btn btn-primary mt-md-0 mt-3 " onClick={handleDownloadCSV}>
//     Download CSV
//   </button>
// </div>
//           {loading ? (
//             <p>Loading orders...</p>
//           ) : (
//             <>
//               <table className="table table-bordered">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>Order ID</th>
//                     <th>Customer Name</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                     <th>Total</th>
//                     <th>Items</th>
//                     <th>Vendor Name</th>
//                     <th>View</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {orders.length === 0 ? (
//                     <tr>
//                       <td colSpan="8" className="text-center text-danger">
//                         No orders found
//                       </td>
//                     </tr>
//                   ) : (
//                     orders.map((order) => (
//                       <tr key={order.order_id}>
//                         <td>#{order.order_id}</td>
//                         <td>{order.customer_name}</td>
//                         <td>{order.created_at}</td>
//                         <td>
//                           <span className="badge bg-success">{order.status}</span>
//                         </td>
//                         <td>₹ {order.total}</td>
//                         <td>
//                           <ul className="mb-0">
//                             {order.items.map((item, i) => (
//                               <li key={i}>
//                                 {item.product_name} × {item.quantity}
//                               </li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td>{order?.items?.[0]?.vendor_name}</td>
//                         <td>
//                           <Link
//                             to={`/orderdetails/${order.order_id}`}
//                             className="btn btn-sm btn-primary"
//                           >
//                             View Order Details
//                           </Link>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>

//               {/* Pagination */}
//               {pagination && orders.length > 0 && (
//                 <div className="d-flex justify-content-end gap-2">
//                   <button
//                     className="btn btn-sm btn-outline-secondary"
//                     disabled={!pagination.prev_page}
//                     onClick={() => setPage(page - 1)}
//                   >
//                     Prev
//                   </button>

//                   <span className="btn btn-sm btn-light disabled">
//                     Page {pagination.current_page} of {pagination.last_page}
//                   </span>

//                   <button
//                     className="btn btn-sm btn-outline-secondary"
//                     disabled={!pagination.next_page}
//                     onClick={() => setPage(page + 1)}
//                   >
//                     Next
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { FaFileExport  } from "react-icons/fa";

export default function Orderlisting() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");

  const { state } = useLocation();
  const { customerId } = state || {};
  const { vendor_id } = state || {};
  console.log('vendor_id', vendor_id);
  const token = localStorage.getItem("token");

  // ================= FETCH ORDERS =================
  const customerfetchOrders = async (pageNo = 1, query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://tech-shop.techsaga.live/api/v1/orders?page=${pageNo}`,
        {
          params: {
            customer_id: customerId,
            vendor_id: vendor_id,
            search: query,
          },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data.data);
      setPagination(res.data.pagination);
      setLoading(false);
    } catch (error) {
      console.error("Order fetch error:", error.response || error);
      setOrders([]);
      setPagination(null);
      setLoading(false);
    }
  };

  // ================= SEARCH =================
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    setPage(1);
    customerfetchOrders(1, query);
  };

  useEffect(() => {
    if (token) {
      customerfetchOrders(page, searchTerm);
    }
  }, [page, token]);

  // ================= UPDATE STATUS =================
  const handleStatusUpdate = async () => {
    if (!orderStatus) {
      alert("Please select status");
      return;
    }

    try {
      await axios.post(
        "http://tech-shop.techsaga.live/api/v1/order/orders-status",
        {
          order_id: selectedOrderId,
          order_status: orderStatus,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order status updated successfully");

      setShowModal(false);
      setOrderStatus("");

      customerfetchOrders(page, searchTerm);
    } catch (error) {
      console.error("Status update error:", error.response || error);
      alert("Failed to update status");
    }
  };

  // ================= DOWNLOAD CSV =================
  const handleDownloadCSV = () => {
    if (!orders.length) {
      alert("No orders to download");
      return;
    }

    const headers = [
      "Order ID",
      "Customer Name",
      "Date",
      "Status",
      "Total",
      "Items",
      "Vendor Name",
    ];

    const rows = orders.map((order) => [
      order.order_id,
      order.customer_name,
      order.created_at,
      order.status,
      order.total,
      order.items
        .map((item) => `${item.product_name} × ${item.quantity}`)
        .join(" | "),
      order?.items?.[0]?.vendor_name || "",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "customer_orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          <h2 className="dashboard-title mb-4">
            Customer Order Listing
          </h2>

          <div className="d-flex justify-content-between mb-3">
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Search by product or order ID"
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

          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <>
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Items</th>
                    <th>Vendor Name</th>
                    <th>View</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center text-danger">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.order_id}>
                        <td>#{order.order_id}</td>
                        <td>{order.customer_name}</td>
                        <td>{order.created_at}</td>
                        <td>
                          <span className="badge bg-success">
                            {order.status}
                          </span>
                        </td>
                        <td>₹ {order.total}</td>

                        <td>
                          <ul className="mb-0">
                            {order.items.map((item, i) => (
                              <li key={i}>
                                {item.product_name} × {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </td>

                        <td>{order?.items?.[0]?.vendor_name}</td>

                        <td>
                          <Link
                            to={`/orderdetails/${order.order_id}`}
                            className="btn btn-sm btn-primary"
                          >
                            View
                          </Link>
                        </td>

                        <td>
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => {
                              setSelectedOrderId(order.order_id);
                              setShowModal(true);
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {pagination && orders.length > 0 && (
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    disabled={!pagination.prev_page}
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </button>

                  <span className="btn btn-sm btn-light disabled">
                    Page {pagination.current_page} of{" "}
                    {pagination.last_page}
                  </span>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    disabled={!pagination.next_page}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Update Order Status</h5>
              <button
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <div className="modal-body">
              <label className="form-label">Select Status</label>
              <select
                className="form-select"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>

              <button
                className="btn btn-primary"
                onClick={handleStatusUpdate}
              >
                Update Status
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}