import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsCart } from "react-icons/bs";
import { BsTruck, BsArrowRepeat, BsChatDots, BsCreditCard2Front } from "react-icons/bs";
import { img } from "framer-motion/client";
import { useNavigate } from "react-router-dom";


export default function Home() { 
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [value, setValue] = useState(50);
    const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDoubleClick = () => {
    setValue(50);
  };
  const customer = [
    {
      name:"Alyssa A.",
      ratting:"Love this product",
      details:"This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where",
      img:"https://fashion.minimog.co/cdn/shop/files/img-test-timonial-01.webp?v=1709127619",
      imgtwo:"https://fashion.minimog.co/cdn/shop/files/47871950.webp?v=1708670711&width=360",
      bottomtext:"Denim Jacket",
    },
       {
      name:"Alyssa A.",
      ratting:"Love this product",
      details:"This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where",
      img:"https://fashion.minimog.co/cdn/shop/files/img-test-timonial-01.webp?v=1709127619",
      imgtwo:"https://fashion.minimog.co/cdn/shop/files/47871950.webp?v=1708670711&width=360",
      bottomtext:"Denim Jacket",
    },
       {
      name:"Alyssa A.",
      ratting:"Love this product",
      details:"This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where",
      img:"https://fashion.minimog.co/cdn/shop/files/img-test-timonial-01.webp?v=1709127619",
      imgtwo:"https://fashion.minimog.co/cdn/shop/files/47871950.webp?v=1708670711&width=360",
      bottomtext:"Denim Jacket",
    },
       {
      name:"Alyssa A.",
      ratting:"Love this product",
      details:"This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where",
      img:"https://fashion.minimog.co/cdn/shop/files/img-test-timonial-01.webp?v=1709127619",
      imgtwo:"https://fashion.minimog.co/cdn/shop/files/47871950.webp?v=1708670711&width=360",
      bottomtext:"Denim Jacket"
    },
       {
      name:"Alyssa A.",
      ratting:"Love this product",
      details:"This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where",
      img:"https://fashion.minimog.co/cdn/shop/files/img-test-timonial-01.webp?v=1709127619",
      imgtwo:"https://fashion.minimog.co/cdn/shop/files/47871950.webp?v=1708670711&width=360",
      bottomtext:"Denim Jacket",
    }, 
  ]
  const faqData = [
  {
    question: "What is React?",
    answer: "This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where the armhole seams curve towards the neckline so that the sleeve seamlessly hugs your shoulder",
    img: "https://fashion.minimog.co/cdn/shop/files/collap-tab-min.jpg?v=1709267338&width=940"
  },
  {
    question: "What is JSX?",
    answer: "JThis snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where the armhole seams curve towards the neckline so that the sleeve seamlessly hugs your shoulder",
    img: "https://fashion.minimog.co/cdn/shop/files/collection-tab-1.webp?v=1708672225&width=940"
  },
  {
    question: "What is a component?",
    answer: "This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where the armhole seams curve towards the neckline so that the sleeve seamlessly hugs your shoulder",
    img: "https://fashion.minimog.co/cdn/shop/files/collap-tab-min.jpg?v=1709267338&width=940"
  },
  {
    question: "What is state?",
    answer: "This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where the armhole seams curve towards the neckline so that the sleeve seamlessly hugs your shoulder",
    img: "https://fashion.minimog.co/cdn/shop/files/collection-tab-1.webp?v=1708672225&width=940"
  }
];
  const carddetails=[
    {
      img:"https://fashion.minimog.co/cdn/shop/files/collection-list-10.webp?v=1708672954&width=533",
      product:"Summer Bag",
      items:"32 Items",
      slug:"summer-bag",
    },
           {
      img:"https://fashion.minimog.co/cdn/shop/files/collection-list-9.webp?v=1708672955&width=533",
      product:"Summer Coat",
      items:"32 Items",
      slug:"summer-coat",
    },
       {
      img:"https://fashion.minimog.co/cdn/shop/files/collection-shirt-long.webp?v=1709121151&width=533",
      product:"Summer Pant",
      items:"32 Items",
      slug:"summer-pant",
    },
       {
      img:"https://fashion.minimog.co/cdn/shop/files/collection-list-9.webp?v=1708672955&width=533",
      product:"Summer tshirt",
      items:"32 Items",
      slug:"summer-tshit"
    },
       {
      img:"https://fashion.minimog.co/cdn/shop/files/collection-list-11.webp?v=1708672955&width=533",
      product:"Caps",
      items:"32 Items",
      slug:"cpas"
    },
       {
      img:"https://fashion.minimog.co/cdn/shop/files/collection-list-9.webp?v=1708672955&width=533",
      product:"Summer Cricket",
      items:"32 Items",
      slug:"summer-cricket"
    },
       {
      img:"https://fashion.minimog.co/cdn/shop/files/collection-list-10.webp?v=1708672954&width=533", 
      product:"Summer short",
      items:"32 Items",
      slug:"summer-short",
    },
    
  ]
  const bestseller =[
    {img:"https://fashion.minimog.co/cdn/shop/products/22.1b.jpg?v=1708672024&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
     {img:"https://fashion.minimog.co/cdn/shop/products/2.1b.jpg?v=1708671658&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/7.1b.jpg?v=1708671676&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/14.1b_7dfad9d2-b8fd-49aa-9e87-8c2afc776a68.jpg?v=1709119519&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/6.1b.jpg?v=1708671720&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/9.1a.jpg?v=1708671749&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
     {img:"https://fashion.minimog.co/cdn/shop/products/11.1a.jpg?v=1708671758&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/4.1b.jpg?v=1708671778&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/13.1a.jpg?v=1708671787&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
       {img:"https://fashion.minimog.co/cdn/shop/products/18.1a-1.jpg?v=1708671807&width=360",
      profirst:"Strappy crop top",
      amount:"$6.00",
    },
    

  ]
  const threecard =[
    {
      image:"https://fashion.minimog.co/cdn/shop/files/lookbook-3_bc7bcae7-cb23-4629-a100-5952dd11fec5.webp?v=1708490894&width=1500",
      btext:"Beautifully Functional. Purposefully Designed."
    },
     {
      image:"https://fashion.minimog.co/cdn/shop/files/lookbook-2.webp?v=1708490777&width=1500",
      btext:"Beautifully Functional. Purposefully Designed."
    },
     {
      image:"https://fashion.minimog.co/cdn/shop/files/lookbook-4.webp?v=1708490777&width=1500",
      btext:"Beautifully Functional. Purposefully Designed."
    },
  ]

  const slides = [
    {
      img: "https://fashion.minimog.co/cdn/shop/files/slideshow-3.webp?v=1708484484&width=2000",
      title: "New Collection",
      desc: "Discover the latest  fashion trends",
      btn: "Shop Now",
    },
    {
      img: "https://fashion.minimog.co/cdn/shop/files/slideshow-1.webp?v=1708484484&width=2000",
      title: "Summer Sale",
      desc: "Up to 50% off on selected items",
      btn: "Explore",
    },
  ];
  
 useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === faqData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="headerbt relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay:8000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="mySwiper h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="slider-img relative h-[500px]">
            {/* Background Image */}
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Dark overlay on image */}
            <div className="inset-0 bg-black/40"></div>

            {/* Centered Text + Button */}
            <div className=" manage-posi inset-0  flex-col px-6">
              <AnimatePresence mode="sync">
              {/* {activeIndex === i && ( */}
                <>
                  <motion.h2
                   
                    className="text-4xl font-bold"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.p
                   
                    className="mb-6 text-lg sidetext-main"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    {slide.desc}
                  </motion.p>

                  <motion.button
                   
                    className="cta-button"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  >
                    {slide.btn}
                  </motion.button>
                </>
              {/* )} */}
              </AnimatePresence>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container-fluid px-5">
         <h2 className="shop-category mt-8">Shop by Categories</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{ delay: 2500 }}
          modules={[Autoplay, Pagination]}
      >
        {carddetails.map((details,index)=>(
           <SwiperSlide key={index}><div className="p-3 bg-gray-200 text-center">
          <div onClick={()=> navigate(`categorie/${details.slug}`)}  className="cards-fourslide" >
            <img src= {details.img} alt="" />
            <div className="categoury-shop">
              <div>
                 <h3>{details.product}</h3>
               <p>{details.items}</p>
              </div>
              <div className="right-arro">
                <a href="">
                  <FaArrowRightLong />
                </a>
              </div>
             
            </div>
          </div>
          </div></SwiperSlide>
        ))}
      
      </Swiper>
      </div>
      <section>
        <h4 className="best-seller">You are in best sellers</h4>
        <div className="container-fluid px-5">
          <div className="ten-card gy-4">
            {bestseller.map((seller,index)=>(
               <div className="best-sellercard" key={index}>
                <div className="seller-card">
                  <img src={seller.img} alt="" />
                  <h4>{seller.profirst}</h4>
                  <p>{seller.amount}</p>
                  <div className="btn-selectwish">
                  <div className="whislist-icon">
                   <button><CiHeart /></button>
                   <button><FaEye /></button>
                  </div>
                  <div className="select-option">
                    <button>Select options</button>
                  </div>
                   </div>
                </div>
            </div>
            ))}
           
          </div>
          <div className="shop-all">
            <button>Shop All Product</button>
          </div>
        </div>
      </section>
      <div className="container-full">
        <div className="new-collection">
          <img src="https://fashion.minimog.co/cdn/shop/files/image-card1_26dbdee9-e640-45db-835b-00d8c15522cc.webp?v=1709206752&width=1066" alt="" />
        </div>
        <div className="m-media-full">
          <img src="https://fashion.minimog.co/cdn/shop/files/image-card2_f97f109b-bb54-42ae-80b9-c79513af1b1e.webp?v=1709206816&width=2000" alt="" />
          
            <div className="sub-headingtext">
              <h4>New Collection</h4>
              <p>The ReLeather Beige <br />  Tennis Shoe</p>
            </div>
            <div className="new-collection-arrow">
              <h4>Shop New Collection</h4> 
              <FaArrowRight />
            </div>
           
        </div>
      </div>
      <div className="container-fluid">
        <h4 className="best-seller">Check out mix & match</h4>
        <div className="row">
          {threecard.map((tcard,index)=>(
            <div key={index} className="col-md-4">
              <div className="cardthree-img">
                <div className="firstcard-img">
                  <img src={tcard.image} alt="" />
                  <button><BsCart /> <span> Shop this Look</span></button>
                </div>
                <h4>{tcard.btext}</h4>
              </div>
            </div>
          ))}
        </div>
           <div className="marquee-container">
      <div className="marquee new-seasson">
        <span><img src="https://fashion.minimog.co/cdn/shop/files/scrolling-image-1.webp?v=1708484972" alt="" /></span>
         <span> New Season Essential</span>
         <span><img src="https://fashion.minimog.co/cdn/shop/files/scrolling-image-2.webp?v=1708484972" alt="" /></span>
         <span> New Season Essential</span>
         <span><img src="https://fashion.minimog.co/cdn/shop/files/scrolling-image-3.webp?v=1708484972" alt="" /></span>
         <span> New Season Essential</span>
          <span><img src="https://fashion.minimog.co/cdn/shop/files/scrolling-image-1.webp?v=1708484972" alt="" /></span>
         <span> New Season Essential</span>
         <span><img src="https://fashion.minimog.co/cdn/shop/files/scrolling-image-2.webp?v=1708484972" alt="" /></span>
         <span> New Season Essential</span>
         <span><img src="https://fashion.minimog.co/cdn/shop/files/scrolling-image-3.webp?v=1708484972" alt="" /></span>
         <span> New Season Essential</span>
      </div>
    </div>
     <div className="faq-container">
      {/* FAQ List */}
      <div className="faq-list">
        <h6>Hot This Week</h6>
        <h4>Beautifully functional <br />
consciously crafted</h4>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="d-flex justify-content-between align-items-center">

           
            <h3>{faq.question} </h3>  <div className="right-arro">
                <a href="">
                  <FaArrowRightLong />
                </a>
              </div>
               </div>
            {index === activeIndex && <p>{faq.answer}</p>}
          </div>
        ))}
      </div>

      {/* Side Image */}
      <div className="faq-image">
        <img src={faqData[activeIndex].img} alt="faq related" />
      </div>
    </div>
    <div className="featured-sec">
      <h4>Featured in Press</h4>
      <div className="brand-all pb-4">
        <div className="brand-feature">
          <img src="https://fashion.minimog.co/cdn/shop/files/logo-1.webp?v=1708485695" alt="" />
        </div>
         <div className="brand-feature">
          <img src="https://fashion.minimog.co/cdn/shop/files/logo-2.webp?v=1708485695" alt="" />
        </div>
         <div className="brand-feature">
          <img src="https://fashion.minimog.co/cdn/shop/files/logo-3.webp?v=1708485695" alt="" />
        </div>
         <div className="brand-feature">
          <img src="https://fashion.minimog.co/cdn/shop/files/logo-4.webp?v=1708485695" alt="" />
        </div>
         <div className="brand-feature">
          <img src="https://fashion.minimog.co/cdn/shop/files/logo-5.webp?v=1708485695" alt="" />
        </div>
         <div className="brand-feature">
          <img src="https://fashion.minimog.co/cdn/shop/files/logo-6.webp?v=1708485695" alt="" />
        </div>
      </div>
    </div>
    <hr />
    <div className="edition-sec">
      <h3>The Coastal Edition</h3>
      <h6>Our new cozy collection is made with environmentally friendly materials and <br />
