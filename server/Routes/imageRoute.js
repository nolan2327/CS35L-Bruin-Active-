const express = require('express');
const { uploadImage, findImage } = require('../Controllers/imageController');
const router = express.Router();

router.post('/uploadImage', uploadImage);
router.post('/findImage', findImage);

module.exports = router;