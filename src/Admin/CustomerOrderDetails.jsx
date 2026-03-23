import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import NoOrderFound from '../assets/Image/common_image.png'
export default function CustomerOrderDetails() {
  const { id } = useParams();
  const fetchedRef = useRef(false);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const downloadInvoice = () => {
  fetch(order.invoice_url)
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    });
};


useEffect(() => {
    if (id) {
    
        fetchOrderDetails(id);
    
     
    }
  }, [id]);
  // useEffect(() => {
  //   if (!id || fetchedRef.current) return;
  //   fetchedRef.current = true;
  //   fetchOrderDetails();
  // }, [id]);


  // Fetch Order Details by ID
  const fetchOrderDetails = async (id) => {
    try {
      const res = await axios.get(
        `http://tech-shop.techsaga.live/api/v1/order/details/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(res.data.data); // Set the order details
    } catch (error) {
      console.log(error);
      setOrder(null); // In case of error, set order to null
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>
      <div className="text-center text-muted py-4">
                    <p>
                      <img className="cart_image" src={NoOrderFound}/>
                    </p>
                   <p className="p_tag"> No Order Found</p>
      </div>
    </div>;
  }


  // const fetchOrderDetails = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("order_id", id);

  //     const res = await axios.post(
  //       "http://tech-shop.techsaga.live/api/v1/order/details",
  //       formData,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (res.data?.status) {
  //       setOrder(res.data.data);
  //     }
  //   } catch (error) {
  //     console.error("Order fetch error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // /* ---------- UI STATES ---------- */
  // if (!token) return <Navigate to="/admin" replace />;

  // if (!id) {
  //   return <div className="text-center mt-5 text-danger">Order ID missing</div>;
  // }

  // if (loading) {
  //   return <div className="text-center mt-5">Loading order details...</div>;
  // }

  // if (!order) {
  //   return <div className="text-center mt-5 text-danger">Order not found</div>;
  // }

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
             <h2 className="dashboard-title mb-4">Order #{order.order_id}</h2>
            {/* <h2 className="dashboard-title">Order #{order.order_id}</h2> */}

           {order.invoice_url && (
  <button className="btn btn-dark" onClick={downloadInvoice}>
    Download Invoice
  </button>
)}
          </div>

          {/* INFO */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Customer Details</h5>
                <p><b>Name:</b> {order.customer_name}</p>
                <p><b>Email:</b> {order.customer_email}</p>
                <p><b>Mobile:</b> {order.customer_mobile}</p>
                <p><b>Address:</b> {order.address}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h5>Order Info</h5>
                <p>
                  <b>Status:</b>
                  <span className="badge bg-success ms-2">
                    {order.status}
                  </span>
                </p>
                <p><b>Total:</b> ₹{order.total}</p>
                <p><b>Date:</b> {order.created_at}</p>
              </div>
            </div>
          </div>

          {/* ITEMS */}
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Order Items</h5>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      {/* ✅ PRODUCT LINK (SLUG BASED) */}
                      <td>
                    <Link
  to={`/product/${item.product_slug}`}
  className="text-primary fw-semibold text-decoration-none"
>
  {item.product_name}
</Link>
                      </td>

                      <td>{item.product_description}</td>
                      <td>₹{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";

// export default function CustomerOrderDetails() {
//   // Hardcoded order details
//     const { id } = useParams(); // Capture the ID from the URL
//   const token = localStorage.getItem("token");

//   const [order, setOrder] = useState({
//     order_id: 12345,
//     customer_name: "John Doe",
//     customer_email: "johndoe@example.com",
//     customer_mobile: "9876543210",
//     address: "123, Main Street, City, Country",
//     status: "Completed",
//     total: 1500,
//     created_at: "2023-03-21",
//     invoice_url: "http://example.com/invoice.pdf",
//     items: [
//       {
//         product_name: "Product 1",
//         product_description: "Description of Product 1",
//         price: 500,
//         quantity: 2,
//         subtotal: 1000,
//       },
//       {
//         product_name: "Product 2",
//         product_description: "Description of Product 2",
//         price: 500,
//         quantity: 1,
//         subtotal: 500,
//       },
//     ],
//   });

//   // Download Invoice
//   const downloadInvoice = () => {
//     if (order?.invoice_url) {
//       fetch(order.invoice_url)
//         .then((res) => res.blob())
//         .then((blob) => {
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement("a");
//           a.href = url;
//           a.download = "invoice.pdf";
//           a.click();
//           window.URL.revokeObjectURL(url);
//         })
//         .catch((err) => console.error("Invoice download failed:", err));
//     }
//   };





//    // Fetch Order Details by ID
//   const fetchOrderDetails = async (id) => {
//     try {
//       const res = await axios.get(
//         `http://tech-shop.techsaga.live/api/v1/order/details/${id}`,
//         {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setOrder(res.data.data); // Set the order details
//     } catch (error) {
//       console.log(error);
//       setOrder(null); // In case of error, set order to null
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!order) {
//     return <div>No order found</div>;
//   }



//       useEffect(() => {
//     if (id) {
//       fetchOrderDetails(id);
//     }
//   }, [id]);



//   return (
//     <div className="d-flex">
//       <AdminSidebar />
//       <div className="dash-header w-100">
//         <AdminHeader />
//         <div className="container-fluid mt-4">
//           {/* HEADER
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h2 className="dashboard-title">Order #{order.order_id}</h2>

//             {order.invoice_url && (
//               <button className="btn btn-dark" onClick={downloadInvoice}>
//                 Download Invoice
//               </button>
//             )}
//           </div> */}

//           {/* INFO */}
//           {/* <div className="row mb-4">
//             <div className="col-md-4">
//               <div className="card shadow-sm p-3">
//                 <h5>Customer Details</h5>
//                 <p><b>Name:</b> {order.customer_name}</p>
//                 <p><b>Email:</b> {order.customer_email}</p>
//                 <p><b>Mobile:</b> {order.customer_mobile}</p>
//                 <p><b>Address:</b> {order.address}</p>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="card shadow-sm p-3">
//                 <h5>Order Info</h5>
//                 <p>
//                   <b>Status:</b>
//                   <span className="badge bg-success ms-2">{order.status}</span>
//                 </p>
//                 <p><b>Total:</b> ₹{order.total}</p>
//                 <p><b>Date:</b> {order.created_at}</p>
//               </div>
//             </div>
//           </div> */}

//           {/* ITEMS */}
//           <div className="card shadow-sm">
//             <div className="card-header">
//               <h5 className="mb-0">Order Items</h5>
//             </div>

//             <div className="table-responsive">
//               <table className="table table-bordered mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>Product</th>
//                     <th>Description</th>
//                     <th>Price</th>
//                     <th>Qty</th>
//                     <th>Subtotal</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {order.items.map((item, index) => (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       {/* Show Product Name */}
//                       <td>{item.product_name}</td>
//                       <td>{item.product_description}</td>
//                       <td>₹{item.price}</td>
//                       <td>{item.quantity}</td>
//                       <td>₹{item.subtotal}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }