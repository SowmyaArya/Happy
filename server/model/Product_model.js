const mongoose = require('mongoose');

const DressProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_date: {
        type: Date,
        default: Date.now,
    },
    product_image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    size: {
        type: String,  // Example: S, M, L, XL
        required: true
    },
    material: {
        type: String,  // Example: Cotton, Polyester, Silk
        required: true
    },
    color: {
        type: String,  // Example: Red, Blue, Black
        required: true
    },
    amount: {
        type: Number,  // Price of the dress
        required: true
    },
    pattern: {
        type: String,  // Example: Solid, Striped, Floral
        required: true
    },
    occasion: {
        type: String,  // Example: Casual, Formal, Party
        required: true
    },
    brand: {
        type: String,  // Example: Brand Name
        required: true
    },
    stock: {
        type: Number,  // Number of items available
        required: true
    },
    weight: {
        type: Number,  // Weight of the dress
        required: true
    }
});

module.exports = mongoose.model("DressProduct", DressProductSchema);
