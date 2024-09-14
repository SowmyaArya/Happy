import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import axios from 'axios';

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

const ProductCard = styled(Box)({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  height: '350px',
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

const ProductDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1,
});

const ProductName = styled(Typography)({
  margin: '10px 0',
  fontWeight: 'bold',
});

const ProductDescription = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  flexGrow: 1,
});

export default function ViewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/Product/GetAllProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <SectionBox>
        <Grid container spacing={3} marginTop={2}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ProductCard>
                  <ProductImage src={`http://localhost:5002/api/image/${product.product_image}`} alt={product.product_name} />
                  <ProductDetails>
                    <ProductName variant="h5" component="h3">
                      {product.product_name}
                    </ProductName>
                    <ProductDescription variant="body1">
                      {product.product_description}
                    </ProductDescription>
                  </ProductDetails>
                </ProductCard>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" component="div" style={{ textAlign: 'center', marginTop: '20px' }}>
              No products found.
            </Typography>
          )}
        </Grid>
      </SectionBox>
    </Container>
  );
}
