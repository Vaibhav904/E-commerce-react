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
import { addProduct } from "../Redux/ProductSlice";

export default function Header() {
  const dispatch = useDispatch();
    const [countries, setCountries] = useState([]);
    const navigate=useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false); // search box open/close
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
  
    const handleSearch = async () => {
      // console.log('object', query);
      if (!query.trim()) return;
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await res.json();
        dispatch(addProduct(data));
        // setResults(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  const navItems = [
    { path: "/", name: "Home" },
    { path: "/shop", name: "Shop" },
    { 
      path: "/product", name: "Product",
      children: [
        { name: "Summer Coat", path: "/categorie/:slug" },
        { name: "New Pant", path: "/categorie/:slug" },
        { name: "Mens Caps",  path: "/categorie/:slug" },
        { name: "Summer Shirt", path: "/categorie/:slug" },
        { name: "New T-shirt",  path: "/categorie/:slug" },
      ]
    },
    { path: "/page", name: "Page",
         children: [
        { name: "Contact", path: "/contact" },
        { name: "About", path: "/about" },
        { name: "My Account", path: "/login" }
      ]
    }
  ];   


  return (
   <div style={{boxShadow:'0 4px 6px -2px rgba(0, 0, 0, 0.1)'}}>
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
        <span>Open Doors To A World Of Fashion  |  </span> <a href="">Discover More</a>
      </div>
       <div className="header-state">
        <span><CountrySelector/></span>
      </div>
      </div>
  
    <div className="container-fluid">
   
      <header className="header">
        {/* Logo */}
        <nav className="nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li 
                className={`nav-item ${item.children ? "dropdown" : ""}`} 
                key={item.path}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.name} {item.children && "▾"}
                </NavLink>

                {/* Dropdown render */}
                {item.children && (
                  <ul className="dropdown-menu">
                    {item.children.map((sub, idx) => (
                      <li key={idx}>
                        <Link to={sub.path}>{sub.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/" className="logo">
          <img
            src="https://techsaga.ae/images/Techsaga-logo.svg"
            alt="Logo"
          />
        </Link>

        {/* Navigation */}
        

        {/* Icons */}
        <ul className="user-icon">
          <li>
             <input
          type="text"
          placeholder="Search product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: open ? "100%" : "0px", // smooth expand
            opacity: open ? 1 : 0,
            marginLeft: open ? "10px" : "0px",
            padding: open ? "8px" : "0px",
            border: open ? "1px solid #ccc" : "none",
            borderRadius: "4px",
            transition: "all 0.4s ease", // smooth effect
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter se bhi search
        />
          </li>
          <li  onClick={() => setOpen(!open)}
          style={{
            padding: "8px 12px",
            color: "#000000ff",
            cursor: "pointer",
          }}><CiSearch /></li>

          <li onClick={()=>navigate("/login")}><FaUser /></li>
          <li  onClick={() => setIsOpen(true)} ><FaCartShopping /></li>
        </ul>
      </header>
      <Addcart open={isOpen} close={(e)=> setIsOpen(false)} />
    </div>
      </div>
  );
}
