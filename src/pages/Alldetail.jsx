import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Drift from "drift-zoom";
import Addcart from "./Addcart";
import { AuthContext } from "../Context/AuthContext";
import { getProductById } from "../utils/requests";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

import { addToCart, setCartFromApi } from "../Redux/CartSlice";
import { setBuyNowProduct } from "../Redux/buyNowSlice";
import { useDispatch } from "react-redux";

export default function Alldetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  console.log("selectedVariant", selectedVariant);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  /* ================= HELPER: GET ATTRIBUTE IDS ================= */
  const [wishlistChecked, setWishlistChecked] = useState(false);

  /* ================= COLOR VARIANTS ================= */
  const colorVariants =
    product?.variants?.filter((v) =>
      v.attributes?.some((a) => a.attribute_name.toLowerCase() === "color"),
    ) || [];

  /* ================= FETCH PRODUCT ================= */
  const fetchProduct = async () => {
    try {
      const response = await getProductById(id); // 👈 res ki jagah response use karo
      const productData = response.product;

      setProduct(productData);

      if (productData?.variants?.length > 0) {
        const defaultVariant = productData.variants[0];
        setSelectedVariant(defaultVariant);

        // ⭐ wishlist state sync
        setIsWishlisted(defaultVariant.in_wishlist);

        const sizeAttr = defaultVariant.attributes.find(
          (a) => a.attribute_name.toLowerCase() === "size",
        );

        const colorAttr = defaultVariant.attributes.find(
          (a) => a.attribute_name.toLowerCase() === "color",
        );

        setSelectedSizeId(sizeAttr?.id || null);
        setSelectedColorId(colorAttr?.id || null);
      }
    } catch (error) {
      console.error("Product fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleWishlistToggle = async () => {
    // 1️⃣ Agar user login nahi hai
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // 2️⃣ API call
      const res = await axios.post(
        "http://tech-shop.techsaga.live/api/wishlist/toggle",
        {
          product_id: product.id,
          variant_id: selectedVariant.variant_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      // 3️⃣ Response check karke button state change karo

      //     if (res.data.status) {
      //   await checkWishlistStatus();
      // }
      if (res.data.status) {
        await fetchProduct(); // ⭐ important fix
      }
    } catch (error) {
      console.log("Wishlist toggle failed", error);
    }
  };

  useEffect(() => {
    if (selectedVariant) {
      setIsWishlisted(selectedVariant.in_wishlist);
    }
  }, [selectedVariant]);

  /* ================= LOG DEFAULT / CLICKED VARIANT ================= */
  // useEffect(() => {
  //   if (!selectedVariant) return;

  //   console.log("✅ Selected Variant:", {
  //     variant_id: selectedVariant.variant_id,
  //     attributes: getSelectedAttributeIds(selectedVariant),
  //   });
  // }, [selectedVariant]);

  /* ================= VARIANT IMAGES ================= */
  const images =
    selectedVariant?.images?.length > 0
      ? selectedVariant.images
      : selectedVariant?.thumbnail
        ? [selectedVariant.thumbnail]
        : [];

  /* ================= IMAGE SLIDER ================= */
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(handleNextImage, 5000);
    return () => clearInterval(interval);
  }, [images]);

  /* ================= DRIFT ZOOM ================= */
  useEffect(() => {
    const triggerEl = document.querySelector(".drift-demo-trigger");
    const paneEl = document.querySelector(".zoom-pane");

    if (triggerEl && paneEl) {
      new Drift(triggerEl, {
        paneContainer: paneEl,
        inlinePane: 769,
        containInline: true,
        hoverBoundingBox: true,
      });
    }
  }, [currentImageIndex, selectedVariant]);

  if (!product || !selectedVariant)
    return <div className="text-center py-5">Loading...</div>;

  /* ================= SIZE VARIANTS ================= */
  const sizeVariants = product.variants.filter((v) =>
    v.attributes?.some((a) => a.attribute_name.toLowerCase() === "size"),
  );

  /* ================= FETCH CART ================= */
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
    } catch (error) {
      console.log("Fetch cart error", error);
    }
  };

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async () => {
    setIsOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      if (token) {
        await axios.post(
          "http://tech-shop.techsaga.live/api/cart/add",
          {
            product_id: product.id,
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

        await fetchCart();
      } else {
        dispatch(
          addToCart({
            product_id: product.id,
            variant_id: selectedVariant.variant_id,
            variant_attribute_id: [selectedSizeId, selectedColorId],
            title: product.title,
            price: selectedVariant.sale_price,
            image: images[0],
            quantity,
          }),
        );
      }
    } catch (error) {
      console.log("Add to cart failed", error);
    }
  };
  /* ================= BUY NOW ================= */
  const handleBuyNow = () => {
    dispatch(
      setBuyNowProduct({
        product_id: product.id,
        variant_id: selectedVariant.variant_id,
        variant_attribute_id: [selectedSizeId, selectedColorId],
        name: product.title,
        price: Number(selectedVariant.sale_price),
        quantity,
        image: images[0],
      }),
    );

    navigate("/checkout");
  };

  return (
    <div className="container my-4">
      <div className="row gx-5">
        {/* LEFT */}
        <div className="col-md-6 position-relative">
          <div className="main-image-container">
            <button
              className="nav-arrow nav-arrow-left"
              onClick={handlePrevImage}
            >
              &#10094;
            </button>

            <img
              className="drift-demo-trigger"
              src={images[currentImageIndex]}
              data-zoom={images[currentImageIndex]}
              alt={product.title}
            />

            <button
              className="nav-arrow nav-arrow-right"
              onClick={handleNextImage}
            >
              &#10095;
            </button>
          </div>

          <div className="zoom-pane"></div>

          <div className="thumbnail-list">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                className={i === currentImageIndex ? "active" : ""}
                onClick={() => setCurrentImageIndex(i)}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>

          <div className="price">
            ₹{selectedVariant.sale_price}
            <span className="original-price ms-2">
              ₹{selectedVariant.price}
            </span>
            <span className="discount-badge ms-2">
              {selectedVariant.discountPercentage}% OFF
            </span>
          </div>

          {/* SIZE SELECT */}
          {/* SIZE SELECT */}
          {sizeVariants.length > 0 && (
            <div className="my-3">
              <label className="fw-bold">Size:</label>
              <div className="d-flex gap-2 mt-2">
                {sizeVariants.map((variant) => {
                  const sizeAttr = variant.attributes.find(
                    (a) => a.attribute_name.toLowerCase() === "size",
                  );

                  return (
                    <button
                      key={variant.variant_id}
                      className={`btn ${
                        selectedVariant.variant_id === variant.variant_id
                          ? "btn-dark"
                          : "btn-outline-dark"
                      }`}
                      onClick={() => {
                        setSelectedVariant(variant);
                        setCurrentImageIndex(0);

                        const sizeAttr = variant.attributes.find(
                          (a) => a.attribute_name.toLowerCase() === "size",
                        );

                        const colorAttr = variant.attributes.find(
                          (a) => a.attribute_name.toLowerCase() === "color",
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

          {/* COLOR SELECT */}
          {selectedVariant?.attributes?.filter(
            (a) => a.attribute_name.toLowerCase() === "color",
          ).length > 0 && (
            <div className="my-3">
              <label className="fw-bold">Color:</label>
              <div className="d-flex gap-3 mt-2">
                {selectedVariant.attributes
                  .filter((a) => a.attribute_name.toLowerCase() === "color")
                  .map((colorAttr) => (
                    <div
                      key={colorAttr.id}
                      onClick={() => {
                        setSelectedColorId(colorAttr.id);

                        const matchedVariant = product.variants.find((v) =>
                          v.attributes.some(
                            (a) =>
                              a.attribute_name.toLowerCase() === "color" &&
                              a.id === colorAttr.id,
                          ),
                        );

                        if (matchedVariant) {
                          setSelectedVariant(matchedVariant);

                          const sizeAttr = matchedVariant.attributes.find(
                            (a) => a.attribute_name.toLowerCase() === "size",
                          );

                          setSelectedSizeId(sizeAttr?.id || null);
                        }
                      }}
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        backgroundColor: colorAttr.value.toLowerCase(),
                        cursor: "pointer",
                        border:
                          selectedColorId === colorAttr.id
                            ? "3px solid black"
                            : "1px solid #ccc",
                        transform:
                          selectedColorId === colorAttr.id
                            ? "scale(1.1)"
                            : "scale(1)",
                        transition: "0.2s",
                      }}
                    />
                  ))}
              </div>
            </div>
          )}

          <p className="mt-3">{product.description}</p>

          <div className="quantity-controls my-3">
            <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
              −
            </button>
            <input value={quantity} readOnly />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <button className="btn-add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <button className="btn-shop-pay" onClick={handleBuyNow}>
            Buy Now
          </button>
          <button
            className={`btn-shop-pay mt-3 ${isWishlisted ? "btn-dark" : ""}`}
            onClick={handleWishlistToggle}
          >
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>

      <Addcart open={isOpen} close={() => setIsOpen(false)} />
    </div>
  );
}
