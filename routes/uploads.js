const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const fileUpload = require('../middlewares/fileUpload');  // Import multer middleware

// POST route to handle file upload and processing
router.post('/', fileUpload.single('file'), uploadController.processFile);

module.exports = router;
