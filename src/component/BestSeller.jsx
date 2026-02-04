import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaEye, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { AuthContext } from "../Context/AuthContext";
import Addcart from "../pages/Addcart";
import { addToCart, setCartFromApi } from "../Redux/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { setBuyNowProduct } from "../Redux/buyNowSlice";
import { useNavigate } from "react-router-dom";

export default function BestSeller() {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* ================= STATES ================= */
  const [products, setProducts] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState("best");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  console.log('productDetails', productDetails);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState(null);

  const buyNowProduct = useSelector((state) => state.buyNow);

  console.log('buyNowProduct', buyNowProduct);

const handleBuyNow = () => {
  if (!productDetails) return;

  dispatch(
    setBuyNowProduct({
      id: productDetails.id,
      name: productDetails.title,
      price: Number(productDetails.Salesprice), // 🔥 sale price
      quantity: quantity,

      // 🔥 MOST IMPORTANT FIX (IMAGE)
      image:
        productDetails.images?.[0] || // main product image
        productDetails.thumbnail ||
        productDetails.image ||
        "",

      // (optional but future-safe)
      rawImages: productDetails.images,
    })
  );

  // 👉 checkout page
  navigate("/checkout");
};

  /* ================= DROPDOWN DATAello ================= */
  const processes = {
    best: {
      name: "Best Sellers",
      api: "http://tech-shop.techsaga.live/api/best-seller/products",
    },
    new: {
      name: "New Arrival",
      api: "http://tech-shop.techsaga.live/api/new-arrival/products",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const currentProcess = processes[selectedProcess];
  const handleQuantityChange = (value) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 99) {
      setQuantity(newValue);
    }
  };
  /* ================= PRODUCT LIST API ================= */
  const fetchProducts = async (apiUrl) => {
    try {
      setLoading(true);
      const res = await axios.get(apiUrl);
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Product List Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/cart/view",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      dispatch(setCartFromApi(res.data.cart));
      console.log("Cart fetched", res.data.cart);
    } catch (error) {
      console.log("Fetch cart error", error);
    }
  };

  const handleAddToCart = async (productId) => {
    setShowModal(false);
    setIsOpen(true);

    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      if (token) {
        // 👉 Hit Add to Cart API
        const res = await axios.post(
          "http://tech-shop.techsaga.live/api/cart/add",
          { product_id: productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("API add success", res.data);

        await fetchCart(); // 👈 instant cart update
      } else {
        // 👉 Guest user → Redux me add
        dispatch(
          addToCart({
            product_id: productDetails.id,
            title: productDetails.title,
            price: productDetails.price,
            image: productDetails.images?.[0],
          }),
        );
        console.log("Redux add success");
      }
    } catch (error) {
      console.log("Add to cart failed", error);
    }
  };

  useEffect(() => {
    fetchProducts(processes.best.api);
  }, []);

  const handleSelect = (key) => {
    setSelectedProcess(key);
    setIsDropdownOpen(false);
    fetchProducts(processes[key].api);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  /* ================= SLUG MAKER (Fallback) ================= */
  const makeSlug = (text) => text?.toLowerCase().trim().replace(/\s+/g, "-");

  /* ================= PRODUCT DETAILS API (SLUG BASED) ================= */
  const fetchProductDetails = async (product) => {
    try {
      setDetailsLoading(true);

      // backend slug ho to use karo, warna title se banao
      const slug = product.slug ? product.slug : makeSlug(product.title);

      const res = await axios.get(
        `http://tech-shop.techsaga.live/api/product-details/${slug}`,
      );

      setProductDetails(res.data.product);
      setCurrentImageIndex(0);
      setShowModal(true);
    } catch (error) {
      console.error("Product Details Error:", error);
      alert("Product details not found!");
    } finally {
      setDetailsLoading(false);
    }
    console.log("hloo", product?.id);
  };

  /* ================= IMAGE SLIDER ================= */
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productDetails.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productDetails.images.length - 1 : prev - 1,
    );
  };

  /* ================= JSX ================= */
  return (
    <>
      <section>
        <h4 className="best-seller d-flex align-items-center gap-3">
          <span>You are in</span>

          {/* DROPDOWN */}
          <div>
            <button
              className="btn d-flex align-items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {currentProcess.name}
              <span className="ps-3">
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="best-product show">
                <div
                  className="dropdown-item"
                  onClick={() => handleSelect("best")}
                >
                  Best Sellers
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => handleSelect("new")}
                >
                  New Arrival
                </div>
              </div>
            )}
          </div>
        </h4>

        {/* PRODUCT LIST */}
        <div className="container-fluid px-5">
          <div className="ten-card gy-4">
          {loading ? (
  <p>Loading products...</p>
) : (
  products.map((product) => (
    <div className="best-sellercard" key={product.id}>
      <div
  className="seller-card"
  onClick={() => {
    if (product?.stock_status === "outofstock") return;
    navigate(`/product/${product.slug}`);
  }}
  style={{
    cursor:
      product?.stock_status === "outofstock" ? "not-allowed" : "pointer",
    opacity: product?.stock_status === "outofstock" ? 0.6 : 1,
  }}
>

        <img src={product.images?.[product.images?.length-1]} alt={product.title} />

        <h4>{product.title}</h4>

        <p>
          ₹{product.Salesprice}
          <del className="ps-2 text-muted">₹{product.price}</del>
        </p>

        <span className="discount">
          {product.discountPercentage}% OFF
        </span>

   {product?.stock_status === "outofstock" && (
  <p className="text-danger fw-bold">Out of Stock</p>
)}


{/* <p className="text-danger fw-bold">{product.stock_status}</p>
    {product.stock_status === "Out of Stock" && (
  <p className="text-danger fw-bold">Out of Stock</p>
)} */}


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
           <button
  disabled={product?.stock_status === "outofstock"}
  style={{
    opacity: product?.stock_status === "outofstock" ? 0.5 : 1,
    cursor: product?.stock_status === "outofstock" ? "not-allowed" : "pointer",
  }}
  onClick={(e) => {
    e.stopPropagation();
    if (product?.stock_status === "outofstock") return;
    fetchProductDetails(product);
  }}
>
  Select options
</button>

          </div>
        </div>
      </div>
    </div>
  ))
)}

          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {showModal && productDetails && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button
              onClick={() => setShowModal(false)}
              style={styles.closeButton}
            >
              ×
            </button>

            {detailsLoading ? (
              <p>Loading product details...</p>
            ) : (
              <div style={styles.content}>
                {/* LEFT */}
                <div style={styles.imageSection}>
                  <img
                    src={productDetails.images?.[currentImageIndex]}
                    alt={productDetails.title}
                    style={styles.mainImage}
                  />

                  {productDetails.images?.length > 1 && (
                    <>
                      <button onClick={prevImage} style={styles.navLeft}>
                        <FaAngleLeft />
                      </button>
                      <button onClick={nextImage} style={styles.navRight}>
                        <FaAngleRight />
                      </button>
                    </>
                  )}
                </div>
                {/* RIGHT */}
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
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Addcart open={isOpen} close={(e) => setIsOpen(false)} />
    </>
  );
}
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },

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

// Responsive styles
const responsiveStyles = `
  @media (max-width: 768px) {
    .modal-content {
      flex-direction: column;
      padding: 20px;
    }
    
    .main-image-container {
      height: 300px;
    }
    
    .action-buttons {
      flex-direction: column;
    }
  }
`;
