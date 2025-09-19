import React from 'react';
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function Analytics() {
  return (
     <div className="d-flex">
         

     <AdminSidebar/>
      <div  className="dash-header">
        <AdminHeader/>
        <Outlet/>
        <h2 className="dashboard-title">Analytics Overview</h2>
         
      </div>
    </div>
  );
}
