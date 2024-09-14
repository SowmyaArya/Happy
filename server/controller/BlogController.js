const Blog = require('../model/Blog_model');

// Define AddBlog function
const AddBlog = async (req, res) => {
    try {
        console.log("Blog added Successfully"); // Log endpoint hit
        const { title, description } = req.body;

        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).send('Blog image is required');
        }
        const blog_img = req.file.filename;

        // Create a new blog document
        const blog = new Blog({
            title,
            description,
            blog_image: blog_img,
        });

        // Save the blog document to the database
        const savedBlog = await blog.save();

        // Send success response
        res.status(201).json(savedBlog); // Changed to status 201 (Created)
    } catch (error) {
        console.error("Error in AddBlog:", error.message);
        res.status(500).send("Error adding blog");
    }
};

// Define GetBlogs function
const GetBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        console.error("Error in GetBlogs:", err.message);
        res.status(500).send("Error fetching blogs");
    }
};

// Define UpdateBlog function
const UpdateBlog = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newBlogData = {};
        if (title) { newBlogData.title = title; }
        if (description) { newBlogData.description = description; }
        if (req.file) { newBlogData.blog_image = req.file.filename; }

        let blog = await Blog.findByIdAndUpdate(req.params.id, { $set: newBlogData }, { new: true });
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        res.status(200).json({ blog });
    } catch (error) {
        console.error("Error in UpdateBlog:", error.message);
        res.status(500).send("Error updating blog");
    }
};

// Define DeleteBlog function
const DeleteBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: "Blog deleted", blog });
    } catch (error) {
        console.error("Error in DeleteBlog:", error.message);
        res.status(500).send("Error deleting blog");
    }
};

module.exports = {
    AddBlog,
    GetBlogs,
    UpdateBlog,
    DeleteBlog
};
