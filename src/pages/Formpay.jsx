import React from 'react';

export default function Formpay() {
  return (
    <div className="left-side">
      <div className="checkout-header">
        <h1 className="checkout-title">Checkout</h1>
        <div className="steps">
          <span className="step-active">Information</span>
          <span>Shipping</span>
          <span>Payment</span>
        </div>
      </div>

      <div className="express-checkout-text">Express checkout</div>
      <div className="btn-group-express">
        <button className="btn btn-shop">
          <i className="fas fa-shopping-bag me-2"></i>Shop Pay
        </button>
        <button className="btn btn-gpay">
        Google Pay
        </button>
      </div>

      <div className="divider-container">
        <hr />
        <div>Or continue with standard checkout</div>
        <hr />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="section-title">
          <i className="fas fa-user-circle section-title-icon"></i>Contact Information
        </h5>
        <a href="#" className="link-login">Have an account? Log in</a>
      </div>

      <form>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email address</label>
          <input type="email" className="form-control" id="emailInput" placeholder="Enter your email" required />
          <div className="form-text">We'll send your order confirmation here</div>
        </div>

        <div className="form-check mb-4">
          <input className="form-check-input" type="checkbox" id="newsletterCheck" defaultChecked />
          <label className="form-check-label" htmlFor="newsletterCheck">
            Email me with news and offers
          </label>
        </div>

        {/* Delivery Information */}
         <div className="mb-3">
        <label htmlFor="countrySelect" className="form-label">Country/Region</label>
        <select className="form-select" id="countrySelect" aria-label="Country/Region select">
          <option value="br" selected>Brazil</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
        </select>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">First name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="First name"
            autoComplete="given-name"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">Last name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Last name"
            autoComplete="family-name"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="postalCode" className="form-label">Postal code</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="postalCode"
            placeholder="Postal code"
            aria-label="Postal code"
            required
          />    
          {/* <button className="btn btn-outline-secondary" type="button" title="Search Postal Code">
            <i className="fas fa-search"></i>
          </button> */}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          placeholder="Street address"
          autoComplete="street-address"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="apartment" className="form-label">Apartment, suite, etc. (optional)</label>
        <input
          type="text"
          className="form-control"
          id="apartment"
          placeholder="Apartment, suite, etc."
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="City"
            autoComplete="address-level2"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="stateSelect" className="form-label">State</label>
          <select className="form-select" id="stateSelect" aria-label="State select" required>
            <option value="" disabled selected>Select state</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
            <option value="ES">Espírito Santo</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="form-label">
          Phone (optional)
          <span
            className="info-icon"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="We might contact you regarding your order."
          >
            ?
          </span>
        </label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          placeholder="Phone number"
          autoComplete="tel"
        />
        <div className="form-text">For delivery questions only</div>
      </div>
        {/* ...continue converting the rest of the form fields similarly... */}

        <div className="d-grid">
          <button type="submit" className="btn btn-shop btn-lg">
            Continue to Shipping <i className="fas fa-arrow-right ms-2"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
