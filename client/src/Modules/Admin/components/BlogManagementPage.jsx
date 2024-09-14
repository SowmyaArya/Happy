import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Grid, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const BlogManagementPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });

  // Fetch blogs from the server (dummy data for example)
  useEffect(() => {
    // Replace with actual API call
    setBlogs([
      { id: 1, title: 'Blog 1', content: 'Content for Blog 1' },
      { id: 2, title: 'Blog 2', content: 'Content for Blog 2' }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleCreateBlog = () => {
    // Handle blog creation (e.g., POST request to API)
    setBlogs([...blogs, { ...newBlog, id: blogs.length + 1 }]);
    setNewBlog({ title: '', content: '' });
  };

  const handleEditBlog = (id) => {
    // Handle blog editing
    const blogToEdit = blogs.find(blog => blog.id === id);
    setEditingBlog(blogToEdit);
  };

  const handleDeleteBlog = (id) => {
    // Handle blog deletion (e.g., DELETE request to API)
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Blog Management
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Create New Blog</Typography>
              <TextField
                label="Title"
                name="title"
                value={newBlog.title}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Content"
                name="content"
                value={newBlog.content}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
                margin="normal"
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateBlog}
                startIcon={<Add />}
              >
                Create Blog
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Blog List</Typography>
          {blogs.map((blog) => (
            <Card key={blog.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{blog.title}</Typography>
                <Typography variant="body2">{blog.content}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEditBlog(blog.id)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteBlog(blog.id)} color="secondary">
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogManagementPage;
