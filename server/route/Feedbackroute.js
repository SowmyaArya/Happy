// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/Feedbackcontroller');

// POST /api/feedback/submit
router.post('/submit', feedbackController.submitFeedback);

// GET /api/feedback
router.get('/getAllFeedback', feedbackController.getAllFeedback);
// router.get('/getAllFeedback', feedbackController.getAllFeedback);
router.get('/get', feedbackController.get);

module.exports = router;
