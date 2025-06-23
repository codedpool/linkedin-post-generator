const express = require('express');
const router = express.Router();

// Controller
const exampleController = require('../controllers/exampleController');

router.get('/', exampleController.home);

module.exports = router;
