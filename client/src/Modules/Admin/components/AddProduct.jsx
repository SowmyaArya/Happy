import React, { useState, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Button, TextField, IconButton } from '@mui/material';
import axios from 'axios';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const AddProduct = () => {
  const [data, setData] = useState({
    category: '',
    subcategory: '',
    productName: '',
    productDescription: '',
    size: '',
    material: '',
    color: '',
    amount: '',
    pattern: '',
    occasion: '',
    brand: '',
    stock: '',
    weight: ''
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/Category/GetCategory');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/SubCategory/GetSubcategories');
        setSubcategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // Append form fields to FormData
    for (const key in data) {
      formData.append(key, data[key]);
    }
  
    // Append image to FormData
    if (image) {
      formData.append('product_image', image); // Field name should match what multer expects
    }
  
    try {
      await axios.post('http://localhost:5002/api/Product/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
          <h2>Add Product</h2>
      <Grid container spacing={2} >
        {/* Category Selection */}
    
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={data.category}
              onChange={handleChange}
              label="Category"
              required
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Subcategory Selection */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 2 }}>
            <InputLabel id="subcategory-label">Subcategory</InputLabel>
            <Select
              labelId="subcategory-label"
              id="subcategory"
              name="subcategory"
              value={data.subcategory}
              onChange={handleChange}
              label="Subcategory"
              required
            >
              {subcategories.map((subcategory) => (
                <MenuItem key={subcategory._id} value={subcategory._id}>
                  {subcategory.subcategory_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Product Name Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Product Name"
            name="productName"
            value={data.productName}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Product Description Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Product Description"
            name="productDescription"
            value={data.productDescription}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Product Image Upload */}
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 2 }}>
            <InputLabel htmlFor="product-image-upload">
              Product Image
            </InputLabel>
            <input
              id="product-image-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor="product-image-upload">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
              {image ? image.name : 'Choose Image'}
            </label>
          </FormControl>
        </Grid>

        {/* Size Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Size"
            name="size"
            value={data.size}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Material Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Material"
            name="material"
            value={data.material}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Color Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Color"
            name="color"
            value={data.color}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Amount Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Amount"
            name="amount"
            type="number"
            value={data.amount}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Pattern Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Pattern"
            name="pattern"
            value={data.pattern}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Occasion Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Occasion"
            name="occasion"
            value={data.occasion}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Brand Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Brand"
            name="brand"
            value={data.brand}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Stock Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Stock"
            name="stock"
            type="number"
            value={data.stock}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Weight Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Weight"
            name="weight"
            type="number"
            value={data.weight}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Product
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddProduct;
