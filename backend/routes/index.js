const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.post('/short-text', contentController.generateShortText);

module.exports = router;