// Cart_model.js
const mongoose = require('mongoose');

// Define CartItem schema
const CartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
});

// Define Cart schema
const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [CartItemSchema]
});

module.exports = mongoose.model('Cart', CartSchema);
