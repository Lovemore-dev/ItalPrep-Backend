const express = require('express');
const router = express.Router();
// import the controller
const contentController = require('../controllers/contentController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// get all summaries 
router.get('/', contentController.getAllContent);

// get specific modules
router.get('/:slug', contentController.getContentBySlug);
router.post('/', requireAuth, requireAdmin, contentController.createContent);
router.put('/:slug', requireAuth, requireAdmin, contentController.updateContent);
router.delete('/:slug', requireAuth, requireAdmin, contentController.deleteContent);

module.exports = router;