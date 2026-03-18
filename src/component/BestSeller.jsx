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
const [product, setProduct] = useState(null);
const [isWishlisted, setIsWishlisted] = useState(false);
const [wishlist, setWishlist] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState("best");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  console.log("productDetails", productDetails);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
 
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  console.log('selectedSizeId------', selectedSizeId);
  console.log('selectedColorId------', selectedColorId);
  const buyNowProduct = useSelector((state) => state.buyNow);

  console.log("buyNowProduct", buyNowProduct);

  const handleBuyNow = () => {
    if (!selectedVariant) return;

    const selectedAttributes = getSelectedAttributeIds(selectedVariant);
    console.log('selectedAttributes------------',selectedAttributes)
    dispatch(
      setBuyNowProduct({
        product_id: productDetails.id,
        variant_id: selectedVariant.variant_id,
        attributes: selectedAttributes,
        name: productDetails.title,
        price: Number(selectedVariant.sale_price),
        quantity,
        image: selectedVariant.images?.[0] || selectedVariant.thumbnail || "",
      }),
    );

    navigate("/checkout");
  };



const handleWishlistToggle = async (e, product) => {
  e.stopPropagation();

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const detailRes = await axios.get(
      `http://tech-shop.techsaga.live/api/product-details/${product.slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    console.log("my details", detailRes);

    const variantId = detailRes.data.product?.variants?.[0]?.variant_id;
    console.log("my variantId", variantId);

    const res = await axios.post(
      "http://tech-shop.techsaga.live/api/wishlist/toggle",
      {
        product_id: product.id,
        variant_id: variantId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    console.log("wishlist response", res.data);

    // ⭐ UI update
    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              in_wishlist: !item.in_wishlist,
            }
          : item
      )
    );
  } catch (error) {
    console.log("Wishlist toggle failed", error.response?.data);
  }
};

useEffect(() => {
  setIsWishlisted(product?.in_wishlist);
}, [product]);
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

    const token = localStorage.getItem("token");

    const res = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

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

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    setShowModal(false);
    setIsOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const selectedAttributes = getSelectedAttributeIds(selectedVariant);

    try {
      // console.log('token-------->dddddddddddddd', token);
      if (token) {
        await axios.post(
          "http://tech-shop.techsaga.live/api/cart/add",
          {
            product_id: productDetails.id,
            variant_id: selectedVariant.variant_id,
            variant_attribute_id: [selectedSizeId,selectedColorId],
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );

        await fetchCart();
      } else {
       dispatch(
  addToCart({
    product_id: productDetails.id,
    variant_id: selectedVariant.variant_id,
    variant_attribute_id: [selectedSizeId, selectedColorId], // 👈 IMPORTANT
    title: productDetails.title,
    price: selectedVariant.sale_price,
    image:
      selectedVariant.images?.[0] || selectedVariant.thumbnail || "",
    quantity,
  }),
);
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
    setQuantity(1);

    const slug = product?.slug
      ? product.slug
      : makeSlug(product?.title);

    const res = await axios.get(
      `http://tech-shop.techsaga.live/api/product-details/${slug}`
    );

    const productData = res?.data?.product;

    if (!productData) return;

    setProductDetails(productData);
    setCurrentImageIndex(0);
    setShowModal(true);

    // Default Variant Auto Select
    if (productData?.variants?.length > 0) {
            const defaultVariant = productData.variants[0]?.attributes[0]?.id;
            console.log('defaultVariant----------------',defaultVariant)
      // const defaultVariant = productData.variants[0];
      setSelectedVariant(defaultVariant);

      const firstColor = defaultVariant?.attributes?.find(
        (a) => a.attribute_name?.toLowerCase() === "color"
      );

      setSelectedColorId(firstColor?.id || null);
    }
  } catch (error) {
    console.error("Product Details Error:", error);
  } finally {
    setDetailsLoading(false);
  }
};

  /* ================= IMAGE SLIDER ================= */
  // const nextImage = () => {
  //   setCurrentImageIndex((prev) =>
  //     prev === productDetails.images.length - 1 ? 0 : prev + 1,
  //   );
  // };

  // const prevImage = () => {
  //   setCurrentImageIndex((prev) =>
  //     prev === 0 ? productDetails.images.length - 1 : prev - 1,
  //   );
  // };

 

  const getSelectedAttributeIds = (variant) => {
    if (!variant?.attributes) return [];
    return variant.attributes.map((attr) => ({
      attribute_id: attr.id,
      attribute_name: attr.attribute_name,
      value: attr.value,
    }));
  };


  const getImages = () => {
  if (selectedVariant?.images?.length > 0) {
    return selectedVariant.images;
  }
  return productDetails?.images || [];
};

const nextImage = () => {
  const images = getImages();
  if (images.length === 0) return;

  setCurrentImageIndex((prev) =>
    prev === images.length - 1 ? 0 : prev + 1
  );
};

const prevImage = () => {
  const images = getImages();
  if (images.length === 0) return;

  setCurrentImageIndex((prev) =>
    prev === 0 ? images.length - 1 : prev - 1
  );
};

