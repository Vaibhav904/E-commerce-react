import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

export default function OrderDetails() {
  const { id } = useParams();
  const fetchedRef = useRef(false);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
const makeSlug = (text) =>
  text
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  useEffect(() => {
    if (!id || fetchedRef.current) return;
    fetchedRef.current = true;
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const formData = new FormData();
      formData.append("order_id", id);

      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/v1/order/details",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.status) {
        setOrder(res.data.data);
      }
    } catch (error) {
      console.error("Order fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI STATES ---------- */
  if (!token) return <Navigate to="/admin" replace />;

  if (!id) {
    return <div className="text-center mt-5 text-danger">Order ID missing</div>;
  }

  if (loading) {
    return <div className="text-center mt-5">Loading order details...</div>;
  }

  if (!order) {
    return <div className="text-center mt-5 text-danger">Order not found</div>;
  }

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="dashboard-title">Order #{order.order_id}</h2>

            {order.invoice_url && (
              <a
                href={order.invoice_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-dark"
              >
                Download Invoice
              </a>
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
    to={`/product/${makeSlug(item.product_name)}`}
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
