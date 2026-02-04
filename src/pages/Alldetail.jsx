import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Drift from "drift-zoom";
import Addcart from "./Addcart";
import { AuthContext } from "../Context/AuthContext";
import { getProductById } from "../utils/requests";
import axios from "axios";

import { addToCart, setCartFromApi } from "../Redux/CartSlice";
import { setBuyNowProduct } from "../Redux/buyNowSlice";
import { useDispatch } from "react-redux";

export default function Alldetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  /* ================= FETCH PRODUCT ================= */
  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      setProduct(res.product);
    } catch (err) {
      console.error("Product fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  /* ================= IMAGE SLIDER ================= */
  const images = product?.images?.length
    ? product.images
    : [product?.thumbnail];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  /* ================= BUY NOW ================= */
  const handleBuyNow = () => {
    dispatch(
      setBuyNowProduct({
        id: product.id,
        name: product.title,
        price: Number(product.Salesprice),
        quantity: quantity,
        image: product.images?.[0] || product.thumbnail || "",
      })
    );

    navigate("/checkout");
  };

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (!images?.length) return;
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
  }, [currentImageIndex]);

  if (!product) return <div className="text-center py-5">Loading...</div>;

  /* ================= CART ================= */
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
        }
      );
      dispatch(setCartFromApi(res.data.cart));
    } catch (error) {
      console.log("Fetch cart error", error);
    }
  };

  const handleAddToCart = async () => {
    setIsOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      if (token) {
        await axios.post(
          "http://tech-shop.techsaga.live/api/cart/add",
          {
            product_id: product.id,
            quantity: quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        await fetchCart();
      } else {
        dispatch(
          addToCart({
            product_id: product.id,
            title: product.title,
            price: product.price,
            image: product.images?.[0],
            quantity: quantity,
          })
        );
      }
    } catch (error) {
      console.log("Add to cart failed", error);
    }
  };

  return (
    <div className="container my-4">
      <div className="row gx-5">
        {/* LEFT */}
        <div className="col-md-6 position-relative">
          <div className="main-image-container">
            <button className="nav-arrow nav-arrow-left" onClick={handlePrevImage}>
              &#10094;
            </button>

            <img
              className="drift-demo-trigger"
              src={images[currentImageIndex]}
              data-zoom={images[currentImageIndex]}
              alt={product.title}
            />

            <button className="nav-arrow nav-arrow-right" onClick={handleNextImage}>
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
            ₹{product.Salesprice}
            <span className="original-price ms-2">₹{product.price}</span>
            <span className="discount-badge ms-2">
              {product.discountPercentage}% OFF
            </span>
          </div>

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
        </div>
      </div>

      <Addcart open={isOpen} close={() => setIsOpen(false)} />
    </div>
  );
}
