import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function VendorPayment() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Fetch Data
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/v1/vendor/withdraw-request-listing",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res.data.data);
    } catch (error) {
      console.log("Fetching Error:", error);
      alert("Failed to fetch data!");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Modal Functions
  const openModal = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  // ✅ Approve API
const handleApprove = async () => {
  setLoading(true);
  try {
    await axios.post(
      "http://tech-shop.techsaga.live/api/v1/vendor/withdraw-request-action",
      {
        request_id: selectedRow.id,
        action: "approved",  // ✅ backend ke liye ye required
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // UI Update
    setData((prev) =>
      prev.map((item) =>
        item.id === selectedRow.id
          ? { ...item, status: "approved" }
          : item
      )
    );

    closeModal();
  } catch (error) {
    console.log("Approve Error:", error);
    alert("Failed to approve!");
  } finally {
    setLoading(false);
  }
};

  // ✅ Table Columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          style={{
            color: row.status === "approved" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Created At",
      cell: (row) => {
        const date = new Date(row.created_at);
        return date.toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
      sortable: true,
    },
    {
      name: "Vendor Name",
      cell: (row) => {
        const first = row.vendor?.first_name || "";
        const last = row.vendor?.last_name || "";
        return `${first} ${last}`.trim();
      },
      sortable: true,
    },
   {
  name: "Action",
  cell: (row) => (
    <button
      disabled={row.status !== "pending"}
      onClick={() => openModal(row)}
      style={{
        padding: "6px 12px",
        backgroundColor: row.status === "pending" ? "#28a745" : "#ccc",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: row.status === "pending" ? "pointer" : "not-allowed",
      }}
    >
      Approve
    </button>
  ),
},
  ];

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container mt-4">
          <h2 className="dashboard-title mb-4">Vendor Payment</h2>

          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Withdraw and Payment History</h5>

            <DataTable
              columns={columns}
              data={data}
              pagination
              highlightOnHover
              striped
              responsive
            />
          </div>
        </div>

        {/* ✅ React Bootstrap Modal */}
<Modal show={showModal} onHide={closeModal} centered backdrop="static">
  <Modal.Header closeButton>
    <Modal.Title>Approve Request</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p><strong>Request ID:</strong> {selectedRow?.id}</p>
    <p>Are you sure you want to approve this request?</p>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={closeModal}>
      Cancel
    </Button>

    <Button
      variant="success"
      onClick={handleApprove}
      disabled={loading}
    >
      {loading ? "Processing..." : "Confirm"}
    </Button>
  </Modal.Footer>
</Modal>
      </div>
    </div>
  );
}