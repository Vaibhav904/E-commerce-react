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
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import {
  BsTruck,
  BsArrowRepeat,
  BsChatDots,
  BsCreditCard2Front,
} from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BestSellerData from "../component/BestSeller";

export default function Home() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(50);
  const [subCategories, setSubCategories] = useState([]);

  // Products
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDoubleClick = () => {
    setValue(50);
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/category-wise-subcategory",
      );

      if (res.data.status) {
        const allSubCategories = res.data.categories.flatMap(
          (cat) => cat.subcategories,
        );
        setSubCategories(allSubCategories);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ CONDITIONAL RENDERING AFTER HOOKS
  useEffect(() => {
    fetchSubCategories();
  }, []);









 useEffect(() => {
    fetchSpecialProducts();
  }, []);

  const fetchSpecialProducts = async () => {
    try {
      const res = await axios.get(
        "http://tech-shop.techsaga.live/api/special-products"
      );

      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.error("Special products fetch error", error);
    }
  };












  const customer = [
    {
      name: "Alyssa A.",
      ratting: "Love this product",
      details:
        "This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where",
      img: "https://fashion.minimog.co/cdn/shop/files/img-test-timonial-01.webp?v=1709127619",
      imgtwo:
        "https://fashion.minimog.co/cdn/shop/files/47871950.webp?v=1708670711&width=360",
      bottomtext: "Denim Jacket",
    },
    {
      name: "Alyssa A.",
      ratting: "Love this product",
      details:
        "This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where",
      img: "https://fashion.minimog.co/cdn/shop/files/img-test-timonial-01.webp?v=1709127619",
      imgtwo:
        "https://fashion.minimog.co/cdn/shop/files/47871950.webp?v=1708670711&width=360",
      bottomtext: "Denim Jacket",
    },
    {
      name: "Alyssa A.",
      ratting: "Love this product",
      details:
        "This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where",
      img: "https://fashion.minimog.co/cdn/shop/files/img-test-timonial-01.webp?v=1709127619",
      imgtwo:
        "https://fashion.minimog.co/cdn/shop/files/47871950.webp?v=1708670711&width=360",
      bottomtext: "Denim Jacket",
    },
    {
      name: "Alyssa A.",
      ratting: "Love this product",
      details:
        "This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where",
      img: "https://fashion.minimog.co/cdn/shop/files/img-test-timonial-01.webp?v=1709127619",
      imgtwo:
        "https://fashion.minimog.co/cdn/shop/files/47871950.webp?v=1708670711&width=360",
      bottomtext: "Denim Jacket",
    },
    {
      name: "Alyssa A.",
      ratting: "Love this product",
      details:
        "This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where",
      img: "https://fashion.minimog.co/cdn/shop/files/img-test-timonial-01.webp?v=1709127619",
      imgtwo:
        "https://fashion.minimog.co/cdn/shop/files/47871950.webp?v=1708670711&width=360",
      bottomtext: "Denim Jacket",
    },
  ];
  const faqData = [
    {
      question: "What is React?",
      answer:
        "This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where the armhole seams curve towards the neckline so that the sleeve seamlessly hugs your shoulder",
      img: "https://fashion.minimog.co/cdn/shop/files/collap-tab-min.jpg?v=1709267338&width=940",
    },
    {
      question: "What is JSX?",
      answer:
        "JThis snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where the armhole seams curve towards the neckline so that the sleeve seamlessly hugs your shoulder",
      img: "https://fashion.minimog.co/cdn/shop/files/collection-tab-1.webp?v=1708672225&width=940",
    },
    {
      question: "What is a component?",
      answer:
        "This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where the armhole seams curve towards the neckline so that the sleeve seamlessly hugs your shoulder",
      img: "https://fashion.minimog.co/cdn/shop/files/collap-tab-min.jpg?v=1709267338&width=940",
    },
    {
      question: "What is state?",
      answer:
        "This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where the armhole seams curve towards the neckline so that the sleeve seamlessly hugs your shoulder",
      img: "https://fashion.minimog.co/cdn/shop/files/collection-tab-1.webp?v=1708672225&width=940",
    },
  ];

  const carddetails = [
    {
      img: "https://fashion.minimog.co/cdn/shop/files/collection-list-10.webp?v=1708672954&width=533",
      product: "Summer Bag",
      items: "32 Items",
      slug: "summer-bag",
    },
    {
      img: "https://fashion.minimog.co/cdn/shop/files/collection-list-9.webp?v=1708672955&width=533",
      product: "Summer Coat",
      items: "32 Items",
      slug: "summer-coat",
    },
    {
      img: "https://fashion.minimog.co/cdn/shop/files/collection-shirt-long.webp?v=1709121151&width=533",
      product: "Summer Pant",
      items: "32 Items",
      slug: "summer-pant",
    },
    {
      img: "https://fashion.minimog.co/cdn/shop/files/collection-list-9.webp?v=1708672955&width=533",
      product: "Summer tshirt",
      items: "32 Items",
      slug: "summer-tshit",
    },
    {
      img: "https://fashion.minimog.co/cdn/shop/files/collection-list-11.webp?v=1708672955&width=533",
      product: "Caps",
      items: "32 Items",
      slug: "cpas",
    },
    {
      img: "https://fashion.minimog.co/cdn/shop/files/collection-list-9.webp?v=1708672955&width=533",
      product: "Summer Cricket",
      items: "32 Items",
      slug: "summer-cricket",
    },
    {
      img: "https://fashion.minimog.co/cdn/shop/files/collection-list-10.webp?v=1708672954&width=533",
      product: "Summer short",
      items: "32 Items",
      slug: "summer-short",
    },
  ];

  // const threecard = [
  //   {
  //     image:
  //       "https://fashion.minimog.co/cdn/shop/files/lookbook-3_bc7bcae7-cb23-4629-a100-5952dd11fec5.webp?v=1708490894&width=1500",
  //     btext: "Beautifully Functional. Purposefully Designed.",
  //   },
  //   {
  //     image:
  //       "https://fashion.minimog.co/cdn/shop/files/lookbook-2.webp?v=1708490777&width=1500",
  //     btext: "Beautifully Functional. Purposefully Designed.",
  //   },
  //   {
  //     image:
  //       "https://fashion.minimog.co/cdn/shop/files/lookbook-4.webp?v=1708490777&width=1500",
  //     btext: "Beautifully Functional. Purposefully Designed.",
  //   },
  // ];

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
    axios
      .get("http://tech-shop.techsaga.live/api/category")
      .then((res) => {
        if (res.data.status) {
          setCategories(res.data.categories); // API categories set
        }
      })
      .catch((err) => console.log("Category API Error", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === faqData.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://tech-shop.techsaga.live/api/banner");
      if (res.data.status) {
        setBanners(res.data.data);
      }
    } catch (error) {
      console.error("Banner fetch error", error);
    }
  };

  if (!slides.length) return null;

  return (
    <div className="headerbt relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="mySwiper banner-slider h-full"
      >
        {banners.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="relative h-[500px]">
                {/* Image */}
                <img
                  src={slide.image_url}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Animated Content */}
                <motion.div
                  initial={false} // 🔥 MOST IMPORTANT
                  animate={isActive ? "show" : "hide"}
                  variants={{
                    show: { opacity: 1 },
                    hide: { opacity: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col justify-center px-6 text-white manage-posi"
                >


      <motion.p
                    variants={{
                      show: { opacity: 1, y: 0 },
                      hide: { opacity: 0, y: -30 },
                    }}
                    transition={{ duration: 0.8 }}
                    className="new-arrivaltext"
                  >
                    
                          New Arrivals
                  </motion.p>

                  <motion.h2
                    variants={{
                      show: { opacity: 1, y: 0 },
                      hide: { opacity: 0, y: -30 },
                    }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl sidetext-main font-bold"
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.a
                    href={slide.url}
                    className="cta-button inline-block mt-4"
                    variants={{
                      show: { opacity: 1, scale: 1 },
                      hide: { opacity: 0, scale: 0.8 },
                    }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Shop Now
                  </motion.a>
                </motion.div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container-fluid px-5">
        <h2 className="shop-category mt-8">Shop by Categories</h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {/* 🔹 CHANGE 3: static carddetails → API categories */}
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <div className="p-3 bg-gray-200 text-center">
                {/* 🔹 CHANGE 4: slug navigation */}
                <div
                  className="cards-fourslide"
                  onClick={() => navigate(`/categorie/${cat.slug}`)}
                  style={{ cursor: "pointer" }}
                >
                  {/* 🔹 CHANGE 5: image from API */}
                  <img src={cat.category_image} alt={cat.category_name} />

                  <div className="categoury-shop">
                    <div>
                      {/* 🔹 CHANGE 6: category name */}
                      <h3>{cat.category_name}</h3>

                      {/* 🔹 CHANGE 7: product count */}
                      <p>{cat.total_products} Items</p>
                    </div>

                    <div className="right-arro">
                      <FaArrowRightLong />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <section>
        <BestSellerData />
      </section>

      <div className="container-full">
        <div className="new-collection">
          <img
            src="https://fashion.minimog.co/cdn/shop/files/image-card1_26dbdee9-e640-45db-835b-00d8c15522cc.webp?v=1709206752&width=1066"
            alt=""
          />
        </div>
        <div className="m-media-full">
          <img
            src="https://fashion.minimog.co/cdn/shop/files/image-card2_f97f109b-bb54-42ae-80b9-c79513af1b1e.webp?v=1709206816&width=2000"
            alt=""
          />

          <div className="sub-headingtext">
            <h4>New Collection</h4>
            <p>
              The ReLeather Beige <br /> Tennis Shoe
            </p>
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
      {products.map((item) => (
        <div key={item.id} className="col-md-4">
          <div className="cardthree-img">
            <div className="firstcard-img">
              <img src={item.image_url} alt={item.title} />

              <a href={item.url} target="_blank" rel="noreferrer">
                <button>
                  <BsCart /> <span>Shop this Look</span>
                </button>
              </a>
            </div>

            <h4>{item.title}</h4>
          </div>
        </div>
      ))}
    </div>
        <div className="marquee-container">
          <div className="marquee new-seasson">
            <span>
              <img
                src="https://fashion.minimog.co/cdn/shop/files/scrolling-image-1.webp?v=1708484972"
                alt=""
              />
            </span>
            <span> New Season Essential</span>
            <span>
              <img
                src="https://fashion.minimog.co/cdn/shop/files/scrolling-image-2.webp?v=1708484972"
                alt=""
              />
            </span>
            <span> New Season Essential</span>
            <span>
              <img
                src="https://fashion.minimog.co/cdn/shop/files/scrolling-image-3.webp?v=1708484972"
                alt=""
              />
            </span>
            <span> New Season Essential</span>
            <span>
              <img
                src="https://fashion.minimog.co/cdn/shop/files/scrolling-image-1.webp?v=1708484972"
                alt=""
              />
            </span>
            <span> New Season Essential</span>
            <span>
              <img
                src="https://fashion.minimog.co/cdn/shop/files/scrolling-image-2.webp?v=1708484972"
                alt=""
              />
            </span>
            <span> New Season Essential</span>
            <span>
              <img
                src="https://fashion.minimog.co/cdn/shop/files/scrolling-image-3.webp?v=1708484972"
                alt=""
              />
            </span>
            <span> New Season Essential</span>
          </div>
        </div>
        <div className="faq-container">
          {/* FAQ List */}
          <div className="faq-list">
            <h6>Hot This Week</h6>
            <h4>
              Beautifully functional <br />
              consciously crafted
            </h4>
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h3>{faq.question} </h3>{" "}
                  <div className="right-arro">
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
              <img
                src="https://fashion.minimog.co/cdn/shop/files/logo-1.webp?v=1708485695"
                alt=""
              />
            </div>
            <div className="brand-feature">
              <img
                src="https://fashion.minimog.co/cdn/shop/files/logo-2.webp?v=1708485695"
                alt=""
              />
            </div>
            <div className="brand-feature">
              <img
                src="https://fashion.minimog.co/cdn/shop/files/logo-3.webp?v=1708485695"
                alt=""
              />
            </div>
            <div className="brand-feature">
              <img
                src="https://fashion.minimog.co/cdn/shop/files/logo-4.webp?v=1708485695"
                alt=""
              />
            </div>
            <div className="brand-feature">
              <img
                src="https://fashion.minimog.co/cdn/shop/files/logo-5.webp?v=1708485695"
                alt=""
              />
            </div>
            <div className="brand-feature">
              <img
                src="https://fashion.minimog.co/cdn/shop/files/logo-6.webp?v=1708485695"
                alt=""
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="edition-sec">
          <h3>The Coastal Edition</h3>
          <h6>
            Our new cozy collection is made with environmentally friendly
            materials and <br />
            simple to care for so you can stay cozy wherever.
          </h6>
          <div class="shop-all">
            <button>Shop Now</button>
          </div>
          <div className="edition-product">
            <img
              src="https://fashion.minimog.co/cdn/shop/files/lookbook-1-min_42fd8f57-f056-4b9b-8d30-613a9bcab508.jpg?v=1709538652&width=1500"
              alt=""
            />
            <img
              src="https://fashion.minimog.co/cdn/shop/files/lookbook-2-min_4706a63c-4510-4b71-bf8a-d00ee9f7a0e8.jpg?v=1709538693&width=1500"
              alt=""
            />
            <div className="pointer-productfirst">
              <div className="dot"></div>
              <div className="dot-product">
                <img
                  src="https://fashion.minimog.co/cdn/shop/files/47871708_1cf30332-eb43-4e26-9863-acab9cf50e07.webp?v=1709201160&width=360"
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-productsecond">
              <div className="dottwo"></div>
              <div className="dot-producttwo">
                <img
                  src="https://fashion.minimog.co/cdn/shop/files/47871708_1cf30332-eb43-4e26-9863-acab9cf50e07.webp?v=1709201160&width=360"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="edition-living">
          <h3>
            Living out every single day and <br />
            be brave to show off your own true colors
          </h3>
          <h6>
            Our new cozy collection is made with environmentally friendly
            materials and <br />
            simple to care for so you can stay cozy wherever.
          </h6>
          <div class="shop-all">
            <button>Shop Now</button>
          </div>
        </div>
        <div className="top-products">
          {subCategories.map((item) => (
            <div  onClick={() => navigate(`/categorie/${item.slug}`)}
                  style={{ cursor: "pointer" }}  className="shirts" key={item.id}>
              <img src={item.subcategory_image} alt={item.subcategory_name} />
              <h4>{item.subcategory_name}</h4>
            </div>
          ))}
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
                <h3>
                  Layer up with <br />
                  pieces designed
                </h3>
                <h6>
                  Our new cozy collection is made with environmentally friendly
                  materials and <br />
                  simple to care for so you can stay cozy wherever.
                </h6>
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
            {customer.map((custom, index) => (
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
                    <img src={custom.imgtwo} alt="" />{" "}
                    <h6>{custom.bottomtext}</h6>
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
const styles = {
  title: {
    textAlign: "center",
    color: "#2c3e50",
    fontWeight: "700",
    marginBottom: "10px",
    fontSize: "2rem",
  },
  subtitle: {
    textAlign: "center",
    color: "#6c757d",
    marginBottom: "30px",
    fontSize: "1rem",
  },
  dropdownWrapper: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "25px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },
  dropdownContainer: {
    position: "relative",
    maxWidth: "350px",
  },
  dropdownButton: {
    width: "100%",
    borderRadius: "6px",
    border: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  buttonIcon: {
    fontSize: "1.2rem",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "white",
    borderRadius: "6px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    marginTop: "5px",
    zIndex: 100,
    overflow: "hidden",
  },
  dropdownItem: {
    padding: "12px 15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "24px",
    borderBottom: "1px solid #f1f1f1",
  },
};
