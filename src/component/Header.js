import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import CountrySelector from "./Country";
import { CiFacebook } from "react-icons/ci";
import Addcart from "../pages/Addcart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Redux/CartSlice";
import { addProduct } from "../Redux/ProductSlice";

import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export default function Header() {
  const dispatch = useDispatch();
  const { logout } = useContext(AuthContext);
  const name = localStorage.getItem("name");
  const [showDropdown, setShowDropdown] = useState(false);
  const token = localStorage.getItem("token");
  // 🔥 NEW STATE (ONLY FOR SHOP)
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");


  const cartItems = useSelector((state) => state.cart.cart);
  console.log('cartItems', cartItems);
  // 🔥 FETCH CATEGORY (ONLY ADDITION)
  useEffect(() => {
    fetch("http://tech-shop.techsaga.live/api/category")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          setCategories(data.categories);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${query}`,
      );
      const data = await res.json();
      dispatch(addProduct(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrders = async () => {
    if (!token) {
      navigate("/login", {
        state: { from: "/order-list" },
      });
    } else {
      try {
        const res = await axios.get(
          "http://tech-shop.techsaga.live/api/my-order",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        navigate("/order-list", { state: { orders: res.data.data } });
      } catch (error) {
        console.log("Order Fetch Error:", error);
        navigate("/order-list");
      }
    }
  };

  const handelWishlist = async () => {
    if (!token) {
      navigate("/login", {
        state: { from: "/wishlist" },
      });
    } else {
      try {
        const res = await axios.get(
          "http://tech-shop.techsaga.live/api/wishlist/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );

        if (res.data.status) {
          navigate("/wishlist", { state: { wishlist: res.data.data } });
        } else {
          navigate("/wishlist");
        }
      } catch (error) {
        console.error("Wishlist fetch error:", error);
        navigate("/wishlist");
      }
    }
  };

  return (
    <div style={{ boxShadow: "0 4px 6px -2px rgba(0, 0, 0, 0.1)" }}>
      {/* ================= TOP BAR ================= */}
      <div className="header-info">
        <div className="followe-location">
          <div className="header-Follower">
            <FaInstagram /> <span>100k Follower</span>
          </div>
          <div className="header-Follower">
            <CiFacebook /> <span>300k Follower</span>
          </div>
        </div>

        <div className="header-discover">
          <span>Open Doors To A World Of Fashion | </span>
          <a href="">Discover More</a>
        </div>

        {/* <div className="header-state">
          <CountrySelector />
        </div> */}
      </div>

      {/* ================= MAIN HEADER ================= */}
      <div className="container-fluid">
        <header className="header">
          {/* ================= NAV ================= */}
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/">Home</NavLink>
              </li>

              {/* 🔥 SHOP (ONLY THIS PART CHANGED) */}
              <li className="nav-item dropdown">
                <span className="nav-link">Shop ▾</span>
                <ul className="dropdown-menu mega-menu">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link to={`/categorie/${cat.slug}`}>
                        {cat.category_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <NavLink to="/page">Page ▾</NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/login">My Account</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          {/* ================= LOGO ================= */}
          <Link to="/" className="logo">
            <img
              src="https://techsaga.ae/images/Techsaga-logo.svg"
              alt="Logo"
            />
          </Link>

          {/* ================= ICONS ================= */}
          <ul className="user-icon">
            {/* <li>
              <input
                type="text"
                placeholder="Search product..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: open ? "100%" : "0px",
                  opacity: open ? 1 : 0,
                  marginLeft: open ? "10px" : "0px",
                  padding: open ? "8px" : "0px",
                  border: open ? "1px solid #ccc" : "none",
                  transition: "all 0.4s ease",
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </li> */}

            {/* <li onClick={() => setOpen(!open)}>
              <CiSearch />
            </li> */}

            <li
              className="user-dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <FaUser />
              <div className="wishlist-text">Profile</div>

              {/* 🔽 DROPDOWN */}
              {showDropdown && (
                <div className="user-dropdown-menu">
                  <div
                    onClick={() => navigate("/profile")}
                    className="user-info"
                  >
                    <strong>Hello {name || "Guest"}</strong>
                  </div>

                  <ul>
                    <li onClick={handleOrders}>Orders</li>
                    <li onClick={() => navigate("/wishlist")}>Wishlist</li>
                    {/* <li>Gift Cards</li>
                    <li>Contact Us</li> */}
                    {/* <li>Coupons</li> */}
                    {/* <li onClick={() => navigate("/address")}>
                      Saved Addresses
                    </li> */}
                    <li onClick={() => navigate("/profile")}>Edit Profile</li>
                    <li
                      className="logout"
                      onClick={() => {
                        // 1️⃣ token clear
                        localStorage.removeItem("token");
                        localStorage.removeItem("name"); //
                        // 2️⃣ redux cart clear
                        dispatch(clearCart());

                        // 3️⃣ redux-persist clear (agar use ho raha ho)
                        localStorage.removeItem("persist:root");
                        
                        logout();

                        // 4️⃣ redirect
                        navigate("/login", { replace: true });
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li onClick={handelWishlist}>
              <FaRegHeart />
              <div className="wishlist-text">Wishlist</div>
            </li>

            <li onClick={() => setIsOpen(true)}>
                 <div className="cus_cart">  
                  {cartItems?.length>0 && 
                             <span>{cartItems?.length}</span>
                             }
              <FaCartShopping />
              <div className="wishlist-text">Cart</div>
              </div> 
            </li>
          </ul>
        </header>

        <Addcart open={isOpen} close={() => setIsOpen(false)} />
      </div>
    </div>
  );
}
