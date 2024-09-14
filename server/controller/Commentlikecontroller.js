// Commentlikecontroller.js
const CommentLike = require('../model/Commentlike_model');

const addCommentLike = async (req, res) => {
  try {
    const { rating, comment, like, recipeid } = req.body;

    console.log('Request body:', req.body); // Log the request body for debugging

    if (!rating || !comment || !recipeid) {
      throw new Error('Missing required fields');
    }

    const newCommentLike = new CommentLike({
      rating,
      comment,
      like,
      recipeid,
      // userid,
    });

    await newCommentLike.save();
    res.status(201).json(newCommentLike);
  } catch (error) {
    console.error('Error saving comment like:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addCommentLike };
