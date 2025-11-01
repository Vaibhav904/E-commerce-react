import React from 'react';
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";


export default function ProductAdd() {
  return (
     <div className="d-flex">
         

     <AdminSidebar/>
      <div  className="dash-header">
        <AdminHeader/>
        <Outlet/>
        <h2 className="dashboard-title">Add Product</h2>
              <div className="container-fluid edit-cards">
      <div className="row gy-4">
        {/* Left Section */}
        <div className="col-md-8">
          {/* Product Info */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Add Product</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  defaultValue="Wireless Bluetooth Headphones"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="productDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="productDescription"
                  rows="4"
                  defaultValue="High-quality wireless headphones with noise cancellation and 20-hour battery life. Perfect for music lovers and professionals."
                />
              </div>

              <div className="row gy-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="productSKU" className="form-label">
                      SKU
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productSKU"
                      defaultValue="WH-2023-BLK"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="productCategory" className="form-label">
                      Category
                    </label>
                    <select
                      className="form-select"
                      id="productCategory"
                      defaultValue="Electronics"
                    >
                      <option>Electronics</option>
                      <option>Audio</option>
                      <option>Accessories</option>
                      <option>Computers</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="productPrice"
                      defaultValue="129.99"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="productStock" className="form-label">
                      Stock
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="productStock"
                      defaultValue="45"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="productStatus" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="productStatus"
                      defaultValue="Published"
                    >
                      <option>Published</option>
                      <option>Draft</option>
                      <option>Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Inventory</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="weight" className="form-label">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="weight"
                      defaultValue="0.45"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="dimensions" className="form-label">
                      Dimensions (cm)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="dimensions"
                      defaultValue="18 x 15 x 6"
                    />
                  </div>
                </div>
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="trackInventory"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="trackInventory">
                  Track inventory
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-4">
          {/* Product Image */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Product Image</h5>
            </div>
            <div className="card-body">
              <div className="image-upload mb-3">
                <i className="bi bi-cloud-arrow-up fs-1 text-muted"></i>
                <p>Click to upload or drag and drop</p>
                <p className="text-muted small">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
              <div className="border rounded p-2 text-center">
                <img
                  src="https://via.placeholder.com/250"
                  className="img-fluid rounded"
                  alt="Product"
                />
                <div className="d-flex justify-content-center mt-2">
                  <button className="btn btn-sm btn-outline-danger me-2">
                    Remove
                  </button>
                  <button className="btn btn-sm btn-outline-primary">
                    Replace
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Organization</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="vendor" className="form-label">
                  Vendor
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="vendor"
                  defaultValue="AudioTech Inc."
                />
              </div>
              <div className="mb-3">
                <label htmlFor="collections" className="form-label">
                  Collections
                </label>
                <select
                  className="form-select"
                  id="collections"
                  multiple
                  defaultValue={["Audio", "Wireless"]}
                >
                  <option>Audio</option>
                  <option>Wireless</option>
                  <option>New Arrivals</option>
                  <option>On Sale</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="tags" className="form-label">
                  Tags
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  defaultValue="bluetooth, wireless, headphones, audio"
                />
                <div className="form-text">Separate tags with commas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


      </div>
    </div>
  );
}

