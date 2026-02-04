import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";
import CountrySelector from "./Country";
import { CiFacebook } from "react-icons/ci";
import Addcart from "../pages/Addcart";
import { useDispatch } from "react-redux";
import { clearCart } from "../Redux/CartSlice";
import { addProduct } from "../Redux/ProductSlice";
import { FaRegHeart } from "react-icons/fa";

export default function Header() {
  const dispatch = useDispatch();
  const name = localStorage.getItem("name");
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔥 NEW STATE (ONLY FOR SHOP)
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

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
        `https://dummyjson.com/products/search?q=${query}`
      );
      const data = await res.json();
      dispatch(addProduct(data));
    } catch (error) {
      console.error(error);
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

        <div className="header-state">
          <CountrySelector />
        </div>
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
                <span className="nav-link">
                  Shop ▾
                </span>
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
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/login">My Account</Link></li>
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
                    {/* <p>{phone || "Not available"}</p> */}
                  </div>

                  <ul>
                    <li onClick={() => navigate("/orders")}>Orders</li>
                    <li onClick={() => navigate("/wishlist")}>Wishlist</li>
                    <li>Gift Cards</li>
                    <li>Contact Us</li>
                    <li>Coupons</li>
                    <li onClick={() => navigate("/address")}>
                      Saved Addresses
                    </li>
                    <li onClick={() => navigate("/profile")}>Edit Profile</li>
                    <li
  className="logout"
  onClick={() => {
    // 1️⃣ token clear
    localStorage.removeItem("token");

    // 2️⃣ redux cart clear
    dispatch(clearCart());

    // 3️⃣ redux-persist clear (agar use ho raha ho)
    localStorage.removeItem("persist:root");

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

            <li>
              <FaRegHeart />
              <div className="wishlist-text">Wishlist</div>
            </li>

            <li onClick={() => setIsOpen(true)}>
              <FaCartShopping />
              <div className="wishlist-text">Cart</div>
            </li>
          </ul>
        </header>

        <Addcart open={isOpen} close={() => setIsOpen(false)} />
      </div>
    </div>
  );
}
