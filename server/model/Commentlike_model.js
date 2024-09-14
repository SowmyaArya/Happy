// Commentlike_model.js
const mongoose = require('mongoose');

const commentlikeSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  like: {
    type: Boolean,
    default: false,
  },
  recipeid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipe',
    required: true,
  },
  // userid: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   required: true,
  // },
}, {
  timestamps: true,
});

module.exports = mongoose.model('commentlike', commentlikeSchema);
