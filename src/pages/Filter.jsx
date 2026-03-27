import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFiltered } from "../Redux/ProductSlice";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Filter({ showStock }) {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [stockStatus, setStockStatus] = useState("1");
  const [maxPrice, setMaxPrice] = useState(0);
  const [apiMaxPrice, setApiMaxPrice] = useState(0);
  const [actualMaxPrice, setActualMaxPrice] = useState(0);
  const [attributes, setAttributes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  // const [selectedColor, setSelectedColor] = useState("");
  const step = 10;

  /* ================= API CALL ================= */

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/category",
      );

      if (res.data?.status) {
        setCategories(res.data.categories || []);
      }
    } catch (error) {
      console.error("Category API error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h5>Loading Filters...</h5>
        </div>
      );
    }

    try {
      setLoading(true); // 🔵 loader start
      // alert("Filter API Hit 🔥");

      const res = await axios.get(
        `http://tech-shop.techsaga.live/api/product-category/${slug}`,
        {
          params: {
            price_min: minPrice,
            price_max: maxPrice || 999999,
            ...(selectedSize && { size: selectedSize }),
            // ...(selectedColor && { Color: selectedColor }),
            ...(stockStatus !== "" && { in_stock: stockStatus }), // ✅ NEW
            ...(selectedCategory.length && {
              category: selectedCategory.join(","),
            }),
          },
        },
      );

      if (res.data?.status) {
        dispatch(setFiltered(res.data.products || []));
        setAttributes(res.data.attributes || []);

        if (res.data.max_price && apiMaxPrice === 0) {
          setApiMaxPrice(res.data.max_price);
          setMaxPrice(res.data.max_price);
        }
      }
    } catch (err) {
      console.error("Filter API error:", err);
    } finally {
      setLoading(false); // 🔵 loader stop
    }
  };
  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  /* ================= AUTO FILTER ================= */

  useEffect(() => {
    if (apiMaxPrice) {
      setActualMaxPrice(apiMaxPrice); // 🔒 ORIGINAL VALUE
      setMaxPrice(apiMaxPrice); // 🎚 slider start value
    }
  }, [apiMaxPrice]);

  useEffect(() => {
    if (slug) {
      fetchProducts();
    }
  }, [
    minPrice,
    maxPrice,
    selectedSize,
    // selectedColor,
    stockStatus,
    selectedCategory,
  ]);

  /* ================= PRICE HANDLERS ================= */

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - step);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + step);
    setMaxPrice(value);
  };

  return (
    <div className="filter-section">
      <h4>Filters</h4>
      <button
        className="btn btn-secondary mt-3 w-100"
        onClick={() => {
          setMinPrice(0);
          setMaxPrice(apiMaxPrice);
          setSelectedSize("");
          // setSelectedColor("");
          setStockStatus(1);
          setSelectedCategory([]);
        }}
      >
        Clear Filters
      </button>

      <Accordion defaultActiveKey={["0", "1", "2", "cat"]} alwaysOpen>
        {/* ================= Availability ================= */}

        <Accordion.Item eventKey="0">
          <Accordion.Header>Availability</Accordion.Header>

          <Accordion.Body>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="stock"
                checked={stockStatus === "1"}
                onChange={() => setStockStatus("1")}
              />
              <label className="form-check-label">In stock</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="stock"
                checked={stockStatus === "0"}
                onChange={() => setStockStatus("0")}
              />
              <label className="form-check-label">Out of stock</label>
            </div>
          </Accordion.Body>
        </Accordion.Item>

   {/* ================= PRICE ================= */}

        <Accordion.Item eventKey="1">
          <Accordion.Header>Price</Accordion.Header>

          <Accordion.Body>
            <p className="price-rangefilter">
              ₹{minPrice} - ₹{maxPrice}
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
                max={actualMaxPrice} // ✅ FIX
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


        {/* ================= CATEGORY ================= */}

        <Accordion.Item eventKey="cat" >
          <Accordion.Header>Category</Accordion.Header>

          <Accordion.Body>
            {categories.map((cat) => (
              <div className="form-check" key={cat.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={slug === cat.slug}
                  onChange={() => navigate(`/categorie/${cat.slug}`)}
                />

                <label className="form-check-label">
                  {cat.category_name} ({cat.total_products})
                </label>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>

     

        {/* ================= ATTRIBUTES ================= */}

      {attributes
  .filter((attr) => attr.attribute_name !== "Color")
  .map((attr, index) => (
    <Accordion.Item eventKey={`attr-${index}`} key={index}>
      <Accordion.Header>{attr.attribute_name}</Accordion.Header>

      <Accordion.Body>
        {attr.values.map((val, i) => (
          <div className="form-check" key={i}>
            <input
              className="form-check-input"
              type="radio"
              name={attr.attribute_name}
              checked={selectedSize === val.value}
              onChange={() => {
                if (selectedSize === val.value) {
                  setSelectedSize("");
                } else {
                  setSelectedSize(val.value);
                }
              }}
            />

            <label className="form-check-label">
              {val.value} ({val.product_count})
            </label>
          </div>
        ))}
      </Accordion.Body>
    </Accordion.Item>
))}
      </Accordion>
      {/* <Filter showStock={showStock} setFilterLoading={setFilterLoading} /> */}
    </div>
  );
}

export default Filter;
