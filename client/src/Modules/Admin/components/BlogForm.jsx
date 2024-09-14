// import React, { useState } from 'react';
// import { Container, Typography, Button, TextField, Card, CardContent, CardActions } from '@mui/material';
// import { Add } from '@mui/icons-material';
// import axios from 'axios';

// const BlogForm = () => {
//   const API_HOST = "http://localhost:5002";
//   const API_ENDPOINT = "/api/Blog/AddBlog";

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     image: null
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('description', formData.description);
//     data.append('image', formData.image); // This should match the name used in multer upload.single('image')

//     try {
//       const response = await axios.post(`${API_HOST}${API_ENDPOINT}`, data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//       alert('Blog added successfully!');
//       // Clear the form
//       setFormData({
//         title: '',
//         description: '',
//         image: null
//       });
//     } catch (error) {
//       console.error('Error details:', error.response ? error.response.data : error.message);
//       alert('There was an error adding the blog!');
//     }
//   };

//   return (
    // <Container>
    //   <Typography variant="h4" gutterBottom>
    //     Add New Blog
    //   </Typography>
    //   <Card>
    //     <CardContent>
    //       <form onSubmit={handleSubmit}>
    //         <TextField
    //           label="Title"
    //           name="title"
    //           value={formData.title}
    //           onChange={handleChange}
    //           fullWidth
    //           margin="normal"
    //           required
    //         />
    //         <TextField
    //           label="Description"
    //           name="description"
    //           value={formData.description}
    //           onChange={handleChange}
    //           multiline
    //           rows={4}
    //           fullWidth
    //           margin="normal"
    //           required
    //         />
    //         <input
    //           accept="image/*"
    //           type="file"
    //           onChange={handleFileChange}
    //           style={{ display: 'block', marginTop: '1rem' }}
    //           required
    //         />
    //         <CardActions>
    //           <Button
    //             type="submit"
    //             variant="contained"
    //             color="primary"
    //             startIcon={<Add />}
    //           >
    //             Add Blog
    //           </Button>
    //         </CardActions>
    //       </form>
    //     </CardContent>
    //   </Card>
    // </Container>
//   );
// };

// export default BlogForm;


import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Button, TextField, Card, CardContent, CardActions, Grid, CardMedia } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const BlogManagement = () => {
  const API_HOST = "http://localhost:5002";
  const API_ADD_ENDPOINT = "/api/Blog/AddBlog";
  const API_GET_ENDPOINT = "/api/Blog/GetBlogs";
  const API_UPDATE_ENDPOINT = "/api/Blog/UpdateBlog";
  const API_DELETE_ENDPOINT = "/api/Blog/DeleteBlog";

  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });

  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_HOST}${API_GET_ENDPOINT}`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('image', formData.image);

    try {
      if (editingBlog) {
        await axios.put(`${API_HOST}${API_UPDATE_ENDPOINT}/${editingBlog._id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Blog updated successfully!');
      } else {
        await axios.post(`${API_HOST}${API_ADD_ENDPOINT}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Blog added successfully!');
      }
      setFormData({
        title: '',
        description: '',
        image: null
      });
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error(`Error ${editingBlog ? 'updating' : 'adding'} blog:`, error);
      alert(`There was an error ${editingBlog ? 'updating' : 'adding'} the blog!`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_HOST}${API_DELETE_ENDPOINT}/${id}`);
      alert('Blog deleted successfully!');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('There was an error deleting the blog!');
    }
  };

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description,
      image: null
    });
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ 
                color: '#19334d', // Coffee brown color for category name
                mb: 4, 
                fontFamily: 'Arial, sans-serif', 
                fontWeight: 'bold' 
              }} >
        {editingBlog ? 'Update Blog' : 'Add New Blog'}
      </Typography>
      <Card ref={formRef}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              required
            />
            <input
              accept="image/*"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'block', marginTop: '1rem' }}
            />
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                sx={{ 
                  mt: 2, 
                  color: 'white', 
                  borderColor: '#6f4f28', 
                  padding: '10px',
                  width: '200px',
                  background: 'linear-gradient(to left, #009900, #19334d, #19334d)', // Gradient from coffee brown to dark brown
                  borderRadius: '4px', // Optional: adjust the border radius
                  '&:hover': {
                    background: 'linear-gradient()', // Keep the gradient on hover
                    borderColor: '#6f4f28'
                  }
                }} 
                color="primary"
                startIcon={editingBlog ? <Edit /> : <Add />}
              >
                {editingBlog ? 'Update Blog' : 'Add Blog'}
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>

      <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }} sx={{ 
                color: '#19334d', // Coffee brown color for category name
                mb: 4, 
                fontFamily: 'Arial, sans-serif', 
                fontWeight: 'bold' 
              }}>
        Blog List
      </Typography>
      <Grid container spacing={2}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5002/api/image/${blog.blog_image}`}
                alt={blog.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ textAlign: 'justify', fontFamily: 'calibri', color: 'black' }}>
                  {blog.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ 
                    mt: 2, 
                    color: 'white', 
                    borderColor: '#6f4f28', 
                    padding: '10px',
                    // width: '200px',
                    background: 'linear-gradient(to left, #009900, #19334d, #19334d)', // Gradient from coffee brown to dark brown
                    borderRadius: '4px', // Optional: adjust the border radius
                    '&:hover': {
                      background: 'linear-gradient(to left, #009900, #19334d, #19334d)', // Keep the gradient on hover
                      borderColor: '#6f4f28'
                    }
                  }} 
                  onClick={() => handleEditClick(blog)}
                  startIcon={<Edit />}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ 
                    mt: 2, 
                    color: 'white', 
                    borderColor: '#6f4f28', 
                    padding: '10px',
                    // width: '200px',
                    background: 'linear-gradient(to left, #009900, #19334d, #19334d)', // Gradient from coffee brown to dark brown
                    borderRadius: '4px', // Optional: adjust the border radius
                    '&:hover': {
                      background: 'linear-gradient(to left, #009900, #19334d, #19334d)', // Keep the gradient on hover
                      borderColor: '#6f4f28'
                    }
                  }} 
                  onClick={() => handleDelete(blog._id)}
                  startIcon={<Delete />}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogManagement;
