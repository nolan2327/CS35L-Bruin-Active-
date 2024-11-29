const express = require('express');
const { uploadImage, findImage } = require('../Controllers/imageController');
const router = express.Router();

// Route to upload an image
router.post('/uploadImage', uploadImage);

// Route to find images by username
router.post('/findImage', findImage);

module.exports = router;