import React from 'react'
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
        <div className="col-lg-4 col-md-6">
          <h3>Let's get in touch</h3>
          <small>
            Sign up for our newsletter and receive <strong>10% off</strong> your
            first order. Be the first to know about exclusive offers, new
            arrivals, and styling tips.
          </small>
          <form className="mt-3 d-flex flex-column flex-sm-row gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Enter your email"
              className="form-control flex-grow-1"
              required
            />
            <button type="submit" className="subscribe-btn">
              Subscribe
            </button>
          </form>
          <div className="mt-3">
            <small>
              By subscribing, you agree to our{" "}
              <a href="#">Privacy Policy</a> and consent to receive updates from
              our company.
            </small>
          </div>
        </div>

        <div className="col-lg-2 col-md-3 col-6 footer-links">
          <h5>Quick links</h5>
          <ul>
            <li>
              <a href="#">My account</a>
            </li>
            <li>
              <a href="#">Cart</a>
            </li>
            <li>
              <a href="#">Wishlist</a>
            </li>
            <li>
              <a href="#">Product Compare</a>
            </li>
            <li>
              <a href="#">Order Tracking</a>
            </li>
          </ul>
        </div>

        <div className="col-lg-2 col-md-3 col-6 footer-links">
          <h5>Company</h5>
          <ul>
            <li>
              <a href="#" style={{ color: "#222222", fontWeight: 600 }}>
                About Us
              </a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Delivery Information</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms &amp; Conditions</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="col-lg-4 col-md-6">
          <h5>Follow us</h5>
          <p className="small">
            Stay connected with us on social media for the latest updates and
            promotions.
          </p>
          <div className="social-icons">
            <button>
              <BsPinterest />
            </button>
            <button>
              <BsFacebook />
            </button>
            <button>
              <BsInstagram />
            </button>
            <button>
              <BsTwitterX />
            </button>
            <button>
              <BsSnapchat />
            </button>
            <button>
              <BsYoutube />
            </button>
            <button>
              <BsTiktok />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
