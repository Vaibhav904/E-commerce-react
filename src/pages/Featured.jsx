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
import { useSelector } from "react-redux";

export default function Featured() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const [selectedColorId, setSelectedColorId] = useState(null);
const [wishlistState, setWishlistState] = useState({});
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
const [filterLoading, setFilterLoading] = useState(false);
const [loading, setLoading] = useState(true);
  /* ---------------- HELPERS ---------------- */
  const makeSlug = (text) => text?.toLowerCase().trim().replace(/\s+/g, "-");

  /* ---------------- FETCH CATEGORY PRODUCTS ---------------- */
const fetchCategoryProducts = async () => {
  try {
    setLoading(true);
    //  setLoading(true);
      //  alert("API hit ho rahi hai...");

    let res;

    try {
         
      // 🔹 First try subcategory API
      res = await axios.get(
  `http://tech-shop.techsaga.live/api/product-subcategory/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
);
    } catch (err) {
      // 🔹 If subcategory fails, fallback to category API
    res = await axios.get(
  `http://tech-shop.techsaga.live/api/product-category/${slug}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  }
);
    }

    const productList = res.data.products || [];

    setProducts(productList);

    // ✅ wishlist state prepare
    const wishlistMap = {};
    productList.forEach((p) => {
      wishlistMap[p.id] = p.in_wishlist;
    });

    setWishlistState(wishlistMap);

  } catch (error) {
    console.error("Product fetch error:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (slug) fetchCategoryProducts();
}, [slug]);


const handleWishlistToggle = async (e, item) => {
  e.stopPropagation();

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const detailRes = await axios.get(
      `http://tech-shop.techsaga.live/api/product-details/${item.slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const variantId =
      detailRes.data.product?.variants?.[0]?.variant_id;

    await axios.post(
      "http://tech-shop.techsaga.live/api/wishlist/toggle",
      {
        product_id: item.id,
        variant_id: variantId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // UI instant update
    setWishlistState((prev) => ({
      ...prev,
      [item.id]: !prev[item.id],
    }));

  } catch (error) {
    console.log("wishlist error", error);
  }
};

  const filteredProducts = useSelector((state) => state.products.filtered);

  /* ---------------- PRODUCT DETAILS ---------------- */
  const fetchProductDetails = async (item) => {
    try {
      setDetailsLoading(true);
      setQuantity(1);

      const slug = item.slug ? item.slug : makeSlug(item.title);

      const res = await axios.get(
        `http://tech-shop.techsaga.live/api/product-details/${slug}`,
      );

      const productData = res?.data?.product;

      if (!productData) return;

      setProductDetails(productData);
      setCurrentImageIndex(0);
      setShowModal(true);

      // ✅ DEFAULT VARIANT AUTO SELECT
      if (productData?.variants?.length > 0) {
        const firstVariant = productData.variants[0];
        setSelectedVariant(firstVariant);

        const sizeAttr = firstVariant?.attributes?.find(
          (a) => a.attribute_name?.toLowerCase() === "size",
        );
        const colorAttr = firstVariant?.attributes?.find(
          (a) => a.attribute_name?.toLowerCase() === "color",
        );

        setSelectedSizeId(sizeAttr?.id || null);
        setSelectedColorId(colorAttr?.id || null);
      }
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
      },
    );
    dispatch(setCartFromApi(res.data.cart));
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    setShowModal(false);
    setIsOpen(true);

    try {
      if (token) {
        await axios.post(
          "http://tech-shop.techsaga.live/api/cart/add",
          {
            product_id: productDetails.id,
            variant_id: selectedVariant.variant_id,
            variant_attribute_id: [selectedSizeId, selectedColorId],
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );

        fetchCart();
      } else {
        dispatch(
          addToCart({
            product_id: productDetails.id,
            variant_id: selectedVariant.variant_id,
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

  /* ---------------- BUY NOW ---------------- */
  const handleBuyNow = () => {
    if (!selectedVariant) return;

    dispatch(
      setBuyNowProduct({
        product_id: productDetails.id,
        variant_id: selectedVariant.variant_id,
        name: productDetails.title,
        price: Number(selectedVariant.sale_price),
        quantity,
        image: selectedVariant.images?.[0] || selectedVariant.thumbnail || "",
      }),
    );

    navigate("/checkout");
  };

  /* ---------------- IMAGE SLIDER ---------------- */
  const getImages = () => {
    if (selectedVariant?.images?.length > 0) {
      return selectedVariant.images;
    }
    return productDetails?.images || [];
  };

  const nextImage = () => {
    const images = getImages();
    if (images.length === 0) return;

    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    const images = getImages();
    if (images.length === 0) return;

    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
    const displayProducts = filteredProducts.length ? filteredProducts : products;

const sortedProducts = [...displayProducts].sort((a, b) => {
  if (sortOrder === "asc") {
    return a.title.localeCompare(b.title);
  }
  if (sortOrder === "desc") {
    return b.title.localeCompare(a.title);
  }
  return 0;
});


// if (loading) return <h3 className="text-center mt-5">Loading...</h3>;

   return (
  <div className="featured-pro container">
    <div className="d-flex justify-content-start mb-3">

  <Dropdown>
    <Dropdown.Toggle variant="dark">
      Sort By
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={() => setSortOrder("asc")}>
        A → Z
      </Dropdown.Item>

      <Dropdown.Item onClick={() => setSortOrder("desc")}>
        Z → A
      </Dropdown.Item>
    </Dropdown.Menu>

  </Dropdown>

</div>
    {/* PRODUCTS */}
    {/* PRODUCTS */}

{loading ? (
  <div className="text-center py-5">
    <div className="spinner-border text-dark" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
) : (
    <div className="row g-5 py-5">
      {sortedProducts.map((item) => (
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
              <button onClick={(e) => handleWishlistToggle(e, item)}>
  <CiHeart
    size={22}
    style={{
      color: wishlistState[item.id] ? "red" : "#ccc",
      cursor: "pointer",
    }}
  />
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
    )}

    {/* ---------------- MODAL ---------------- */}
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
                      (selectedVariant?.images?.length > 0
                        ? selectedVariant.images
                        : productDetails?.images)?.[currentImageIndex] ||
                      "https://via.placeholder.com/400"
                    }
                    alt={productDetails?.title}
                    style={styles.mainImage}
                  />

                  {(selectedVariant?.images?.length > 1 ||
                    productDetails?.images?.length > 1) && (
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
                          (a) => a.attribute_name?.toLowerCase() === "size",
                        );

                        if (!sizeAttr) return null;

                        return (
                          <button
                            key={variant.variant_id}
                            className={`btn ${
                              selectedVariant?.variant_id === variant.variant_id
                                ? "btn-dark"
                                : "btn-outline-dark"
                            }`}
                            onClick={() => {
                              setSelectedVariant(variant);

                              const sizeAttr = variant?.attributes?.find(
                                (a) =>
                                  a.attribute_name?.toLowerCase() === "size",
                              );

                              const colorAttr = variant?.attributes?.find(
                                (a) =>
                                  a.attribute_name?.toLowerCase() === "color",
                              );

                              setSelectedSizeId(sizeAttr?.id || null);
                              setSelectedColorId(colorAttr?.id || null);
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
                  (a) => a.attribute_name?.toLowerCase() === "color",
                ) && (
                  <div className="my-3">
                    <label className="fw-bold">Color:</label>
                    <div className="d-flex gap-3 mt-2">
                      {selectedVariant.attributes
                        .filter(
                          (a) => a.attribute_name?.toLowerCase() === "color",
                        )
                        .map((colorAttr) => (
                          <div
                            key={colorAttr.id}
                            onClick={() => setSelectedColorId(colorAttr.id)}
                            style={{
                              width: "35px",
                              height: "35px",
                              borderRadius: "50%",
                              backgroundColor: colorAttr?.value?.toLowerCase(),
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

                <button className="btn-shop-pay" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </div>
          )}
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
