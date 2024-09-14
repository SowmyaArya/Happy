const Cart = require('../model/Cart_model');
const Product = require('../model/Product_model');



const addToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id; // Assuming you have user authentication and can get userId
  
      // Validate product
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Find or create cart
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }
  
      // Check if product is already in cart
      const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
      if (itemIndex > -1) {
        // Update quantity if product is already in cart
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.items.push({ product: productId, quantity });
      }
  
      // Save cart
      await cart.save();
  
      res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
const  getCart = async (req, res) =>{
    try {
        const userId = req.user._id; // Assuming user information is available in req.user

        const cartItems = await Cart.find({ user: userId }).populate('product');

        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Error fetching cart', error });
    }
}

const  removeFromCart = async (req, res) =>{
    try {
        const { cartItemId } = req.params;

        // Validate cartItemId
        if (!cartItemId) {
            return res.status(400).json({ message: 'Cart item ID is required' });
        }

        const cartItem = await Cart.findById(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await Cart.findByIdAndDelete(cartItemId);
        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Error removing product from cart', error });
    }
}

const  updateCartItem = async (req, res) =>{
    try {
        const { cartItemId, quantity } = req.body;

        // Validate input
        if (!cartItemId || quantity == null) {
            return res.status(400).json({ message: 'Cart item ID and quantity are required' });
        }

        const cartItem = await Cart.findById(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json({ message: 'Cart item updated' });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Error updating cart item', error });
    }
}

// Export all functions
module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateCartItem
};
