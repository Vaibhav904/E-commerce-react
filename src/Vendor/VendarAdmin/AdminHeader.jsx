import { useState, useContext } from "react";
import { FaBell } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStore } from "@fortawesome/free-solid-svg-icons";
const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // context logout function

  const vendorHandleLogout = () => {
    localStorage.removeItem('vendorToken')
      navigate("/login", { replace: true });
    // logout(); // token remove + login state false
    setOpen(false);
  
    navigate("/vendor-login");
  };

  return (
    <div className="admin-header">

      <div className="search-bar">
        <CiSearch />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="user-profile">
        {/* <div className="notifications">
          <FaBell />
        </div> */}
        <div className="user-img">
           <FontAwesomeIcon icon={faStore} title="Seller" />
        </div>

        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              padding: "8px 14px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Logged In <IoMdArrowDropdown />
          </button>

          {open && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "0",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "140px",
              }}
            >
              {/* <div style={itemStyle} onClick={() => alert("Open Profile")}>
                Profile
              </div> */}
              <div style={itemStyle} onClick={vendorHandleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const itemStyle = {
  padding: "8px 12px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
};

export default AdminHeader;
