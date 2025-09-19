import React from 'react';
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function Customer() {
  return (
     <div className="d-flex">
         

     <AdminSidebar/>
      <div  className="dash-header">
        <AdminHeader/>
        <Outlet/>
        <h2 className="dashboard-title">Customer Overview</h2>
         
      </div>
    </div>
  );
}

