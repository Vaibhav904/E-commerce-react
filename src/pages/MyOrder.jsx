import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useLocation } from "react-router-dom";
import NoorderFound from '../assets/Image/common_image.png';
export default function MyOrder() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();


  useEffect(() => {
  if (location.state?.orders) {
    setOrders(location.state.orders);
    setLoading(false);
  } else {
    fetchOrders();
  }
}, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/my-order",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.data || []);
    } catch (error) {
      console.log("Order Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading Orders...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Orders</h2>
      <div className="row">

      {orders.length === 0 ? (
        <div className="text-center">
          <p><img src={NoorderFound}/></p>
        <p className="p_tag mb-5">No Orders Found</p>
        </div>
      ) : (
        orders.map((order) => (
          <div className="col-md-6">
          <div
            key={order.order_id}
            className="card mb-4 shadow-sm border-0"
            style={{ borderRadius: "10px" }}
          >
            <div className="card-header bg-light d-flex justify-content-between mb-0">
              <div>
                <strong>Order ID:</strong> #{order.order_id}
              </div>

              <div>
                <strong>Status:</strong>{" "}
                <span className="badge bg-success">{order.status}</span>
              </div>
            </div>

            <div className="card-body">
              <p>
                <strong>Date:</strong> {order.created_at}
              </p>

              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>

              <h6 className="mt-3 mb-3">Items</h6>

              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between border-bottom py-2"
                >
                  <div>
                    <strong>{item.product_name}</strong>
                    <div style={{ fontSize: "14px", color: "#666" }}>
                      Quantity: {item.quantity}
                    </div>
                  </div>

                  <div>
                    <strong>₹{item.price}</strong>
                  </div>
                </div>
              ))}

              <div className="mt-3">
                <a
                  href={order.invoice_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-dark"
                >
                  View Invoice
                </a>
              </div>
            </div>
          </div>
          </div>
        ))
      )
      }
      </div>
    </div>
  );
}