simple to care for so you can stay cozy wherever.</h6>
<div class="shop-all">
  <button>Shop Now</button>
  </div>
  <div className="edition-product">
    <img src="https://fashion.minimog.co/cdn/shop/files/lookbook-1-min_42fd8f57-f056-4b9b-8d30-613a9bcab508.jpg?v=1709538652&width=1500" alt="" />
    <img src="https://fashion.minimog.co/cdn/shop/files/lookbook-2-min_4706a63c-4510-4b71-bf8a-d00ee9f7a0e8.jpg?v=1709538693&width=1500" alt="" />
  <div className="pointer-productfirst">
    <div className="dot"></div>
    <div className="dot-product">
      <img src="https://fashion.minimog.co/cdn/shop/files/47871708_1cf30332-eb43-4e26-9863-acab9cf50e07.webp?v=1709201160&width=360" alt="" />
    </div>
  </div>
    <div className="pointer-productsecond">
    <div className="dottwo"></div>
    <div className="dot-producttwo">
      <img src="https://fashion.minimog.co/cdn/shop/files/47871708_1cf30332-eb43-4e26-9863-acab9cf50e07.webp?v=1709201160&width=360" alt="" />
    </div>
  </div>
  
  </div>
    </div>
        <div className="edition-living">
      <h3>Living out every single day and <br />
         be brave to show off your own true colors</h3>
      <h6>Our new cozy collection is made with environmentally friendly materials and <br />
