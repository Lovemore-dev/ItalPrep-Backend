const express = require('express');
const router = express.Router();
// import the controller
const contentController = require('../controllers/contentController');

// get all summaries 
router.get('/', contentController.getAllContent);

// get specific modules
router.get('/:slug', contentController.getCOntentBySlug);

module.exports = router;