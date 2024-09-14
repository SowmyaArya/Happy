import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Grid, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
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

const SearchBar = styled(TextField)({
  width: '100%', // Make it full width of its container
  maxWidth: '300px', // Set a maximum width
  marginRight: '20px', // Add some space on the right
  '& .MuiInputBase-root': {
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
});

const DropdownContainer = styled(FormControl)({
  width: '100%', // Make it full width of its container
  maxWidth: '200px', // Set a maximum width
  '& .MuiInputLabel-root': {
    fontSize: '1rem',
  },
  '& .MuiSelect-root': {
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  '& .MuiMenuItem-root': {
    fontSize: '0.875rem',
  },
});

const FilterContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // Distribute space between elements
  marginBottom: '20px',
});

const NoResultsMessage = styled(Typography)({
  textAlign: 'center',
  marginTop: '20px',
  fontStyle: 'italic',
});

const highlightText = (text, searchTerm) => {
  if (!searchTerm.trim()) return text;

  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={index} style={{ backgroundColor: 'yellow' }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

const debouncedSearch = _.debounce((setSearchTerm, value) => {
  setSearchTerm(value);
}, 300); // Adjust the debounce time as needed

export default function SubcategoryPage() {
  const { id } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/SubCategory/GetSubcategoriesByCategory/${id}`);
        setSubcategories(response.data);
        if (response.data.length > 0) {
          setSelectedSubcategory(response.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };
    fetchSubcategories();
  }, [id]);

  useEffect(() => {
    if (selectedSubcategory) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`http://localhost:5002/api/Product/GetProductsBySubcategory/${selectedSubcategory}`);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
    }
  }, [selectedSubcategory]);

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    debouncedSearch(setSearchTerm, event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.product_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
   
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        View Subcategories
      </Typography>
      <SectionBox>
        <FilterContainer>
          <SearchBar
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <DropdownContainer>
            <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
            <Select
              labelId="subcategory-select-label"
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              label="Subcategory"
            >
              {subcategories.map((subcategory) => (
                <MenuItem key={subcategory._id} value={subcategory._id}>
                  {subcategory.subcategory_name}
                </MenuItem>
              ))}
            </Select>
          </DropdownContainer>
        </FilterContainer>
        {filteredProducts.length === 0 && searchTerm ? (
          <NoResultsMessage variant="h6">
            Product not found
          </NoResultsMessage>
        ) : (
          <Grid container spacing={3} marginTop={2}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                  <ProductCard>
                    <ProductImage src={`http://localhost:5002/api/image/${product.product_image}`} alt={product.product_name} />
                    <Typography variant="h5" component="h3">
                      {highlightText(product.product_name, searchTerm)}
                    </Typography>
                    <Typography variant="body1">
                      {highlightText(product.product_description, searchTerm)}
                    </Typography>
                  </ProductCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </SectionBox>
    </Container>
    <Footer />
    </>
  );
}
