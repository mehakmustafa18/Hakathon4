const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../config/multer");

const {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  toggleVisibility,
  addReview,
  deleteReview,
} = require("../controllers/videoController");

// Video CRUD
router.route("/")
  .get(getVideos)
  .post(protect, admin, upload.fields([{ name: "video" }, { name: "thumbnail" }]), createVideo);

router.route("/:id")
  .get(getVideoById)
  .put(protect, admin, upload.fields([{ name: "video" }, { name: "thumbnail" }]), updateVideo)
  .delete(protect, admin, deleteVideo);

router.patch("/:id/visibility", protect, admin, toggleVisibility);

// Reviews
router.post("/:id/reviews", addReview);
router.delete("/:id/reviews/:reviewId", protect, admin, deleteReview);

module.exports = router;