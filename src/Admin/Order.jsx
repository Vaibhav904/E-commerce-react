import React, { useEffect, useState } from 'react';
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

export default function Order() {
    const handleDelete = (id) => {
    // filter se row remove karenge
    setData(data.filter((item) => item.id !== id));
  };
  // useEffect(()=>{
    
  // })
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
    // { name: "Price", selector: (row) => row.role },
    //  { name: "Discount Price", selector: (row) => row.role },
      {
  name: "Status",
  cell: (row) => (
    <div style={{ display: "flex", gap: "8px" }}>
      <button
          // to={`/edit/${row.id}`}
           to={`/edit`}
        style={{
          padding: "4px 8px",
          backgroundColor: "rgb(84 213 113)",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Active
      </button>
     
    </div>
  ),
},
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
            Delete
          </button>
    </div>
  ),
},
  ];

  // ✅ Dummy Data
  const    [data, setData] = useState( [
    { id: 1, thumbnail:"https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp", name: "Summer Coat"},
    { id: 2, thumbnail:"https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp", name: "New Pant"   },
    { id: 3, thumbnail:"https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp", name: "Mens Caps" },
     { id: 4, thumbnail:"https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp", name: "T-shirt" },
      { id: 5, thumbnail:"https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp", name: "shirt" },
       { id: 6, thumbnail:"https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp", name: "Shorts" },
  ]);
  return (
     <div className="d-flex">
         

     <AdminSidebar/>
      <div  className="dash-header">
        <AdminHeader/>
        <Outlet/>
        <h2 className="dashboard-title">Catrgory Overview</h2>
         <div className="container">
          <div className="add-product">
            <Link   to={`/addCategory`}>Add Catrgory</Link>
          </div>
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

