const Video = require("../models/Video");
const cloudinary = require("../config/cloudinary");

// @desc    Fetch all videos
const getVideos = async (req, res) => {
  try {
    const query = req.user && req.user.role === "super_admin" ? {} : { isVisible: true };
    const videos = await Video.find(query);
    res.json(videos.map(v => ({
      ...v._doc,
      videoUrl: cloudinary.url(v.videoPublicId, { resource_type: "video" }),
      thumbnailUrl: cloudinary.url(v.thumbnailPublicId),
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single video
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (video) {
      res.json({
        ...video._doc,
        videoUrl: cloudinary.url(video.videoPublicId, { resource_type: "video" }),
        thumbnailUrl: cloudinary.url(video.thumbnailPublicId),
      });
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a video
const createVideo = async (req, res) => {
  try {
    const { title, description, genre, releaseYear, duration, category } = req.body;

    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ message: "Video and thumbnail are required" });
    }

    // Upload thumbnail
    const thumbnailResult = await cloudinary.uploader.upload_stream({ folder: "thumbnails" }, (error, result) => {
      if (error) throw error;
      return result;
    });

    // Upload video
    const videoResult = await cloudinary.uploader.upload_stream({ resource_type: "video", folder: "videos" }, (error, result) => {
      if (error) throw error;
      return result;
    });

    const video = new Video({
      title,
      description,
      genre,
      releaseYear,
      duration,
      category,
      thumbnailPublicId: req.files.thumbnail[0].originalname, // placeholder, replace with actual Cloudinary upload
      videoPublicId: req.files.video[0].originalname,
    });

    const createdVideo = await video.save();
    res.status(201).json(createdVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update video (keep same public IDs if no new files)
const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const { title, description, genre, releaseYear, duration, category, isVisible } = req.body;

    video.title = title || video.title;
    video.description = description || video.description;
    video.genre = genre || video.genre;
    video.releaseYear = releaseYear || video.releaseYear;
    video.duration = duration || video.duration;
    video.category = category || video.category;
    video.isVisible = isVisible !== undefined ? isVisible : video.isVisible;

    // Optional: handle new files if uploaded
    if (req.files?.thumbnail) {
      const result = await cloudinary.uploader.upload(req.files.thumbnail[0].path, { folder: "thumbnails" });
      video.thumbnailPublicId = result.public_id;
    }
    if (req.files?.video) {
      const result = await cloudinary.uploader.upload(req.files.video[0].path, { resource_type: "video", folder: "videos" });
      video.videoPublicId = result.public_id;
    }

    const updatedVideo = await video.save();
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (video) {
      await video.deleteOne();
      res.json({ message: 'Video removed' });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle video visibility
// @route   PATCH /api/videos/:id/visibility
// @access  Private/Admin
const toggleVisibility = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (video) {
      video.isVisible = !video.isVisible;
      const updated = await video.save();
      res.json({ _id: updated._id, isVisible: updated.isVisible });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a review to a video
// @route   POST /api/videos/:id/reviews
// @access  Public (or Private depending on needs, currently Public for Hackathon Demo)
const addReview = async (req, res) => {
  try {
    const { name, rating, text, location } = req.body;
    const video = await Video.findById(req.params.id);

    if (video) {
      const review = {
        name,
        rating: Number(rating),
        text,
        location: location || 'Global',
      };

      video.reviews.unshift(review); // Add to the top
      await video.save();
      res.status(201).json({ message: 'Review added', reviews: video.reviews });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/videos/:id/reviews/:reviewId
// @access  Private/Admin
const deleteReview = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (video) {
      video.reviews = video.reviews.filter(
        (rv) => rv._id.toString() !== req.params.reviewId.toString()
      );
      await video.save();
      res.json({ message: 'Review removed', reviews: video.reviews });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVideos, getVideoById, createVideo, updateVideo, deleteVideo, toggleVisibility, addReview, deleteReview };
