import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";

export default function Orderlisting() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  const token = localStorage.getItem("token");

  const fetchOrders = async (pageNo = 1) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://tech-shop.techsaga.live/api/v1/orders?page=${pageNo}`,
        {
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders(page);
    } else {
      console.error("No auth token found");
    }
  }, [page, token]);

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          <h2 className="dashboard-title mb-4">
            Customer Order Listing
          </h2>

          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <>
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Items</th>
                    <th>Invoice</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.order_id}>
                      <td>#{order.order_id}</td>
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

                      <td>
                        {/* <a
                          href={order.invoice_url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-primary"
                        >
                          View Invoice
                        </a> */}
                      <Link
  to={`/orderdetails/${order.order_id}`}
  className="btn btn-sm btn-primary"
>
  View Order Details
</Link>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {pagination && (
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
    </div>
  );
}
