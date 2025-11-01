import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaHome,
  FaShoppingBag,
  FaUsers,
  FaChartLine,
  FaCog,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [activeItem, setActiveItem] = useState("");
    const location = useLocation();

  const menuItems = [
    { id: "dashboard", icon: <FaHome />, label: "Dashboard",  path: "/dashboard" },
    { id: "products", icon: <FaShoppingBag />, label: "Products",  path: "/adminproducts" },
    { id: "orders", icon: <FaShoppingCart />, label: "Category",  path: "/order" },
    { id: "customers", icon: <FaUsers />, label: "Customers",  path: "/customer" },
    { id: "analytics", icon: <FaChartLine />, label: "Analytics",  path: "/analytics" },
    { id: "settings", icon: <FaCog />, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="sidebar">
      <div className="admin-logo">
       <img src="https://techsaga.ae/images/Techsaga-logo.svg" alt="" />
      </div>
      {menuItems.map((item) => (
        <Link
          key={item.id}
           to={item.path}
          className={`menu-item
             ${
            location.pathname === item.path ? "active" : "" }`
}
          onClick={() => setActiveItem(item.id)}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebar;
