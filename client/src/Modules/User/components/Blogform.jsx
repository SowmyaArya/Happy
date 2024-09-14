import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import axios from 'axios';
import Footer from './Footer';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SectionBox = styled(Box)({
  marginTop: '20px',
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '8px',
  animation: `${fadeIn} 2s ease-in-out`,
});

const HoverImageListItem = styled(ImageListItem)({
  position: 'relative',
  overflow: 'hidden',
  '&:hover .MuiImageListItemBar-root': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const HoverImageListItemBar = styled(ImageListItemBar)({
  opacity: 0,
  transform: 'translateY(100%)',
  transition: 'all 0.3s ease',
  background: 'rgba(0, 0, 0, 0.7)',
  '& .MuiImageListItemBar-title': {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default function Blogform() {
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
        View Blogs
      </Typography>
      <SectionBox>
        <Box sx={{ width: '100%', height: 450 }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {blogs.map((blog, index) => (
              <HoverImageListItem key={index}>
                <img
                  src={`http://localhost:5002/api/image/${blog.blog_image}?w=248&fit=crop&auto=format`}
                  srcSet={`http://localhost:5002/api/image/${blog.blog_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={blog.title}
                  loading="lazy"
                />
                <HoverImageListItemBar
                  title={blog.title}
                  position="bottom"
                />
              </HoverImageListItem>
            ))}
          </ImageList>
        </Box>
      </SectionBox>
    </Container>
    {/* <Footer/> */}
    </>
  );
}
