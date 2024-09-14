// controllers/feedbackController.js

const Feedback = require('../model/Feedback_model');

// POST /api/feedback/submit - Submit new feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { userId, orderId, productId, name, email, message } = req.body;

    // Create a new Feedback document
    const newFeedback = new Feedback({
      userId,
      orderId,
      productId,
      name,
      email,
      message
    });

    // Save the feedback to the database
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// GET /api/feedback/getAllFeedback - Fetch all feedbacks
exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find(); // Retrieve all feedbacks
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Server error while fetching feedback' });
    }
};

// GET /api/feedback/get - Get the count of all feedback entries
exports.get = async (req, res) => {
  try {
    const count = await Feedback.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting feedback documents:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

