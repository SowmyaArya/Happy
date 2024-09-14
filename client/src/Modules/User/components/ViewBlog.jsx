
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import axios from 'axios';


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HoverCard = styled(Card)({
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
});

const HoverCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9 aspect ratio
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const HoverCardContent = styled(CardContent)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  padding: '10px',
  '&:hover': {
    opacity: 1,
  },
});

export default function ViewBlog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/Blog/GetBlogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
        Our Tile Collections
        </Typography>
        <Box sx={{ width: '100%', marginTop: '20px' }}>
          <Grid container spacing={4}>
            {blogs.map((blog, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <HoverCard>
                  <HoverCardMedia
                    image={`http://localhost:5002/api/image/${blog.blog_image}?w=248&fit=crop&auto=format`}
                    title={blog.title}
                  />
                  <HoverCardContent>
                    <Typography variant="h6">{blog.title}</Typography>
                    <Typography variant="body2">{blog.description}</Typography>
                  </HoverCardContent>
                </HoverCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      {/* <Footer/> */}
    </>
  );
}
