const User = require("../models/User");

// @desc    Activate a subscription plan (Mock)
// @route   POST /api/subscriptions/activate
// @access  Private
const activateSubscription = async (req, res) => {
  try {
    const { planName, cardNumber, expiryDate, cvv } = req.body;

    // Validate mock card logic (16 digit check for example)
    if (!cardNumber || cardNumber.toString().replace(/\s/g, "").length !== 16) {
      return res
        .status(400)
        .json({ message: "Invalid card number. Must be 16 digits." });
    }

    if (!expiryDate || !cvv) {
      return res.status(400).json({ message: "Missing card details." });
    }

    const user = await User.findById(req.user._id);

    if (user) {
      user.subscriptionPlan = "active";
      user.cardDetails = { cardNumber, expiryDate, cvv };

      const updatedUser = await user.save();

      res.json({
        message: "Subscription activated successfully!",
        subscriptionPlan: updatedUser.subscriptionPlan,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { activateSubscription };
