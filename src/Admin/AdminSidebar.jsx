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
import { CiCircleList } from "react-icons/ci";
import { FaBoxOpen, FaImage, FaStar, FaStore, FaListAlt } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";

const AdminSidebar = () => {
  const [activeItem, setActiveItem] = useState("");
    const location = useLocation();

  const menuItems = [
    { id: "dashboard", icon: <FaHome />, label: "Dashboard", path: "/admin/dashboard" },
    { id: "products", icon: <FaShoppingBag />, label: "Products",  path: "/adminproducts" },
      { id: "orders", icon: <FaBoxOpen />, label: "Category", path: "/order" },
   { id: "Subcategory", icon: <FaImage />, label: "Banner Update",  path: "/bannerlisting" },
    { id: "customers", icon: <FaUsers />, label: "Customers",  path: "/customer" },
     { id: "Specialproduct", icon: <FaStar />, label: "Special Product",  path: "/Specialproduct" },
      { id: "orderlisting", icon: <FaFileInvoice />, label: "Order Listing",  path: "/customer-orderlisting" },
    { id: "vendorlisting", icon: <FaStore />, label: "Vendor-Listing",  path: "/vendorlisting" },
    { id: "vendorpayment", icon: <FaChartLine />, label: "Vendor-Payment",  path: "/vendorpayment" },
    
    { id: "Updatepassword", icon: <FaChartLine />, label: "Setting",  path: "/Updatepassword" },

    // { id: "settings", icon: <FaCog />, label: "Settings", path: "/settings" },
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