useEffect(() => {
  if (!showModal) return;

  const images =
    selectedVariant?.images?.length > 0
      ? selectedVariant.images
      : productDetails?.images || [];

  if (images.length <= 1) return;

  const interval = setInterval(() => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, 3000); // 3 seconds

  return () => clearInterval(interval);
}, [showModal, selectedVariant, productDetails]);

useEffect(() => {
  if (productDetails?.variants?.length > 0) {
    const firstVariant = productDetails.variants[0];

    setSelectedVariant(firstVariant);

    const firstColor = firstVariant?.attributes?.find(
      (a) => a.attribute_name?.toLowerCase() === "color"
    );

    setSelectedColorId(firstColor?.id || null);
  }
}, [productDetails]);

console.log({
  product_id: productDetails?.id,
  variant_id: selectedVariant?.variant_id,
  quantity,
});

console.log("my produc t",product);

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
                        product?.stock_status === "outofstock"
                          ? "not-allowed"
                          : "pointer",
                      opacity: product?.stock_status === "outofstock" ? 0.6 : 1,
                    }}
                  >
                    <img
                      src={product.images?.[product.images?.length - 1]}
                      alt={product.title}
                    />

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
     <button>
 <CiHeart
  size={20}
  style={{
    color: product?.in_wishlist ? "red" : "#ccc",
    cursor: "pointer",
  }}
  onClick={(e) => handleWishlistToggle(e, product)}
/>
</button>

                        <button onClick={(e) => e.stopPropagation()}>
                          <FaEye />
                        </button>
                      </div>

                      <div className="select-option">
                        <button
                          disabled={product?.stock_status === "outofstock"}
                          style={{
                            opacity:
                              product?.stock_status === "outofstock" ? 0.5 : 1,
                            cursor:
                              product?.stock_status === "outofstock"
                                ? "not-allowed"
                                : "pointer",
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
        <p className="p-4">Loading...</p>
      ) : (
        <div style={styles.content}>
          {/* LEFT IMAGE */}
<div style={styles.imageSection}>
  <div style={styles.mainImageContainer}>
    <img
      src={
        (
          selectedVariant?.images?.length > 0
            ? selectedVariant.images
            : productDetails?.images
        )?.[currentImageIndex] || "https://via.placeholder.com/400"
      }
      alt={productDetails?.title}
      style={styles.mainImage}
    />

    {(
      selectedVariant?.images?.length > 1 ||
      productDetails?.images?.length > 1
    ) && (
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
</div>

          {/* RIGHT DETAILS */}
          <div style={styles.detailsSection}>
            <h2>{productDetails?.title}</h2>

            {/* DESCRIPTION */}
            <p style={{ color: "#666" }}>
              {productDetails?.description || "No description available"}
            </p>

            {/* PRICE */}
            <h4>
              ₹{selectedVariant?.sale_price || productDetails?.Salesprice}
              <del className="ps-2 text-muted">
                ₹{selectedVariant?.price || productDetails?.price}
              </del>
            </h4>

            {/* SIZE */}
            {productDetails?.variants?.length > 0 && (
              <div className="my-3">
                <label className="fw-bold">Size:</label>
                <div className="d-flex gap-2 mt-2 flex-wrap">
                  {productDetails.variants.map((variant) => {
                    const sizeAttr = variant?.attributes?.find(
                      (a) =>
                        a.attribute_name?.toLowerCase() === "size"
                    );

                    if (!sizeAttr) return null;

                    return (
                      <button
                        key={variant.variant_id}
                        className={`btn ${
                          selectedVariant?.variant_id ===
                          variant.variant_id
                            ? "btn-dark"
                            : "btn-outline-dark"
                        }`}
                        onClick={() => {
                          setSelectedVariant(variant);

                          const firstColor =
                            variant?.attributes?.find(
                              (a) =>
                                a.attribute_name?.toLowerCase() ===
                                "size"
                            );

                          setSelectedSizeId(firstColor?.id);
                        }}
                      >
                        {sizeAttr?.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* COLOR */}
            {selectedVariant?.attributes?.some(
              (a) =>
                a.attribute_name?.toLowerCase() === "color"
            ) && (
              <div className="my-3">
                <label className="fw-bold">Color:</label>
                <div className="d-flex gap-3 mt-2">
                  {selectedVariant.attributes
                    .filter(
                      (a) =>
                        a.attribute_name?.toLowerCase() ===
                        "color"
                    )
                    .map((colorAttr) => (
                      <div
                        key={colorAttr.id}
                        onClick={() =>
                          setSelectedColorId(colorAttr.id)
                        }
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50%",
                          backgroundColor:
                            colorAttr?.value?.toLowerCase(),
                          cursor: "pointer",
                          border:
                            selectedColorId === colorAttr.id
                              ? "3px solid black"
                              : "1px solid #ccc",
                        }}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="quantity-controls my-3 my-3">
              <button
                className="btn btn-outline-dark"
                onClick={handleDecrement}
              >
                -
              </button>

              <input
                type="number"
                value={quantity}
                readOnly
                style={{ textAlign: "center" }}
              />

              <button
                className="btn btn-outline-dark"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>

            {/* BUTTONS */}
            <button
              className="btn-add-to-cart"
             onClick={(e) => handleAddToCart(productDetails?.id)}
            >
              Add to Cart
            </button>

            <button
              className="btn-shop-pay"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
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
    left: "0px",
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
    left: "88%",
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
