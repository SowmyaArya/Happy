const upload = require('../Middleware/Upload');
const express = require('express');
const router = express.Router();
const productController = require('../controller/Productcontroller');

// Create a new product
router.post('/products', upload.single('product_image'), productController.AddProduct);

// Get all products
router.get('/GetAllProducts', productController.GetAllProducts);

// Get a product by ID
router.get('/GetProduct/:id', productController.GetProduct);

// Update a product by ID
router.patch('/UpdateProduct/:id', upload.single('product_image'), productController.UpdateProduct);

// Delete a product by ID
router.delete('/DeleteProduct/:id', productController.DeleteProduct);

router.get('/GetProductsBySubcategory/:subcategoryId', productController.GetProductsBySubcategory); // New route for fetching products by subcategory

// router.get('/GetProductsBySubcategory/:subcategoryId', productController.GetProductsBySubcategory);
module.exports = router;
