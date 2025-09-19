import React, { useState, useRef } from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


export default function About() {
    const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef(null);

  const journeyData = [
    { 
      year: "2015", 
      title: "Founded", 
      text: "StyleCart was founded with a vision to transform online shopping.",
      icon: "🚀"
    },
    { 
      year: "2016", 
      title: "First 10,000 Customers", 
      text: "Reached our first milestone of 10,000 happy customers.",
      icon: "🎯"
    },
    { 
      year: "2018", 
      title: "Mobile App Launch", 
      text: "Launched our award-winning mobile application.",
      icon: "📱"
    },
    { 
      year: "2020", 
      title: "Global Expansion", 
      text: "Expanded our services to over 50 countries worldwide.",
      icon: "🌎"
    },
    { 
      year: "2023", 
      title: "5 Million Customers", 
      text: "Celebrated serving over 5 million customers globally.",
      icon: "🏆"
    }
  ];

  const scrollToIndex = (index) => {
    setActiveIndex(index);
    if (timelineRef.current) {
      const items = timelineRef.current.children;
      if (items[index]) {
        items[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  return (
    <div className="headerbt">
       <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Our Story</h1>
          <p className="hero-subtitle">
            Discover the journey of StyleCart, from a small startup to a leading
            e-commerce destination for fashion enthusiasts worldwide.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="container">
        <div className="brand-story">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">How We Began</h2>
              <p>
                Founded in 2015, StyleCart began as a small startup with a big
                vision: to revolutionize the online shopping experience. What
                started as a humble operation in a garage has now grown into a
                trusted e-commerce platform serving millions of customers
                worldwide.
              </p>
              <p>
                Our founder, Sarah Johnson, noticed a gap in the market for a
                personalized, user-friendly shopping experience that didn't
                compromise on quality or selection. With this vision, she
                assembled a team of passionate individuals who shared her
                commitment to excellence.
              </p>
              <p>
                Today, we continue to innovate and expand our offerings while
                staying true to our core values of quality, customer
                satisfaction, and innovation.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Our Story"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
    <section className="journey-section">
      <div className="container">
        <h2 className="section-title">Our Journey</h2>
        <p className="section-subtitle">Milestones that shaped our story</p>
        
        <div className="horizontal-timeline">
          <div className="timeline-track">
            <div className="timeline-progress" style={{ width: `${(activeIndex / (journeyData.length - 1)) * 100}%` }}></div>
          </div>
          
          <div className="timeline-items" ref={timelineRef}>
            {journeyData.map((item, index) => (
              <div 
                key={index}
                className={`timeline-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => scrollToIndex(index)}
              >
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                  <div className="marker-line"></div>
                </div>
                <div className="timeline-card">
                  <div className="card-icon">{item.icon}</div>
                  <div className="card-content">
                    <span className="timeline-year">{item.year}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-text">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="timeline-nav">
          {journeyData.map((_, index) => (
            <button
              key={index}
              className={`nav-button ${index === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>

      {/* Values Section */}
      <section className="container my-5">
        <h2 className="text-center section-title">Our Values</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card value-card text-center p-4">
              <div className="value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Customer First</h3>
              <p>
                Our customers are at the heart of everything we do. We strive to
                exceed expectations with every interaction.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card value-card text-center p-4">
              <div className="value-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Sustainability</h3>
              <p>
                We're committed to eco-friendly practices and sustainable
                sourcing across our supply chain.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card value-card text-center p-4">
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovation</h3>
              <p>
                We continuously explore new technologies and ideas to enhance
                your shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="text-center section-title text-white">
            By The Numbers
          </h2>
          <div className="row text-center">
            <div className="col-md-3 col-6 mb-4">
              <div className="stat-number">5M+</div>
              <p>Happy Customers</p>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="stat-number">100K+</div>
              <p>Our Products</p>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="stat-number">50+</div>
              <p> Countries</p>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="stat-number">24/7</div>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container my-5">
        <h2 className="text-center section-title">Meet Our Team</h2>
        <div className="row">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            },
            {
              name: "Michael Chen",
              role: "Chief Technology Officer",
              img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            },
            {
              name: "Emma Rodriguez",
              role: "Head of Design",
              img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            },
          ].map((member, i) => (
            <div className="col-md-4" key={i}>
              <div className="team-member">
                <div className="team-img-container">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="team-img"
                  />
                  <div className="team-social">
                    <a href="#"><FaFacebook /></a>
                    <a href="#"><FaLinkedin /></a>
                    <a href="#"><FaInstagram /></a>
                  </div>
                </div>
                <h4>{member.name}</h4>
                <p className="text-muted">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards Section */}
   
      {/* Testimonials Section */}
      <section className="container my-5">
        <h2 className="text-center section-title">What Our Customers Say</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="testimonial-card">
              <div className="d-flex align-items-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Customer"
                  className="testimonial-img"
                />
                <div>
                  <h4>James Wilson</h4>
                  <p className="text-muted">Regular Customer</p>
                </div>
              </div>
              <p className="mt-3">
                "StyleCart has completely transformed how I shop online. The
                personalized recommendations are always spot on, and their
                customer service is exceptional."
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="testimonial-card">
              <div className="d-flex align-items-center">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Customer"
                  className="testimonial-img"
                />
                <div>
                  <h4>Sophia Martinez</h4>
                  <p className="text-muted">Loyal Customer</p>
                </div>
              </div>
              <p className="mt-3">
                "I've been shopping with StyleCart for over three years now. The
                quality of products and the seamless shopping experience keep me
                coming back."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container">
        <div className="cta-section">
          <div className="container">
            <h2 className="mb-4">Join Our Growing Community</h2>
            <p className="lead mb-4">
              Experience the difference of shopping with a company that values
              you
            </p>
            <button className="btn btn-cta">Start Shopping Now</button>
          </div>
        </div>
      </section>
    </div>
  )
}
