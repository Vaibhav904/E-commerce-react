import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import { style } from "framer-motion/client";
import "./AdminStyle.css";
import SalesChart from "./SalesChart";

const Dashboard = () => {
  return (
    
    <div className="d-flex">
         

     <AdminSidebar/>
      <div  className="dash-header">
        <AdminHeader/>
        <Outlet/>
        <h2 className="dashboard-title">Dashboard Overview</h2>
        <SalesChart/>  
      </div>
    </div>
  );
};

export default Dashboard;
 
