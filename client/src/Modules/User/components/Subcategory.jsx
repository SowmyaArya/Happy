import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import axios from 'axios';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SubcategoryButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'grey',
  },
});

const SectionBox = styled(Box)({
  marginTop: '20px',
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '8px',
  animation: `${fadeIn} 2s ease-in-out`,
});

const ProductCard = styled(Box)({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const ProductImage = styled('img')({
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '8px 8px 0 0',
});

export default function Subcategory() {
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/SubCategory/GetSubcategories');
        setSubcategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };
    fetchSubcategories();
  }, []);

  const fetchProducts = async (subcategoryId) => {
    try {
      const response = await axios.get(`http://localhost:5002/api/Product/GetProductsBySubcategory/${subcategoryId}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId);
    fetchProducts(subcategoryId);
  };

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        View Subcategories
      </Typography>
      <SectionBox>
        <Typography variant="h4" component="h2" gutterBottom>
          Select a Subcategory
        </Typography>
        <Grid container spacing={2}>
          {subcategories.map((subcategory, index) => (
            <Grid item key={index}>
              <SubcategoryButton variant="contained" onClick={() => handleSubcategoryClick(subcategory._id)}>
                {subcategory.subcategory_name}
              </SubcategoryButton>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3} marginTop={2}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                <ProductCard>
                  <ProductImage src={`http://localhost:5002/api/image/${product.product_image}`} alt={product.product_name} />
                  <Typography variant="h5" component="h3">
                    {product.product_name}
                  </Typography>
                  <Typography variant="body1">
                    {product.product_description}
                  </Typography>
                </ProductCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </SectionBox>
    </Container>
  );
}
