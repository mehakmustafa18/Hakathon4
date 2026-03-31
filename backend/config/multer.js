const multer = require("multer");
const storage = multer.memoryStorage(); // store in memory before uploading to Cloudinary
const upload = multer({ storage });

module.exports = upload;