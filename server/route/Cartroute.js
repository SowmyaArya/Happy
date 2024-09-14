// In Cartroute.js
const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart, updateCartItem } = require('../controller/cartController');
const AuthMiddleware = require('../Middleware/authMiddleware'); // Ensure this path is correct

router.post('/addToCart', AuthMiddleware, addToCart);
router.get('/getCart', AuthMiddleware, getCart);
router.delete('/removeFromCart/:cartItemId', AuthMiddleware, removeFromCart);
router.put('/updateCartItem', AuthMiddleware, updateCartItem);

module.exports = router;
