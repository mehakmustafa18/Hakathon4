const Video = require('../models/Video');

// @desc    Fetch all videos
// @route   GET /api/videos
// @access  Public
const getVideos = async (req, res) => {
  try {
    const query = req.user && req.user.role === 'super_admin' ? {} : { isVisible: true };
    const videos = await Video.find(query);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single video
// @route   GET /api/videos/:id
// @access  Public
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a video
// @route   POST /api/videos
// @access  Private/Admin
const createVideo = async (req, res) => {
  try {
    const { title, description, genre, releaseYear, duration, thumbnailUrl, videoUrl, category } = req.body;
    
    const video = new Video({
      title,
      description,
      genre,
      releaseYear,
      duration,
      thumbnailUrl,
      videoUrl,
      category
    });

    const createdVideo = await video.save();
    res.status(201).json(createdVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a video
// @route   PUT /api/videos/:id
// @access  Private/Admin
const updateVideo = async (req, res) => {
  try {
    const { title, description, genre, releaseYear, duration, thumbnailUrl, videoUrl, isVisible, category } = req.body;

    const video = await Video.findById(req.params.id);

    if (video) {
      video.title = title || video.title;
      video.description = description || video.description;
      video.genre = genre || video.genre;
      video.releaseYear = releaseYear || video.releaseYear;
      video.duration = duration || video.duration;
      video.thumbnailUrl = thumbnailUrl || video.thumbnailUrl;
      video.videoUrl = videoUrl || video.videoUrl;
      video.isVisible = isVisible !== undefined ? isVisible : video.isVisible;
      video.category = category || video.category;

      const updatedVideo = await video.save();
      res.json(updatedVideo);
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Private/Admin
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
