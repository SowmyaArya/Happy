// App.js
import React from 'react';
import { Container, Grid, Box, Typography, Checkbox, FormControlLabel, Slider, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';

const products = [
  { name: 'UNICO S&P', price: 56, image: 'path_to_image1' },
  { name: 'STELLA WOOD', price: 39, image: 'path_to_image2' },
  { name: 'WHITE (1X1)MAT', price: 26, image: 'path_to_image3' },
  { name: 'ROOFING AQUA', price: 31, image: 'path_to_image4' },
  { name: 'SPARKLE GRANITE', price: 37, image: 'path_to_image5' },
  { name: '30050 F', price: 45, image: 'path_to_image6' },
  { name: '81004 F', price: 45, image: 'path_to_image7' },
  { name: 'MINI PINE BROWN F', price: 45, image: 'path_to_image8' },
];

const FilterSidebar = () => {
  return (
    <Box p={2}>
      <Typography variant="h6">Filter by</Typography>
      <Typography variant="subtitle1">Price</Typography>
      <Slider defaultValue={3000} max={3000} />
      <Typography variant="subtitle1">Categories</Typography>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Floor Tiles (1222)" />
      <Typography variant="subtitle1">Size</Typography>
      {/* Add more filter options similarly */}
      <FormControlLabel control={<Checkbox />} label="12X12 (334)" />
      <FormControlLabel control={<Checkbox />} label="16X16 (92)" />
      <FormControlLabel control={<Checkbox />} label="20X20 (30)" />
      {/* Add more options */}
    </Box>
  );
};

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">₹{product.price}.00 / sq.feet</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

const Filter = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" align="center">Floor Tiles</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FilterSidebar />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {products.map((product, index) => (
              <Grid item xs={4} key={index}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Filter;
