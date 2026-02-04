import { useEffect, useState } from "react";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import Filter from "./Filter";

export default function CategoryshopAlls() {
  const navigate = useNavigate();
  const { slug } = useParams(); // 👈 category slug (bike)

  /* ================= STATES ================= */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // modal
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // quantity
  const [quantity, setQuantity] = useState(1);

  // stock filter
  const [stockUpdate, setStockUpdate] = useState("Instock");

  /* ================= FETCH CATEGORY PRODUCTS ================= */
  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://tech-shop.techsaga.live/api/product-category/${slug}`
      );

      let allProducts = res.data.products || [];

      if (stockUpdate === "Instock") {
        allProducts = allProducts.filter(
          (item) => item.availabilityStatus === "In Stock"
        );
      }

      setProducts(allProducts);
    } catch (error) {
      console.log("Category product error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [slug, stockUpdate]);

  /* ================= FILTER ================= */
  const showStock = (value) => {
    setStockUpdate(value);
  };

  /* ================= PRODUCT DETAILS (MODAL) ================= */
  const fetchProductDetails = async (product) => {
    try {
      const res = await axios.get(
        `http://tech-shop.techsaga.live/api/product-category/${product.slug}`
      );
      setProductDetails(res.data.product);
      setCurrentImageIndex(0);
      setQuantity(1);
      setShowModal(true);
    } catch (error) {
      alert("Product details not found");
    }
  };

  /* ================= IMAGE SLIDER ================= */
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

  /* ================= JSX ================= */
  return (
    <div className="headerbt">
      <div className="container-fluid px-5">

        {/* BANNER */}
        <div className="banner-crumb">
          <img
            src="https://fashion.minimog.co/cdn/shop/files/collection-banner-section.jpg?v=1709194155&width=2000"
            alt=""
          />
          <div className="categorie-banner">
            <h4>{slug}</h4>
            <p>Explore all products in this category</p>
          </div>
        </div>

        <div className="categoury-fields">
          {/* FILTER */}
          <div className="first-fil">
            <Filter showStock={showStock} />
          </div>

          {/* PRODUCTS */}
          <div className="second-fil">
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <div className="product-grid">
                {products.map((product) => (
                  <div className="best-sellercard" key={product.id}>
                    <div
                      className="seller-card"
                      onClick={() =>
                        navigate(`/category-all/${product.slug}`)
                      }
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                      />

                      <h4>{product.title}</h4>

                      <p>
                        ₹{product.Salesprice}
                        <del className="ps-2 text-muted">
                          ₹{product.price}
                        </del>
                      </p>

                      <span className="discount">
                        {product.discountPercentage}% OFF
                      </span>

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
                            onClick={(e) => {
                              e.stopPropagation();
                              fetchProductDetails(product);
                            }}
                          >
                            Select options
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {products.length === 0 && (
                  <p>No products found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

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

            <div style={styles.content}>
              {/* LEFT */}
              <div style={styles.imageSection}>
                <img
                  src={productDetails.images?.[currentImageIndex]}
                  alt=""
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
                <h2>{productDetails.title}</h2>
                <p>{productDetails.description}</p>

                <p>
                  ₹{productDetails.Salesprice}
                  <del className="ps-2">₹{productDetails.price}</del>
                </p>

                <p>Status: {productDetails.availabilityStatus}</p>

                <div className="quantity-controls">
                  <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                  <input value={quantity} readOnly />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>

                <button className="btn-shop-pay">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= MODAL STYLES ================= */
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modal: {
    background: "#fff",
    width: "90%",
    maxWidth: "900px",
    borderRadius: "12px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 15,
    fontSize: 26,
    border: "none",
    background: "none",
    cursor: "pointer",
  },
  content: {
    display: "flex",
    gap: 30,
    padding: 30,
  },
  imageSection: { flex: 1 },
  mainImage: { width: "100%", height: 400, objectFit: "contain" },
  navLeft: { position: "absolute", left: 15, top: "50%" },
  navRight: { position: "absolute", right: 15, top: "50%" },
  detailsSection: { flex: 1 },
};
