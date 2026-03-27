const express = require('express');
const router = express.Router();
const { getVideos, getVideoById, createVideo, updateVideo, deleteVideo, toggleVisibility, addReview, deleteReview } = require('../controllers/videoController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getVideos)
  .post(protect, admin, createVideo);

router.route('/:id')
  .get(getVideoById)
  .put(protect, admin, updateVideo)
  .delete(protect, admin, deleteVideo);

router.patch('/:id/visibility', protect, admin, toggleVisibility);
router.post('/:id/reviews', addReview);
router.delete('/:id/reviews/:reviewId', protect, admin, deleteReview);

module.exports = router;
