import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import Addcart from './Addcart';
import Drift from "drift-zoom";
import { getProductById } from '../utils/requests';
export default function Alldetail() {
  // State for product data and UI interactions
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [countdown, setCountdown] = useState(246); // 4m 6s = 246 seconds
 const [isOpen, setIsOpen] = useState(false);
 const [prolist,setProlist]= useState([]);

 const showfetch = async ()=> {
  try{
     const data = await getProductById(id);
    setProlist(data);
  }
  catch(err){
    console.log("Api is not fetching",err.message);
  } 
 };
 
 useEffect(()=>{
  showfetch();
 },[]);


  // Quantity handlers
  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}m ${seconds}s`;
  };
  
  // Product data
  const product = {
    title: "Premium Cateye Sunglasses",
    subtitle: "Classic retro style with modern protection",
    price: 29.90,
    originalPrice: 49.90,
    discountPercent: 40,
    colors: ["Black", "Tortoise", "Red", "Blue"],
    features: [
      "100% UV Protection - Blocks harmful UVA/UVB rays",
      "Lightweight Design - Comfortable for all-day wear",
      "Scratch-Resistant Lenses - Durable polycarbonate material",
      "Includes Case & Cleaning Cloth - For protection and maintenance"
    ],
    reviews: [
      {
        rating: 5,
        text: '"These sunglasses are absolutely stunning! The quality is exceptional for the price."',
        author: "Sarah J.",
        date: "August 15, 2023"
      },
      {
        rating: 5,
        text: '"Perfect fit and very comfortable. I get compliments every time I wear them!"',
        author: "Michael T.",
        date: "July 28, 2023"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://fashion.minimog.co/cdn/shop/files/collection-shirt-long.webp?v=1709121151&width=533"
    ]
  };

  // Handlers for user interactions
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? prolist?.images?.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === prolist?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleQuantityChange = (value) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 99) {
      setQuantity(newValue);
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
  

  // const handleAddToCart = () => {
  //   alert(`Added ${quantity} ${selectedColor} sunglasses to cart.`);
  // };

  const handleShopPay = () => {
    alert("Redirecting to Shop Pay...");
  };

  // Auto-rotate images effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => 
        prev === prolist?.images?.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [prolist?.images?.length]);


    useEffect(() => {
    const triggerEl = document.querySelector(".drift-demo-trigger");
    const paneEl = document.querySelector(".zoom-pane");

    if (triggerEl && paneEl) {
      new Drift(triggerEl, {
        paneContainer: paneEl,
        inlinePane: 769,
        inlineOffsetY: -85,
        containInline: true,
        hoverBoundingBox: true,
      });
    }
  }, []);

  // Helper function to render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i 
        key={i} 
        className={`fas fa-star${i < rating ? '' : '-half-alt'}`}
      ></i>
    ));
  };

  return (
    <div>
      <div className="container my-4">
      <div className="row gx-5">
        {/* Left: Image gallery */}
        <div className="col-md-6 position-relative">
          <div className="main-image-container zoom-wrapper">
            <button 
              className="nav-arrow nav-arrow-left" 
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              &#10094;
            </button>
             <div className="thumbnail-container">
            <img  className='drift-demo-trigger'
              src={prolist?.images?.[currentImageIndex]} 
              data-zoom={prolist?.images?.[currentImageIndex]} 
              alt={prolist.title} 
              id="mainImage" 
            />
            </div>
            <button 
              className="nav-arrow nav-arrow-right" 
              onClick={handleNextImage}
              aria-label="Next image"
            >
              &#10095;
            </button>
            
          </div>
          <div className="zoom-pane details"></div>
          
          <div className="dot-indicators">
            {prolist?.images?.map((_, index) => (
              <div
                key={index}
                className={`dot-indicator ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              ></div>
            ))}
          </div>
          
          <div className="thumbnail-list">
            {prolist?.images?.map((image, index) => (
              <>
              <img
                key={index}
                src={image}
                alt={`${product.title} view ${index + 1}`}
                className={currentImageIndex === index ? 'selected' : ''}
                onClick={() => handleThumbnailClick(index)}
              />
              </>
            ))}
          </div>
          
          <div className="product-features">
            <h5>Product Features</h5>
            {product.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <i className="fas fa-sun feature-icon"></i>
                <div>{feature}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product details */}
        <div className="col-md-6">
          <h2 className="product-title">{prolist.title}</h2>
          <div className="product-subtitle">{prolist.category}</div>
          
          <div className="price">
            ${prolist?.price} 
            <span className="original-price">${parseInt(prolist?.price+50)}</span>  
            <span className="discount-badge">{prolist?.discountPercent}% OFF</span>
          </div>
          
          <div className="social-proof">
            <i className="fas fa-award"></i>
            <div>
              <strong>Bestseller:</strong> Over 2,500 pairs sold this month! 
              <div className="rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
                <span>(428 reviews)</span>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="color-label">Color: <span id="selectedColor" className="fw-normal">{selectedColor}</span></div>
            <div className="color-options">
              {product.colors.map(color => (
                <div
                  key={color}
                  className={`color-option color-${color.toLowerCase()} ${selectedColor === color ? 'selected' : ''}`}
                  title={color}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          <div className="quantity-label">Quantity</div>
          <div className="quantity-controls mb-3" style={{userSelect: 'none'}}>
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
              onClick={() => setIsOpen(true)}
            >
             
              <i className="fas fa-shopping-cart me-2"></i> Add to cart
            </button>
            <button 
              className="btn-shop-pay" 
              onClick={handleShopPay}
              aria-label="Buy with Shop Pay"
            >
              <span>Buy with </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="85" height="20" aria-labelledby="shop-pay-logo" viewBox="0 -2 341 81"><title id="shop-pay-logo">Shop Pay</title><path id="pay-square" fill="#fff" fill-rule="evenodd" d="M227.297 0c-6.849 0-12.401 5.472-12.401 12.223v55.59c0 6.75 5.552 12.222 12.401 12.222h101.06c6.849 0 12.401-5.472 12.401-12.222v-55.59c0-6.75-5.552-12.223-12.401-12.223h-101.06Zm17.702 55.892v-14.09h8.994c8.217 0 12.586-4.542 12.586-11.423s-4.369-11-12.586-11h-14.788v36.513h5.794Zm0-31.084h7.664c5.319 0 7.932 2.154 7.932 5.758 0 3.605-2.518 5.758-7.695 5.758h-7.901V24.808Zm31.796 31.833c4.417 0 7.314-1.92 8.644-5.197.38 3.652 2.613 5.524 7.457 4.26l.048-3.885c-1.948.187-2.328-.515-2.328-2.528v-9.55c0-5.617-3.752-8.94-10.686-8.94-6.84 0-10.782 3.37-10.782 9.08h5.32c0-2.714 1.947-4.353 5.367-4.353 3.609 0 5.272 1.545 5.224 4.214v1.217l-6.127.655c-6.887.749-10.686 3.324-10.686 7.818 0 3.698 2.659 7.209 8.549 7.209Zm1.187-4.213c-2.992 0-4.179-1.592-4.179-3.184 0-2.153 2.47-3.136 7.314-3.698l3.8-.421c-.238 4.12-3.04 7.303-6.935 7.303Zm32.555 5.29c-2.422 5.804-6.317 7.536-12.396 7.536h-2.613V60.48h2.803c3.324 0 4.939-1.03 6.697-3.979l-10.782-24.95h5.984l7.695 18.21 6.839-18.21h5.842l-10.069 26.167Z" clip-rule="evenodd"></path><path fill="#fff" d="M29.514 35.18c-7.934-1.697-11.469-2.36-11.469-5.374 0-2.834 2.392-4.246 7.176-4.246 4.207 0 7.283 1.813 9.546 5.363.171.274.524.369.812.222l8.927-4.447a.616.616 0 0 0 .256-.864c-3.705-6.332-10.55-9.798-19.562-9.798-11.843 0-19.2 5.752-19.2 14.898 0 9.714 8.96 12.169 16.904 13.865 7.944 1.697 11.49 2.36 11.49 5.373 0 3.014-2.584 4.436-7.742 4.436-4.763 0-8.297-2.15-10.433-6.321a.63.63 0 0 0-.843-.274L6.47 52.364a.623.623 0 0 0-.278.843c3.535 7.006 10.785 10.947 20.47 10.947 12.334 0 19.787-5.658 19.787-15.088s-9.001-12.169-16.935-13.865v-.021ZM77.353 16.036c-5.062 0-9.536 1.77-12.75 4.92-.203.19-.534.053-.534-.221V.622a.62.62 0 0 0-.63-.622h-11.17a.62.62 0 0 0-.63.622v62.426a.62.62 0 0 0 .63.621h11.17a.62.62 0 0 0 .63-.621V35.664c0-5.289 4.11-9.345 9.653-9.345 5.542 0 9.557 3.972 9.557 9.345v27.384a.62.62 0 0 0 .63.621h11.17a.62.62 0 0 0 .63-.621V35.664c0-11.505-7.646-19.618-18.356-19.618v-.01ZM118.389 14.255c-6.065 0-11.767 1.823-15.847 4.467a.618.618 0 0 0-.202.833l4.922 8.292c.182.295.566.4.865.22a19.82 19.82 0 0 1 10.262-2.78c9.749 0 16.914 6.785 16.914 15.75 0 7.64-5.734 13.297-13.006 13.297-5.926 0-10.037-3.403-10.037-8.207 0-2.75 1.185-5.005 4.271-6.596a.607.607 0 0 0 .246-.864l-4.645-7.754a.632.632 0 0 0-.759-.264c-6.225 2.276-10.593 7.755-10.593 15.109 0 11.126 8.981 19.428 21.507 19.428 14.629 0 25.147-9.998 25.147-24.338 0-15.372-12.237-26.603-29.066-26.603l.021.01ZM180.098 15.951c-5.649 0-10.689 2.055-14.373 5.68a.313.313 0 0 1-.534-.222v-4.362a.62.62 0 0 0-.63-.621H153.68a.62.62 0 0 0-.63.621v62.331a.62.62 0 0 0 .63.622h11.169a.62.62 0 0 0 .631-.622v-20.44c0-.274.331-.41.533-.231 3.674 3.371 8.532 5.342 14.096 5.342 13.102 0 23.321-10.463 23.321-24.054 0-13.592-10.23-24.054-23.321-24.054l-.011.01Zm-2.103 37.54c-7.454 0-13.103-5.847-13.103-13.58 0-7.734 5.638-13.582 13.103-13.582 7.464 0 13.091 5.753 13.091 13.581 0 7.829-5.553 13.581-13.102 13.581h.011Z"></path></svg>
            </button>
            <div className="text-center mt-2">
              <a href="#" style={{fontSize: '0.85rem', textDecoration: 'underline', color: '#111'}}>
                More payment options
              </a>
            </div>
          </div>

          <div className="info-row info-icons">
            <div className="info-item">
              <i className="fas fa-random"></i>Compare
            </div>
            <div className="info-item">
              <i className="far fa-question-circle"></i>Ask a question
            </div>
            <div className="info-item">
              <i className="fas fa-ruler-combined"></i>Size guide
            </div>
            <div className="info-item">
              <i className="fas fa-share-alt"></i>Share
            </div>
          </div>

          <div className="delivery-info">
            <i className="fas fa-truck"></i>
            <div>
              <strong>Estimated Delivery:</strong> <span className="ms-1">Sep 04 - Sep 08</span>
              <div className="form-text">Order in the next 5 hours for express shipping</div>
            </div>
          </div>
          
          <div className="returns-info">
            <i className="fas fa-undo-alt"></i>
            <div>
              <strong>Free Shipping & Returns:</strong> <span className="ms-1">On all orders over $75</span>
              <div className="form-text">30-day money-back guarantee</div>
            </div>
          </div>

          <div className="payment-info">
            <div className="payment-icons">
              <img src="https://fashion.minimog.co/cdn/shop/files/trust_965c85b7-ca37-4190-bea4-b7f926fd38d7.png?v=1709199170&width=533 " alt="Visa" />
             
            </div>
            <div style={{marginTop: '8px'}}>Guarantee safe & secure checkout</div>
          </div>
        </div>
      </div>
    </div>
    <Addcart open={isOpen} close={(e)=> setIsOpen(false)} />
     </div>
  );
}
