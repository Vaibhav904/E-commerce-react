import { Autocomplete } from "@react-google-maps/api";

import { useState, useEffect,useRef } from "react";
import axios from "axios";

export default function Formpay({ setSelectedAddress }) {
  const token = localStorage.getItem("token");

  // FORM STATES
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  // UI STATES
  const [autocomplete, setAutocomplete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ADDRESS STATES
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddresslocal] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
const [selectedAddressId, setSelectedAddressId] = useState(null);
 
  const isDefaultSet = useRef(false);



  useEffect(() => {
    if (addresses?.length && !isDefaultSet.current) {
      setSelectedAddress(addresses[0]);
      isDefaultSet.current = true;
    }
  }, [addresses]);



 











  /* ================= FETCH ADDRESSES ================= */
  const fetchShippingAddresses = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/shipping-addresses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setAddresses(res.data.data || []);

      if (res.data.data?.length) {
        setSelectedAddresslocal(res.data.data[0]); // auto select
      }
    } catch (err) {
      console.error("Fetch address error", err);
    }
  };

  useEffect(() => {
    fetchShippingAddresses();
  }, []);

  /* ================= GOOGLE AUTOCOMPLETE ================= */
  const onPlaceChanged = () => {
    if (!autocomplete) return;

    const place = autocomplete.getPlace();

    setAddress(place.formatted_address || "");

    let city = "",
      state = "",
      country = "",
      postal = "";

    place.address_components?.forEach((c) => {
      if (c.types.includes("locality")) city = c.long_name;
      if (c.types.includes("administrative_area_level_1")) state = c.long_name;
      if (c.types.includes("country")) country = c.long_name;
      if (c.types.includes("postal_code")) postal = c.long_name;
    });

    setCity(city);
    setState(state);
    setCountry(country);
    setPostalCode(postal);
  };

  /* ================= SAVE NEW ADDRESS ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axios.post(
        "http://tech-shop.techsaga.live/api/store-shipping",
        {
          name,
          postal_code: postalCode,
          address,
          city,
          state,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      await fetchShippingAddresses();

      setShowNewAddressForm(false);
      setName("");
      setAddress("");
      setCity("");
      setState("");
      setCountry("");
      setPostalCode("");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELIVER BUTTON ================= */
  const handleDeliverHere = () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    console.log("Deliver to:", selectedAddress);

    // 👉 next step
    // navigate("/payment");
  };

  return (
    <div className="left-side">
      <h1 className="checkout-title">Checkout</h1>

      {/* ================= SAVED ADDRESSES ================= */}
      <div className="card p-3 mt-4 mb-4">
        <h5 className="mb-3">Select Shipping Address</h5>

  <div className="address-list">
      {addresses.map((addr) => {
        const isChecked = selectedAddress?.id === addr.id;

        return (
          <div
            key={addr.id}
            className={`address-card ${isChecked ? "active" : ""}`}
          onClick={() => {
  setSelectedAddresslocal(addr); // update local state for UI
  setSelectedAddress(addr);      // update parent
}}
          >
            <span className={`custom-radio ${isChecked ? "checked" : ""}`} />

            <div className="address-info">
              <strong>{addr.name}</strong>
              <p>{addr.address}</p>
              <p>
                {addr.city}, {addr.state} {addr.postal_code}
              </p>
              <p>{addr.country}</p>
            </div>
          </div>
        );
      })}
    </div>

        {/* BUTTONS */}
        <div className="d-flex gap-2 mt-3">
          <button
            className="btn btn-success"
            onClick={handleDeliverHere}
            disabled={!selectedAddress}
          >
            Deliver to this address
          </button>

          <button
            className="btn btn-outline-primary"
            onClick={() => setShowNewAddressForm(true)}
          >
            Add New Address
          </button>
        </div>
      </div>

      {/* ================= NEW ADDRESS FORM ================= */}
      {showNewAddressForm && (
        <form onSubmit={handleSubmit}>
          <h5 className="mb-3">Add New Address</h5>

          <div className="mb-3">
            <label>Full Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Postal Code</label>
            <input
              className="form-control"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Address</label>
            <Autocomplete
              onLoad={(a) => setAutocomplete(a)}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Autocomplete>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>City</label>
              <input className="form-control" value={city} readOnly />
            </div>
            <div className="col-md-6">
              <label>State</label>
              <input className="form-control" value={state} readOnly />
            </div>
          </div>

          <div className="mt-3">
            <label>Country</label>
            <input className="form-control" value={country} readOnly />
          </div>

          <button className="btn btn-shop w-100 mt-4" disabled={loading}>
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      )}
    </div>
  );
}
