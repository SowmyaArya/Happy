const upload = require('../Middleware/Upload');
const express = require('express');
const router = express.Router();
const blogController = require('../controller/BlogController');

// Define routes for blogs
router.post('/AddBlog', upload.single('image'), blogController.AddBlog);
router.get('/GetBlogs', blogController.GetBlogs);
router.put('/UpdateBlog/:id', upload.single('image'), blogController.UpdateBlog);
router.delete('/DeleteBlog/:id', blogController.DeleteBlog);

module.exports = router;
