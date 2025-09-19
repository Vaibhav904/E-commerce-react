import React, { useState } from 'react';
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";


export default function Adminproduct() {
    const handleDelete = (id) => {
    // filter se row remove karenge
    setData(data.filter((item) => item.id !== id));
  };
   const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Thumbnail",  
      cell:(row)=>(
      <img 
      src={row.thumbnail}
       alt={row.name}
        width="50"
        height="50"
        style={{ borderRadius: "8px", objectFit: "cover" }}
      /> 
    ), },
    { name: "Product Name", selector: (row) => row.name, sortable: true },
    { name: "title", selector: (row) => row.email },
    { name: "Price", selector: (row) => row.role },
     { name: "Discount Price", selector: (row) => row.role },
  {
  name: "Actions",
  cell: (row) => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Link
          // to={`/edit/${row.id}`}
           to={`/edit`}
        style={{
          padding: "4px 8px",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Edit
      </Link>
       <button
            onClick={() => handleDelete(row.id)}
            style={{
              padding: "4px 8px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
           All Deleted
          </button>
    </div>
  ),
},
  ];

  // ✅ Dummy Data
  const    [data, setData] = useState( [
    { id: 1, thumbnail:"https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp", name: "Summer Coat", email: "Essence Mascara Lash Princess", role: "299" },
    { id: 2, thumbnail:"https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp", name: "New Pant", email: "Eyeshadow Palette with Mirror", role: "400" },
    { id: 3, thumbnail:"https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp", name: "Mens Caps", email: "priya@example.com", role: "290" },
     { id: 4, thumbnail:"https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp", name: "T-shirt", email: "priya@example.com", role: "783" },
      { id: 5, thumbnail:"https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp", name: "shirt", email: "priya@example.com", role: "657" },
       { id: 6, thumbnail:"https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp", name: "Shorts", email: "priya@example.com", role: "690" },
  ]);
  return (
     <div className="d-flex">
         

     <AdminSidebar/>
      <div  className="dash-header">
        <AdminHeader/>
        <Outlet/>
        <h2 className="dashboard-title">Product Overview</h2>
        <div className="container">
            <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        responsive
         className="custom-datagrid"
      />
         </div>
      </div>
    </div>
  );
}
