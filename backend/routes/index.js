const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const carouselController = require('../controllers/carouselController');

router.post('/short-text', contentController.generateShortText);
router.post('/carousel', carouselController.generateCarousel);

module.exports = router;