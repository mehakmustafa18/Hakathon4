const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number
  },
  duration: {
    type: String
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    default: "General"
  },
  reviews: [
    {
      name: { type: String, required: true },
      location: { type: String, default: "Global" },
      rating: { type: Number, required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
