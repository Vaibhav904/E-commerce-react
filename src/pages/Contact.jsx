
import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTag,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="simple-contact-body">
        <div className="simple-contact-header">
          <h1 className="simple-brand-text">Contact Us</h1>
          <p className="simple-brand-tagline">
            Have questions or want to discuss a project? We're here to help.
          </p>
        </div>
      <div className="container">
        {/* Header */}
      <div className="row">
        <div className="col-md-12">
            <div className=" simple-main-content">
          {/* Left Side - Form */}
          <div className="simple-form-section">
            <h3 className="simple-form-title">Send Us a Message</h3>

            <form onSubmit={handleSubmit}>
              <div className="simple-form-row">
                <div className="simple-form-group">
                  <div className="simple-input-container">
                    <FaUser className="simple-input-icon" />
                    <input
                      type="text"
                      placeholder="First Name"
                      className="simple-form-control"
                      required
                    />
                  </div>
                </div>

                <div className="simple-form-group">
                  <div className="simple-input-container">
                    <FaUser className="simple-input-icon" />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="simple-form-control"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="simple-form-group">
                <div className="simple-input-container">
                  <FaEnvelope className="simple-input-icon" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="simple-form-control"
                    required
                  />
                </div>
              </div>

              <div className="simple-form-group">
                <div className="simple-input-container">
                  <FaPhone className="simple-input-icon" />
                  <input
                    type="tel"
                    placeholder="Phone Number (optional)"
                    className="simple-form-control"
                  />
                </div>
              </div>

              <div className="simple-form-group">
                <div className="simple-input-container">
                  <FaTag className="simple-input-icon" />
                  <select className="simple-form-control" required>
                    <option value="">Select a subject</option>
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Product Information</option>
                    <option>Shipping Question</option>
                    <option>Return & Exchange</option>
                    <option>Website Feedback</option>
                  </select>
                </div>
              </div>

              <div className="simple-form-group">
                <textarea
                  placeholder="Your message..."
                  className="simple-form-control simple-textarea-control"
                  required
                />
              </div>

              <button type="submit" className="simple-btn-submit">
                <FaPaperPlane className="simple-btn-icon" /> Send Message
              </button>
            </form>
          </div>

          {/* Right Side - Contact Methods */}
          <div className="simple-info-section">
            <div className="simple-info-content">
              <h3 className="simple-info-title">Contact Information</h3>
              <p className="simple-info-description">
                Feel free to reach out through any of these channels.
              </p>

              <div className="simple-contact-methods">
                <div className="simple-contact-method">
                  <div className="simple-method-icon-container">
                    <FaPhone className="simple-method-icon" />
                  </div>
                  <div className="simple-method-text">
                    <h4 className="simple-method-title">Call Us</h4>
                    <p className="simple-method-detail">+1 (555) 123-4567</p>
                    <p className="simple-method-subdetail">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>

                <div className="simple-contact-method">
                  <div className="simple-method-icon-container">
                    <FaEnvelope className="simple-method-icon" />
                  </div>
                  <div className="simple-method-text">
                    <h4 className="simple-method-title">Email Us</h4>
                    <p className="simple-method-detail">hello@company.com</p>
                    <p className="simple-method-subdetail">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="simple-contact-method">
                  <div className="simple-method-icon-container">
                    <FaMapMarkerAlt className="simple-method-icon" />
                  </div>
                  <div className="simple-method-text">
                    <h4 className="simple-method-title">Visit Us</h4>
                    <p className="simple-method-detail">123 Innovation Blvd</p>
                    <p className="simple-method-subdetail">San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>

              <div className="simple-social-section">
                <h4 className="simple-social-title">Follow Us</h4>
                <div className="simple-social-icons">
                  <a href="#" className="simple-social-icon">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="simple-social-icon">
                    <FaTwitter />
                  </a>
                  <a href="#" className="simple-social-icon">
                    <FaInstagram />
                  </a>
                  <a href="#" className="simple-social-icon">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
        {/* Main Content */}
      
      </div>
    </div>
  );
};

export default Contact;