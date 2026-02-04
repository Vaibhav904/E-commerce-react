import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { AuthContext } from "../Context/AuthContext";
import Addcart from "../pages/Addcart";
import { useDispatch } from "react-redux";
import { addToCart, setCartFromApi } from "../Redux/CartSlice";
import { setBuyNowProduct } from "../Redux/buyNowSlice";

export default function Featured() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  /* ---------------- HELPERS ---------------- */
  const makeSlug = (text) =>
    text?.toLowerCase().trim().replace(/\s+/g, "-");

  /* ---------------- FETCH CATEGORY PRODUCTS ---------------- */
const fetchCategoryProducts = async () => {
  try {
    setLoading(true);

    let res;

    try {
      // 🔹 First try subcategory API
      res = await axios.get(
        `http://tech-shop.techsaga.live/api/product-subcategory/${slug}`
      );
    } catch (err) {
      // 🔹 If subcategory fails, fallback to category API
      res = await axios.get(
        `http://tech-shop.techsaga.live/api/product-category/${slug}`
      );
    }

    setProducts(res.data.products || []);
  } catch (error) {
    console.error("Product fetch error:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (slug) fetchCategoryProducts();
  }, [slug]);

  /* ---------------- PRODUCT DETAILS ---------------- */
  const fetchProductDetails = async (item) => {
    try {
      setDetailsLoading(true);
      const slug = item.slug ? item.slug : makeSlug(item.title);

      const res = await axios.get(
        `http://tech-shop.techsaga.live/api/product-details/${slug}`
      );

      setProductDetails(res.data.product);
      setCurrentImageIndex(0);
      setQuantity(1);
      setShowModal(true);
    } catch (error) {
      alert("Product details not found!");
    } finally {
      setDetailsLoading(false);
    }
  };

  /* ---------------- CART ---------------- */
  const fetchCart = async () => {
    const res = await axios.post(
      "http://tech-shop.techsaga.live/api/cart/view",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(setCartFromApi(res.data.cart));
  };

  const handleAddToCart = async (productId) => {
    setShowModal(false);
    setIsOpen(true);

    if (token) {
      await axios.post(
        "http://tech-shop.techsaga.live/api/cart/add",
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } else {
      dispatch(
        addToCart({
          product_id: productDetails.id,
          title: productDetails.title,
          price: productDetails.Salesprice,
          image: productDetails.images?.[0],
        })
      );
    }
  };

  /* ---------------- BUY NOW ---------------- */
  const handleBuyNow = () => {
    dispatch(
      setBuyNowProduct({
        id: productDetails.id,
        name: productDetails.title,
        price: Number(productDetails.Salesprice),
        quantity,
        image:
          productDetails.images?.[0] ||
          productDetails.thumbnail ||
          "",
      })
    );
    navigate("/checkout");
  };

  /* ---------------- IMAGE SLIDER ---------------- */
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productDetails.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productDetails.images.length - 1 : prev - 1
    );
  };

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="featured-pro container">
      {/* PRODUCTS */}
      <div className="row g-5">
    {products.map((item) => (
  <div className="col-md-3" key={item.id}>
    {/* <div
      className="seller-card"
      onClick={() => navigate(`/product/${item.slug}`)}
      style={{ cursor: "pointer" }}
    > */}

<div
  className="seller-card"
  onClick={() => {
    if (item?.availabilityStatus === "Out of Stock") return;
    navigate(`/product/${item.slug}`);
  }}
  style={{
    cursor:
      item?.availabilityStatus === "Out of Stock"
        ? "not-allowed"
        : "pointer",
    opacity: item?.availabilityStatus === "Out of Stock" ? 0.6 : 1,
  }}
>


      <img src={item.thumbnail} alt={item.title} />
      <h4>{item.title}</h4>
      <h6>{item.description}</h6>

      <p>
        Rs.{item.Salesprice}
        <span className="price-amount"> Rs.{item.price}</span>
        <span className="discount-value">
          ({item.discountPercentage}% off)
        </span>
      </p>

      {item.availabilityStatus === "Out of Stock" && (
        <span className="text-danger">Out of Stock</span>
      )}

      <div className="btn-selectwish">
        <div className="whislist-icon">
          <button onClick={(e) => e.stopPropagation()}>
            <CiHeart />
          </button>

          <button onClick={(e) => e.stopPropagation()}>
            <FaEye />
          </button>
        </div>

        <div className="select-option">
          {/* <button
            onClick={(e) => {
              e.stopPropagation();  
              fetchProductDetails(item);
            }}
          >
            Select options
          </button> */}

<button
  disabled={item?.availabilityStatus === "Out of Stock"}
  onClick={(e) => {
    e.stopPropagation();
    if (item?.availabilityStatus === "Out of Stock") return;
    fetchProductDetails(item);
  }}
>
  Select options
</button>




        </div>
      </div>
    </div>
  </div>
))}

      </div>

      {/* ---------------- MODAL ---------------- */}
      {showModal && productDetails && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button onClick={() => setShowModal(false)} style={styles.closeButton}>×</button>

            <div style={styles.content}>
              <div style={styles.imageSection}>
                <img
                  src={productDetails.images?.[currentImageIndex]}
                  alt=""
                  style={styles.mainImage}
                />
                <button onClick={prevImage} style={styles.navLeft}><FaAngleLeft /></button>
                <button onClick={nextImage} style={styles.navRight}><FaAngleRight /></button>
              </div>

              <div style={styles.detailsSection}>
                <h2 className="productname">{productDetails.title}</h2>
                  <p className="subproduct">{productDetails.description}</p>

                  <p className="price-product">
                    ₹{productDetails.Salesprice}
                    <del className="ps-2">₹{productDetails.price}</del>
                  </p>

                  <p>{productDetails.discountPercentage}% OFF</p>
                  <p className="mt-3 mb-1">
                    Status: {productDetails.availabilityStatus}
                  </p>


                <div className="quantity-controls">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                  <input value={quantity} readOnly />
                  <button onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>

                <button  className="btn-add-to-cart" onClick={() => handleAddToCart(productDetails.id)}>
                  Add to cart
                </button>
                <button  className="btn-shop-pay" onClick={handleBuyNow}>Buy Now</button>
              </div>




               {/* <div style={styles.detailsSection}>
                  <h2 className="productname">{productDetails.title}</h2>
                  <p className="subproduct">{productDetails.description}</p>

                  <p className="price-product">
                    ₹{productDetails.Salesprice}
                    <del className="ps-2">₹{productDetails.price}</del>
                  </p>

                  <p>{productDetails.discountPercentage}% OFF</p>
                  <p className="mt-3 mb-1">
                    Status: {productDetails.availabilityStatus}
                  </p>

                  <div
                    className="quantity-controls mb-3"
                    style={{ userSelect: "none" }}
                  >
                    <button
                      type="button"
                      onClick={handleDecrement}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      min="1"
                      max="99"
                    />
                    <button
                      type="button"
                      onClick={handleIncrement}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="mb-3">
                    <button
                      className="btn-add-to-cart"
                      onClick={(e) => handleAddToCart(productDetails?.id)}
                    >
                      <i className="fas fa-shopping-cart me-2"></i> Add to cart
                    </button>
                    <button className="btn-shop-pay" onClick={handleBuyNow}>
                      Buy Now
                    </button>

                    <div className="text-center mt-2">
                      <a
                        href="#"
                        style={{
                          fontSize: "0.85rem",
                          textDecoration: "underline",
                          color: "#111",
                        }}
                      >
                        More payment options
                      </a>
                    </div>
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      )}

      <Addcart open={isOpen} close={() => setIsOpen(false)} />
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    background: "#fff",
    width: "90%",
    maxWidth: "900px",
    borderRadius: "10px",
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 10,
    fontSize: 25,
    border: "none",
    background: "none",
  },
  content: { display: "flex", padding: 20 },
  imageSection: { flex: 1, position: "relative" },
  mainImage: { width: "100%" },
  navLeft: { position: "absolute", left: 10, top: "50%" },
  navRight: { position: "absolute", right: 10, top: "50%" },
  detailsSection: { flex: 1 },
 

  modal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "900px",
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative",
  },

  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "none",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: "#666",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },

  content: {
    display: "flex",
    gap: "30px",
    padding: "30px",
  },

  imageSection: {
    flex: 1,
  },

  mainImageContainer: {
    position: "relative",
    height: "400px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    overflow: "hidden",
  },

  mainImage: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },

  navLeft: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    fontSize: "20px",
    cursor: "pointer",
  },

  navRight: {
    position: "absolute",
    left: "46%",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    fontSize: "20px",
    cursor: "pointer",
  },

  detailsSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  productName: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#333",
  },

  description: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "15px",
  },

  price: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "10px",
  },

  cartBtn: {
    marginTop: "auto",
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