simple to care for so you can stay cozy wherever.</h6>
<div class="shop-all">
  <button>Shop Now</button>
  </div>
   </div>
   <div className="top-products">
    <div className="shirts">
      <img src="https://fashion.minimog.co/cdn/shop/files/collection-list-1.webp?v=1708672623&width=360" alt="" />
      <h4>Top <span>11</span></h4>
    </div>
     <div className="shirts">
      <img src="https://fashion.minimog.co/cdn/shop/files/collection-list-2.webp?v=1708672623&width=360" alt="" />
      <h4>Top <span>11</span></h4>
    </div>
     <div className="shirts">
      <img src="https://fashion.minimog.co/cdn/shop/files/collection-list-3.webp?v=1708672623&width=360" alt="" />
      <h4>Top <span>11</span></h4>
    </div>
     <div className="shirts">
      <img src="https://fashion.minimog.co/cdn/shop/files/collection-list-4.webp?v=1708672623&width=360" alt="" />
      <h4>Top <span>11</span></h4>
    </div>
     <div className="shirts">
      <img src="https://fashion.minimog.co/cdn/shop/files/collection-list-5.webp?v=1708672623&width=360" alt="" />
      <h4>Top <span>11</span></h4>
    </div>
   </div>
<div className="container padding-gallery">
  <div className="row">
  <div className="col-md-6">
   <div id="container" aria-label="Before and after image slider">
      <div className="img-wrapper">
        <img
          src="https://raw.githubusercontent.com/ThomasEgMatthiesen/ThomasEgMatthiesen/refs/heads/main/hosted-assets/before.png"
          alt="Before"
        />
      </div>
      <div
        className="img-wrapper"
        style={{ clipPath: `inset(0px 0px 0px ${value}%)` }}
      >
        <img
          src="https://raw.githubusercontent.com/ThomasEgMatthiesen/ThomasEgMatthiesen/refs/heads/main/hosted-assets/after.png"
          alt="After"
        />
      </div>

      <div id="line" style={{ left: `${value}%` }}></div>

      <input
        id="slider"
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        onDoubleClick={handleDoubleClick}
      />
    </div>
  </div>
  <div className="col-md-6">
        <div className="edition-sec py-4">
      <h3>Layer up with <br />
