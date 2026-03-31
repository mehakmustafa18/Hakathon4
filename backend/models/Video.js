const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, default: "Global" },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number },
  duration: { type: String },
  thumbnailPublicId: { type: String, required: true },
  videoPublicId: { type: String, required: true },
  isVisible: { type: Boolean, default: true },
  category: { type: String, default: "General" },
  reviews: [reviewSchema],
}, { timestamps: true });

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;