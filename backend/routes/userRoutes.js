const express = require('express');
const router = express.Router();
const { getUsers, toggleBlockUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, admin, getUsers);

// Support both /block/:id and /:id/block for flexibility
router.put('/block/:id', protect, admin, toggleBlockUser);
router.put('/unblock/:id', protect, admin, toggleBlockUser);
router.put('/:id/block', protect, admin, toggleBlockUser);

module.exports = router;
