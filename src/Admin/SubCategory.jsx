import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Link, Outlet } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function SubCategory() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // -----------------------------------
  // ✅ Fetch Banner Listing
  // -----------------------------------
  const fetchBanners = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/v1/banners",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBanners(res.data.banners || []);
    } catch (error) {
      console.error("Error fetching banners", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // -----------------------------------
  // ✅ Change Status (Active / Inactive)
  // -----------------------------------
  const handleStatusChange = async (banner_id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      await axios.post(
        "http://tech-shop.techsaga.live/api/v1/banners/change-status",
        {
          banner_id: banner_id,
          status: newStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // update UI without refetch (fast)
      setBanners((prev) =>
        prev.map((item) =>
          item.id === banner_id
            ? { ...item, status: newStatus }
            : item
        )
      );
    } catch (error) {
      console.error("Status update error", error);
      alert("Status update failed");
    }
  };

  // -----------------------------------
  // ✅ Delete Banner
  // -----------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await axios.post(
        "http://tech-shop.techsaga.live/api/v1/banners/delete",
        { banner_id: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Banner deleted successfully");
      fetchBanners();
    } catch (error) {
      console.error("Delete error", error);
      alert("Delete failed");
    }
  };

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />
        <Outlet />

        <h2 className="dashboard-title mb-4">Banner Listing</h2>

        <div className="container">
          <div className="add-product mb-3">
            <Link to="/addbanner" className="btn btn-primary">
              Add Banner
            </Link>
          </div>

          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>URL</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {banners.length > 0 ? (
                  banners.map((banner, index) => (
                    <tr key={banner.id}>
                      <td>{index + 1}</td>

                      <td>
                        <img
                          src={banner.image_url}
                          alt="banner"
                          style={{
                            width: "120px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                      </td>

                      <td>{banner.title}</td>

                      <td>
                        <a href={banner.url} target="_blank" rel="noreferrer">
                          {banner.url}
                        </a>
                      </td>

                      {/* ✅ STATUS TOGGLE */}
                      <td>
                        <Form.Check
                          type="switch"
                          id={`status-${banner.id}`}
                          checked={banner.status === 1}
                          onChange={() =>
                            handleStatusChange(banner.id, banner.status)
                          }
                          label={
                            banner.status === 1 ? "Active" : "Inactive"
                          }
                        />
                      </td>

                      <td>
                        <Link to={`/banneredit/${banner.id}`}>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                          >
                            Edit
                          </Button>
                        </Link>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(banner.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No banners found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
