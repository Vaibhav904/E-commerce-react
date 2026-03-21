import React from "react";
import { Link } from "react-router-dom";
import {
  BsPinterest,
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsSnapchat,
  BsYoutube,
  BsTiktok,
} from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="footer-section container-fluid">
      <div className="row gy-5">
        
        {/* Left Section */}
        <div className="col-lg-4 col-md-6">
          <h3>Let's get in touch</h3>
          <small>
            Sign up for our newsletter and receive <strong>10% off</strong> your
            first order. Be the first to know about exclusive offers, new
            arrivals, and styling tips.
          </small>
        </div>

        {/* Quick Links */}
        <div className="col-lg-2 col-md-3 col-6 footer-links">
          <h5>Quick links</h5>
          <ul>
            <li>
              <Link to="/account">My account</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/compare">Product Compare</Link>
            </li>
            <li>
              <Link to="/order-tracking">Order Tracking</Link>
            </li>
             <li>
              <Link to="/vendor-login">Vendor Login</Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="col-lg-2 col-md-3 col-6 footer-links">
          <h5>Company</h5>
          <ul>
            <li>
              <Link to="/about" style={{ color: "#222222", fontWeight: 600 }}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/delivery">Delivery Information</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="col-lg-4 col-md-6">
          <h5>Follow us</h5>
          <p className="small">
            Stay connected with us on social media for the latest updates and
            promotions.
          </p>
          <div className="social-icons">
            <button><BsPinterest /></button>
            <button><BsFacebook /></button>
            <button><BsInstagram /></button>
            <button><BsTwitterX /></button>
            <button><BsSnapchat /></button>
            <button><BsYoutube /></button>
            <button><BsTiktok /></button>
          </div>
        </div>

      </div>
    </footer>
  );
}