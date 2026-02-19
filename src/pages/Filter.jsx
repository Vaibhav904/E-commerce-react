import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFiltered } from "../Redux/ProductSlice";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useParams } from "react-router-dom";

function Filter({ showStock }) {
  const dispatch = useDispatch();
  const { slug } = useParams(); // category slug from URL

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [apiMaxPrice, setApiMaxPrice] = useState(0);
  const [actualMaxPrice, setActualMaxPrice] = useState(0);
  const step = 10;

  /* ================= API CALL ================= */
  const fetchProductsByPrice = async (minP, maxP) => {
    try {
      const res = await axios.get(
        `http://tech-shop.techsaga.live/api/product-category/${slug}`,
        {
          params: {
            price_min: minP,
            price_max: maxP,
          },
        }
      );

      if (res.data?.status) {
        // 🔥 IMPORTANT: Redux update
        dispatch(setFiltered(res.data.products || []));

        // backend se max price (slider ke liye)
        if (res.data.max_price) {
          setApiMaxPrice(res.data.max_price);
          setMaxPrice(res.data.max_price);
        }
      }
    } catch (err) {
      console.error(
        "Price filter API error:",
        err.response?.data || err.message
      );
    }
  };


  useEffect(() => {
  if (apiMaxPrice) {
    setActualMaxPrice(apiMaxPrice); // 🔒 ORIGINAL VALUE
    setMaxPrice(apiMaxPrice);       // 🎚 slider start value
  }
}, [apiMaxPrice]);

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    if (slug) {
      fetchProductsByPrice(0, 999999); // pehli baar sab products
    }
  }, [slug]);

  /* ================= SLIDER HANDLERS ================= */
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - step);
    setMinPrice(value);
    fetchProductsByPrice(value, maxPrice);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + step);
    setMaxPrice(value);
    fetchProductsByPrice(minPrice, value);
  };

  return (
    <div className="filter-section">
      <h4>Filters</h4>

      <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
        {/* ================= Availability ================= */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Availability</Accordion.Header>
          <Accordion.Body>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="stock" />
              <label
                className="form-check-label"
                onClick={() => showStock("Instock")}
              >
                In stock
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="stock" />
              <label
                className="form-check-label"
                onClick={() => showStock("Out")}
              >
                Out of stock
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* ================= Price ================= */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Price</Accordion.Header>
          <Accordion.Body>
            <p className="price-rangefilter">
              Price Range: <b>₹{minPrice}</b> - <b>₹{maxPrice}</b>
            </p>

            <div className="slider-wrapper">
              <input
                type="range"
                min={0}
                max={apiMaxPrice}
                step={step}
                value={minPrice}
                onChange={handleMinChange}
                className="thumb thumb-left"
              />

            <input
  type="range"
  min={0}
  max={actualMaxPrice}   // ✅ FIX
  value={maxPrice}
  onChange={(e) => setMaxPrice(Number(e.target.value))}
/>

              {/* UI SAME */}
              <div className="slider">
                <div className="slider-track"></div>
                <div
                  className="slider-range"
                  style={{
                    left: `${(minPrice / apiMaxPrice) * 100}%`,
                    right: `${100 - (maxPrice / apiMaxPrice) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Filter;