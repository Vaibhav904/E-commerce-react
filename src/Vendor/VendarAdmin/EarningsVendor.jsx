import { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function EarningsVendor() {
  const [requests, setRequests] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const vendorToken = localStorage.getItem("vendorToken");

  // ✅ GET ALL WITHDRAW REQUESTS
  const fetchRequests = () => {
    axios
      .get("http://tech-shop.techsaga.live/api/v1/vendor/total-amount", {
        headers: {
          Authorization: `Bearer ${vendorToken}`,
        },
      })
      .then((res) => {
        setRequests(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
      });
      console.log('res-----------------------',requests?.[0]?.balance);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ SUBMIT WITHDRAW REQUEST
  const handleWithdraw = (e) => {
    e.preventDefault();

    if (!amount) {
      alert("Enter amount");
      return;
    }

    setLoading(true);

    axios
      .post(
        "http://tech-shop.techsaga.live/api/v1/vendor/withdraw-request",
        {
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${vendorToken}`,
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        setAmount("");
        fetchRequests(); // refresh list
      })
      .catch((err) => {
        console.error("Withdraw error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="dashboard-title">My Payment</h2>
          </div>

          {/* WITHDRAW FORM */}
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="mb-3">Request Withdrawal</h5>

            <form
              onSubmit={handleWithdraw}
              className="d-flex gap-3 align-items-center"
            >
              <input
                type="number"
                className="form-control"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ maxWidth: "250px" }}
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Processing..." : "Withdraw"}
              </button>
            </form>
          </div>

          {/* TABLE */}
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Withdraw History</h5>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Balance</th>
                    <th>Total Earn</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.length > 0 ? (
                    requests.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>₹{item?.balance}</td>
                        <td>
                          ₹{item?.total_earn}
                          {/* <span
                            className={`badge ${
                              item.status === "pending"
                                ? "bg-warning"
                                : item.status === "approved"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {item.status}
                          </span> */}
                        </td>
                        <td>
                          {new Date(item.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}