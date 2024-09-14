import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Paper } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
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

const SectionCard = styled(Card)({
  marginTop: '20px',
  animation: `${fadeIn} 2s ease-in-out`,
  height: '100%',
});

const CategoryCard = styled(Box)({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    cursor: 'pointer',
  },
});

const CategoryImage = styled('img')({
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '8px 8px 0 0',
});

export default function About() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/Category/GetCategory');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/SubcategoryPage/${category._id}`);
  };

  const MissionVisionText = styled(Typography)(({ theme }) => ({
    fontFamily: '"Roboto", sans-serif',
    color: '#333',
  }));

  const AboutSection = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  }));

  return (
    <>
      <Container>
        <Typography variant="h2" component="h1" gutterBottom style={{color:'#19334d'}}>
          Happy Floors
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <SectionCard>
              <CardContent>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  gutterBottom 
                  style={{ 
                    background: 'linear-gradient(to left, #009900, #19334d, #19334d)', 
                    color: 'white' 
                  }}
                >
                  Our Mission
                </Typography>
                <Typography variant="body1" style={{ textAlign: 'justify' }}>
                  At Happy Floors, our mission is to provide top-quality tiles that bring beauty, durability, and comfort to every space in your home. We are committed to delivering exceptional products that meet the highest standards of craftsmanship and sustainability.
                </Typography>
              </CardContent>
            </SectionCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SectionCard>
              <CardContent>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  gutterBottom 
                  style={{ 
                    background: 'linear-gradient(to left, #009900, #19334d, #19334d)', 
                    color: 'white' 
                  }}
                >
                  Our Vision
                </Typography>
                <Typography variant="body1" style={{ textAlign: 'justify' }}>
                  Our vision is to be the leading provider of innovative and stylish tiles, inspiring our customers to create beautiful and functional living spaces. We strive to set the benchmark for excellence in the tile industry through continuous innovation, customer-centric service, and environmental responsibility.
                </Typography>
              </CardContent>
            </SectionCard>
          </Grid>
        </Grid>
        <SectionCard style={{ marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom style={{color:'#19334d'}}>
              Explore Our Categories
            </Typography>
            <Grid container spacing={3}>
              {categories.map((category, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CategoryCard onClick={() => handleCategoryClick(category)}>
                    <CategoryImage src={`http://localhost:5002/api/image/${category.category_image}`} alt={category.category_name} />
                    <Typography variant="h5" component="h3">
                      {category.category_name}
                    </Typography>
                    <Typography variant="body1">
                      {category.category_description}
                    </Typography>
                  </CategoryCard>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </SectionCard>
      </Container>
      <Footer />
    </>
  );
}
