import React from "react";
import { FaBell } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

const AdminHeader = () => {
  return (
    <div className="admin-header">
      {/* Search Bar */}
      <div className="search-bar">
       <CiSearch />
        <input type="text" placeholder="Search..." />
      </div>

      {/* User Profile Section */}
      <div className="user-profile">
        <div className="notifications">
          <FaBell />
        </div>
        <div className="user-img">AJ</div>
        <div className="user-info">
          <h4>Admin User</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;

