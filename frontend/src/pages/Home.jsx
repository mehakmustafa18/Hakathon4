import {
  FiPlay,
  FiArrowLeft,
  FiArrowRight,
  FiTablet,
  FiSmartphone,
  FiTv,
  FiMonitor,
  FiAirplay,
  FiZap,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import Button from "../components/Button";
import FreeTrial from "../components/FreeTrial";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const devices = [
    {
      name: "Smartphones",
      icon: <img src="/Icon (2).png" alt="" />,
      desc: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
      name: "Tablet",
      icon: <img src="/Icon (3).png" alt="" />,
      desc: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
      name: "Smart TV",
      icon: <img src="/Icon (4).png" alt="" />,
      desc: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
      name: "Laptops",
      icon: <img src="/Icon (5).png" alt="" />,
      desc: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
      name: "Gaming Consoles",
      icon: <img src="/Icon (6).png" alt="" />,
      desc: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
      name: "VR Headsets",
      icon: <img src="/Icon (7).png" alt="" />,
      desc: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
  ];
  const categories = [
    {
      name: "Action",
      images: [
        "/Image (8).png",
        "/Image (9).png",
        "/Image (10).png",
        "/Image (11).png",
      ],
    },
    {
      name: "Adventure",
      images: [
        "/Image.png",
        "/Image (1).png",
        "/Image (2).png",
        "/Image (3).png",
      ],
    },
    {
      name: "Comedy",
      images: [
        "/Image (4).png",
        "/Image (5).png",
        "/Image (7).png",
        "/Image (6).png",
      ],
    },
    {
      name: "Drama",
      images: [
        "/Image (8).png",
        "/Image (9).png",
        "/Image (10).png",
        "/Image (11).png",
      ],
    },
    {
      name: "Horror",
      images: [
        "/Image (12).png",
        "/Image (13).png",
        "/Image (14).png",
        "/Image (15).png",
      ],
    },
  ];

  const faqs = [
    {
      id: "01",
      question: "What is StreamVibe?",
      answer:
        "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
      id: "02",
      question: "How much does StreamVibe cost?",
      answer:
        "StreamVibe offers various plans starting from $9.99/month. You can choose the one that fits your needs.",
    },
    {
      id: "03",
      question: "What content is available on StreamVibe?",
      answer:
        "We have a vast library of movies, TV shows, and original content across multiple genres.",
    },
    {
      id: "04",
      question: "How can I watch StreamVibe?",
      answer:
        "You can watch StreamVibe on your smartphone, tablet, smart TV, laptop, or gaming console.",
    },
    {
      id: "05",
      question: "How do I sign up for StreamVibe?",
      answer:
        'Simply click on the "Start Free Trial" button and follow the registration steps.',
    },
    {
      id: "06",
      question: "What is the StreamVibe free trial?",
      answer:
        "We offer a 7-day free trial for new users to explore our platform.",
    },
    {
      id: "07",
      question: "How do I contact StreamVibe customer support?",
      answer:
        "You can reach us via the contact form or our 24/7 live chat support.",
    },
    {
      id: "08",
      question: "What are the StreamVibe payment methods?",
      answer: "We accept all major credit cards, PayPal, and digital wallets.",
    },
  ];

  const [activeFaq, setActiveFaq] = useState("01");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Basic Plan",
      desc: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
      monthlyPrice: "$9.99",
      yearlyPrice: "$99.99",
    },
    {
      name: "Standard Plan",
      desc: "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      monthlyPrice: "$12.99",
      yearlyPrice: "$129.99",
    },
    {
      name: "Premium Plan",
      desc: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
      monthlyPrice: "$14.99",
      yearlyPrice: "$149.99",
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        {/* Poster Grid Background */}
        <div className="hero-bg-grid">
          {Array.from({ length: 45 }).map((_, i) => {
            // Generate random image from your public folder (Image.png to Image (45).png)
            const imageNumber = i + 1;
            const imageName =
              imageNumber === 1 ? "Image.png" : `Image (${imageNumber}).png`;
            return (
              <div key={i} className="poster-item">
                <img
                  src={`/${imageName}`}
                  className="w-full h-full object-cover"
                  alt=""
                  onError={(e) => {
                    e.target.style.opacity = "0.3";
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* Dark Overlays */}
        <div className="hero-overlay"></div>
        <div className="hero-overlay-dark"></div>

        {/* Central Content */}
        <div className="hero-content">
          {/* Central Logo Overlay (Matching Screenshot) */}
          <div className="hero-logo-box">
            {/* Outer Vector (Dashes/Around) */}
            <img
              src="/Vector (1).png"
              className="hero-vector-bg"
              alt=""
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            {/* Inner Icon (Play Button) */}
            <img
              src="/Icon.png"
              className="hero-icon-play"
              alt=""
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/100?text=Play";
              }}
            />
          </div>

          <h1 className="hero-title">The Best Streaming Experience</h1>
          <p className="hero-desc">
            StreamVibe is the best streaming experience for watching your
            favorite movies and shows on demand, anytime, anywhere. With
            StreamVibe, you can enjoy a wide variety of content, including the
            latest blockbusters, classic movies, popular TV shows, and more. You
            can also create your own watchlists, so you can easily find the
            content you want to watch.
          </p>
          <Button variant="primary" onClick={() => navigate("/movies")}>
            <img
              src="/Icon (1).png"
              className="w-5 h-5 object-contain"
              alt=""
            />{" "}
            Start Watching Now
          </Button>
        </div>
      </section>

      <div className="section-main">
        {/* Categories Section */}
        <section className="category-section">
          <div className="section-header">
            <div className="header-text">
              <h2>Explore our wide variety of categories</h2>
              <p>
                Whether you're looking for a comedy to make you laugh, a drama
                to make you think, or a documentary to learn something new
              </p>
            </div>
            {/* Slider Controls matching pic */}
            <div className="slider-controls">
              <button className="slider-btn">
                <FiArrowLeft />
              </button>
              <div className="slider-dots">
                <div className="slider-dot active"></div>
                <div className="slider-dot inactive"></div>
                <div className="slider-dot inactive"></div>
              </div>
              <button className="slider-btn">
                <FiArrowRight />
              </button>
            </div>
          </div>

          <div className="category-grid">
            {categories.map((cat) => (
              <div key={cat.name} className="category-card">
                <div className="card-images">
                  {cat.images.map((imgSrc, index) => (
                    <div key={index} className="card-img-item">
                      <img
                        src={imgSrc}
                        alt=""
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="card-footer">
                  <span>{cat.name}</span>
                  <div className="card-arrow">
                    <FiArrowRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Devices Section */}
        <section className="devices-section">
          <div className="section-header no-slider">
            <div className="header-text">
              <h2>
                We Provide you streaming experience across various devices.
              </h2>
              <p>
                With StreamVibe, you can enjoy your favorite movies and TV shows
                anytime, anywhere. Our platform is designed to be compatible
                with a wide range of devices, ensuring that you never miss a
                moment of entertainment.
              </p>
            </div>
          </div>

          <div className="devices-grid">
            {devices.map((device) => (
              <div key={device.name} className="device-card">
                <div className="device-card-header">
                  <div className="device-icon-box">{device.icon}</div>
                  <h3>{device.name}</h3>
                </div>
                <p>{device.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="section-header faq-header">
            <div className="header-text">
              <h2>Frequently Asked Questions</h2>
              <p>
                Got questions? We've got answers! Check out our FAQ section to
                find answers to the most common questions about StreamVibe.
              </p>
            </div>
            <Button variant="primary">Ask a Question</Button>
          </div>

          <div className="faq-grid">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`faq-item ${activeFaq === faq.id ? "active" : ""}`}
                onClick={() =>
                  setActiveFaq(activeFaq === faq.id ? null : faq.id)
                }
              >
                <div className="faq-item-top">
                  <div className="faq-number">{faq.id}</div>
                  <div className="faq-question-row">
                    <h3>{faq.question}</h3>
                    <div className="faq-toggle">
                      {activeFaq === faq.id ? <FiMinus /> : <FiPlus />}
                    </div>
                  </div>
                </div>
                {activeFaq === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pricing-section">
          <div className="section-header pricing-header">
            <div className="header-text">
              <h2>Choose the plan that's right for you</h2>
              <p>
                Join StreamVibe and select from our flexible subscription
                options tailored to suit your viewing preferences. Get ready for
                non-stop entertainment!
              </p>
            </div>
            <div className="billing-toggle">
              <button
                className={`toggle-btn ${billingCycle === "monthly" ? "active" : ""}`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={`toggle-btn ${billingCycle === "yearly" ? "active" : ""}`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="pricing-grid">
            {plans.map((plan) => (
              <div key={plan.name} className="plan-card">
                <div className="plan-info">
                  <h3>{plan.name}</h3>
                  <p>{plan.desc}</p>
                </div>
                <div className="plan-price">
                  <span className="amount">
                    {billingCycle === "monthly"
                      ? plan.monthlyPrice
                      : plan.yearlyPrice}
                  </span>
                  <span className="duration">
                    {billingCycle === "monthly" ? "/month" : "/year"}
                  </span>
                </div>
                <div className="plan-actions">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/subscriptions")}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/subscriptions")}
                  >
                    Choose Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FreeTrial />
      </div>
    </div>
  );
};

export default Home;