pieces designed</h3>
      <h6>Our new cozy collection is made with environmentally friendly materials and <br />
simple to care for so you can stay cozy wherever.</h6>
<div class="shop-all">
  <button>Shop Now</button>
  </div>
   </div>
  </div>
</div>
</div>

      </div>
         <section className="happy-cus">
      <div className="container-fluid p-5">
        <h4 className="happy-text">Happy Customers</h4>
             <Swiper
        spaceBetween={20}
        slidesPerView={2.5}
        autoplay={{ delay: 2500 }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
      >
        {customer.map((custom,index)=>(
            <SwiperSlide key={index}>
              <div className="google-border">
           
              <div className="google">
                <div className="review-text">
                  <h6>{custom.name}</h6>
                  <h4>{custom.ratting}</h4>
                  <p>{custom.details}</p>
                </div>
                <div className="review-img">
                  <img src={custom.img} alt="" />
                </div>
              </div>
               <div className="product-name">
                  <img src={custom.imgtwo} alt="" />  <h6>{custom.bottomtext}</h6>
                </div>
              
              </div>
           </SwiperSlide>
        ))}
      </Swiper>
      </div>
       </section>
       <section className="instagram-section container-fluid">
        <h2>Follow us Instagram</h2>
        <p>
          Tag @minimog in your Instagram photos for a chance to be featured
          here.
          <br />
          Find more inspiration on{" "}
          <a href="#" target="_blank" rel="noopener noreferrer">
            our Instagram.
          </a>
        </p>

        <div className="d-flex">
          {[
            {
              src: "https://fashion.minimog.co/cdn/shop/files/ins-main-1.jpg?v=1739162905&width=533",
              alt: "Black leather boots with thick sole and buckles",
            },
            {
              src: "https://fashion.minimog.co/cdn/shop/files/ins-main-4.jpg?v=1739162905&width=533",
              alt: "Young woman wearing white cropped t-shirt",
            },
            {
              src: "https://fashion.minimog.co/cdn/shop/files/ins-main-7.jpg?v=1739163056&width=533",
              alt: "Small black quilted leather handbag",
            },
            {
              src: "https://fashion.minimog.co/cdn/shop/files/ins-main-6.jpg?v=1739162905&width=533",
              alt: "Back view of woman wearing white sleeveless top",
            },
            {
              src: "https://fashion.minimog.co/cdn/shop/files/ins-main-3.jpg?v=1739162905&width=533",
              alt: "Woman wearing dark plaid blazer and shorts",
            },
          ].map((item, index) => (
            <div className="five-card" key={index}>
              <img src={item.src} alt={item.alt} className="instagram-img" />
            </div>
          ))}
        </div>
      </section>
        <section className="container py-5">
        <div className="row text-center gy-4">
          <div className="col-6 col-md-3">
            <div className="service-circle mx-auto mb-2">
              <BsTruck className="service-icon" />
            </div>
            <div className="service-text">Free Shipping</div>
            <div className="service-subtext">
              Free Shipping for orders over £130
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="service-circle mx-auto mb-2">
              <BsArrowRepeat className="service-icon" />
            </div>
            <div className="service-text">Money Guarantee</div>
            <div className="service-subtext">
              Within 30 days for an exchange.
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="service-circle mx-auto mb-2">
              <BsChatDots className="service-icon" />
            </div>
            <div className="service-text">Online Support</div>
            <div className="service-subtext">24 hours a day, 7 days a week</div>
          </div>

          <div className="col-6 col-md-3">
            <div className="service-circle mx-auto mb-2">
              <BsCreditCard2Front className="service-icon" />
            </div>
            <div className="service-text">Flexible Payment</div>
            <div className="service-subtext">
              Pay with Multiple Credit Cards
            </div>
          </div>
        </div>
      </section>
   

      
    </div>
  );
}
