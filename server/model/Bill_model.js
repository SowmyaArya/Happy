const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  bookingIds: [mongoose.Schema.Types.ObjectId], // Array of booking IDs
  filePath: { type: String, required: true }, // Path to the bill file
  fileName: { type: String, required: true }, // Name of the file
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', billSchema);
