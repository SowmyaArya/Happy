const DressProductSchema = require('../model/Product_model'); // Adjust the path as necessary

// Add Product
const AddProduct = async (req, res) => {
    try {
      const { category, subcategory, productName, productDescription, size, material, color, amount, pattern, occasion, brand, stock, weight } = req.body;
      const productImage = req.file ? req.file.path : null; // Handle the uploaded file
  
      // Validate required fields
      if (!category || !subcategory || !productName || !productDescription) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Create a new product instance
      const newProduct = new Product({
        category,
        subcategory,
        productName,
        productDescription,
        size,
        material,
        color,
        amount,
        pattern,
        occasion,
        brand,
        stock,
        weight,
        productImage
      });
  
      // Save the product to the database
      await newProduct.save();
  
      res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// Update Product
const UpdateProduct = async (req, res) => {
    const {
        product_name,
        product_description,
        category,
        subcategory,
        size,
        material,
        color,
        pattern,
        occasion,
        brand,
        stock,
        weight,
        amount
    } = req.body;
    const product_img = req.file ? req.file.filename : undefined;

    try {
        const updatedProduct = {
            product_name,
            product_description,
            product_image: product_img,
            category,
            subcategory,
            size,
            material,
            color,
            pattern,
            occasion,
            brand,
            stock,
            weight,
            amount
        };

        // Remove undefined fields from the update object
        Object.keys(updatedProduct).forEach(key => updatedProduct[key] === undefined && delete updatedProduct[key]);

        let product = await DressProductSchema.findByIdAndUpdate(req.params.id, { $set: updatedProduct }, { new: true });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error in UpdateProduct:", error.message);
        res.status(500).send("Error updating product");
    }
};

// Delete Product
const DeleteProduct = async (req, res) => {
    try {
        let product = await DressProductSchema.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        await DressProductSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: "Product deleted", product });
    } catch (error) {
        console.error("Error in DeleteProduct:", error.message);
        res.status(500).send("Error deleting product");
    }
};

// Get Product by ID
const GetProduct = async (req, res) => {
    try {
        const product = await DressProductSchema.findById(req.params.id)
            .populate('category')
            .populate('subcategory');
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.status(200).json(product);
    } catch (err) {
        console.error("Error in GetProduct:", err.message);
        res.status(500).send("Error fetching product");
    }
};

// Get All Products
const GetAllProducts = async (req, res) => {
    try {
        const products = await DressProductSchema.find().populate('category subcategory');
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in GetAllProducts:", error.message);
        res.status(500).send("Error fetching products");
    }
};

// Get Products by Subcategory
const GetProductsBySubcategory = async (req, res) => {
    const subcategoryId = req.params.subcategoryId;
    try {
        const products = await DressProductSchema.find({ subcategory: subcategoryId });
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

module.exports = {
    AddProduct,
    UpdateProduct,
    DeleteProduct,
    GetProduct,
    GetAllProducts,
    GetProductsBySubcategory
};
