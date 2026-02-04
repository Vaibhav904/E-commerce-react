import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";

export default function SpecialProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ======================
  // FETCH SPECIAL PRODUCTS
  // ======================
const fetchSpecialProducts = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://tech-shop.techsaga.live/api/v1/special-products",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProducts(res.data.data);
  } catch (error) {
    console.error("Error fetching special products", error.response);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchSpecialProducts();
  }, []);

  // ======================
  // DELETE (API baad me connect hoga)
  // ======================

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://tech-shop.techsaga.live/api/v1/special-products/destroy",
      {
        product_id: id,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      alert(res.data.message || "Product deleted successfully");

      // 🔄 List refresh
      fetchSpecialProducts();
    }
  } catch (error) {
    console.error("Delete product error", error.response);
    alert("Failed to delete product");
  }
};


  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="dashboard-title">Special Product</h2>

            {/* ADD BUTTON */}
            <Link to="/addspecial" className="btn btn-primary">
              + Add Special Product
            </Link>
          </div>

          {/* TABLE */}
          <div className="card shadow-sm">
            <div className="card-body">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Status</th>
                        <th width="180">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.length > 0 ? (
                        products.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>

                            <td>
                              <img
                                src={`http://tech-shop.techsaga.live/${item.image}`}
                                alt={item.title}
                                style={{
                                  width: "80px",
                                  height: "60px",
                                  objectFit: "cover",
                                }}
                              />
                            </td>

                            <td>{item.title}</td>

                            <td>
                              <a href={item.url} target="_blank" rel="noreferrer">
                                {item.url}
                              </a>
                            </td>

                            <td>
                              {item.status === 1 ? (
                                <span className="badge bg-success">
                                  Active
                                </span>
                              ) : (
                                <span className="badge bg-danger">
                                  Inactive
                                </span>
                              )}
                            </td>

                            <td>
                              <Link
                                to={`/specialedit/${item.id}`}
                                className="btn btn-sm btn-warning me-2"
                              >
                                Edit
                              </Link>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No special products found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
