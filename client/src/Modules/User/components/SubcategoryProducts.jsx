import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';

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

const SubcategoryProducts = () => {
  const { subcategoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/Product/GetProductsBySubcategory/${subcategoryId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [subcategoryId]);

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Products in Subcategory
      </Typography>
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
    </Container>
  );
};

export default SubcategoryProducts;
