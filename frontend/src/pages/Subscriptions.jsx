import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../context/api";
import "../styles/Subscriptions.css";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$9.99",
    period: "/month",
    desc: "Best for casual viewers who want access to a wide range of content.",
    features: [
      "Access to a wide selection of movies and shows",
      "Watch on one device at a time",
      "Standard definition (SD) streaming",
      "Limited offline downloads",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "$12.99",
    period: "/month",
    desc: "Great for movie lovers who want better quality and more flexibility.",
    popular: true,
    features: [
      "Access to all movies and shows",
      "Watch on two devices at a time",
      "High definition (HD) streaming",
      "Offline downloads on 3 devices",
      "Ad-free experience",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$14.99",
    period: "/month",
    desc: "Perfect for families and enthusiasts who want the ultimate experience.",
    features: [
      "Access to all movies and shows",
      "Watch on four devices at a time",
      "Ultra HD (4K) + HDR streaming",
      "Unlimited offline downloads",
      "Ad-free experience",
      "Early access to new releases",
    ],
  },
];

const Subscriptions = () => {
  const { user, setUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const validateCardNumber = (cardNumber) => {
    const digits = cardNumber.replace(/\D/g, "");
    return digits.length === 16;
  };

  const validateExpiryDate = (expiry) => {
    const match = expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!match) return false;
    const month = Number(match[1]);
    const year = Number(`20${match[2]}`);
    const now = new Date();
    const expiryDate = new Date(year, month - 1, 1);
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    return expiryDate > now;
  };

  const validateCvv = (cvv) => /^[0-9]{3,4}$/.test(cvv);

  const handleActivate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("Please login first to activate a subscription.");
      return;
    }

    if (user.subscriptionPlan === "active") {
      setError("You already have an active subscription!");
      return;
    }

    if (!validateCardNumber(cardData.cardNumber)) {
      setError(
        "Card number must be exactly 16 digits (spaces allowed). Example: 1234 5678 9012 3456.",
      );
      return;
    }

    if (!validateExpiryDate(cardData.expiryDate)) {
      setError(
        "Expiry date must be in MM/YY format and must be a future month.",
      );
      return;
    }

    if (!validateCvv(cardData.cvv)) {
      setError("CVV must be 3 or 4 digits.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/subscriptions/activate", {
        planName: selectedPlan,
        cardNumber: cardData.cardNumber.replace(/\s/g, ""),
        expiryDate: cardData.expiryDate,
        cvv: cardData.cvv,
      });
      setSuccess(data.message || "Subscription activated successfully!");
      setCardData({ cardNumber: "", expiryDate: "", cvv: "" });
      // Update user in localStorage and context
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        const updatedUser = { ...storedUser, subscriptionPlan: "active" };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Activation failed. Check your card details.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Format card number with spaces
  const formatCard = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div className="subs-page">
      <div className="subs-header">
        <h1 className="subs-title">Choose Your Plan</h1>
        <p className="subs-subtitle">
          Unlock unlimited access to thousands of movies and TV shows. Choose
          the plan that's right for you.
        </p>
        {user && (
          <div
            className={`subs-current-plan ${user.subscriptionPlan === "active" ? "active-plan" : ""}`}
          >
            Current Plan:{" "}
            {user.subscriptionPlan === "active"
              ? "✓ Active"
              : user.subscriptionPlan === "free_trial"
                ? "Free Trial"
                : "None"}
          </div>
        )}
      </div>

      {/* Plan Cards */}
      <div className="subs-plans">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${selectedPlan === plan.id ? "selected" : ""}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && <div className="plan-popular">Most Popular</div>}
            <h3 className="plan-name">{plan.name}</h3>
            <p className="plan-desc">{plan.desc}</p>
            <div className="plan-price">
              {plan.price}
              <span>{plan.period}</span>
            </div>
            <ul className="plan-features">
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Card Details Form */}
      <div className="subs-form-wrapper">
        <h2 className="subs-form-title">Activate Your Subscription</h2>

        {success && <div className="subs-success">{success}</div>}
        {error && <div className="subs-error">{error}</div>}

        <form className="subs-form" onSubmit={handleActivate}>
          <div className="subs-field">
            <label className="subs-label">Card Number</label>
            <input
              className="subs-input"
              placeholder="1234 5678 9012 3456"
              value={cardData.cardNumber}
              onChange={(e) =>
                setCardData({
                  ...cardData,
                  cardNumber: formatCard(e.target.value),
                })
              }
              required
              maxLength={19}
            />
          </div>
          <div className="subs-row">
            <div className="subs-field">
              <label className="subs-label">Expiry Date</label>
              <input
                className="subs-input"
                placeholder="MM/YY (e.g. 12/27)"
                value={cardData.expiryDate}
                onChange={(e) =>
                  setCardData({ ...cardData, expiryDate: e.target.value })
                }
                required
                maxLength={5}
                pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                title="Enter expiry date in MM/YY format"
              />
            </div>
            <div className="subs-field">
              <label className="subs-label">CVV</label>
              <input
                className="subs-input"
                type="password"
                placeholder="123 (3-4 digits)"
                value={cardData.cvv}
                onChange={(e) =>
                  setCardData({ ...cardData, cvv: e.target.value })
                }
                required
                maxLength={4}
              />
            </div>
          </div>
          <button type="submit" className="subs-btn" disabled={loading}>
            {loading
              ? "Processing..."
              : `Activate ${plans.find((p) => p.id === selectedPlan)?.name} Plan`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscriptions;
