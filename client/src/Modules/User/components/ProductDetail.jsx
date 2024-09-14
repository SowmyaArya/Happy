// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';
// import axios from 'axios';
// import Footer from './Footer';

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/api/Product/GetProduct/${productId}`);
//         setProduct(response.data);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       }
//     };
//     fetchProduct();
//   }, [productId]);

//   const handleBookNow = () => {
//     navigate(`/book/${productId}`);
//   };

//   if (!product) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <>
   
//     <Container>
//       <Box marginTop={2}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h2" component="h1" gutterBottom>
//               {product.product_name}
//             </Typography>
//             <img 
//               src={`http://localhost:5002/api/image/${product.product_image}`} 
//               alt={product.product_name} 
//               style={{ width: '100%', height: 'auto', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }} 
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell component="th" scope="row">Description</TableCell>
//                     <TableCell><Typography variant="body1" style={{ textAlign: 'justify' }}>{product.product_description}</Typography></TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell component="th" scope="row">Category</TableCell>
//                     <TableCell>{product.category.category_name}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell component="th" scope="row">Subcategory</TableCell>
//                     <TableCell>{product.subcategory.subcategory_name}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell component="th" scope="row">Actual Size</TableCell>
//                     <TableCell>{product.actual_size}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell component="th" scope="row">Filter Size</TableCell>
//                     <TableCell>{product.filter_size}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell component="th" scope="row">Material Type</TableCell>
//                     <TableCell>{product.material_type}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell component="th" scope="row">Amount</TableCell>
//                     <TableCell>₹{product.amount}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell component="th" scope="row">Finish</TableCell>
//                     <TableCell>{product.finish}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell component="th" scope="row">Applications</TableCell>
//                     <TableCell>{product.applications}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell component="th" scope="row">Coverage Area</TableCell>
//                     <TableCell>{product.coverage_area}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell component="th" scope="row">No. of Pcs in Box</TableCell>
//                     <TableCell>{product.no_of_pcs_in_box}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell component="th" scope="row">Weight per Box</TableCell>
//                     <TableCell>{product.weight_in_per_box} kg</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell component="th" scope="row">Date</TableCell>
//                     <TableCell>{new Date(product.product_date).toLocaleDateString()}</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Box marginTop={2}>
//               <Button variant="contained" color="primary" onClick={handleBookNow} style={{ marginLeft: '10px' }}>
//                 Book Now
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//     <Footer />
//     </>
//   );
// };

// export default ProductDetail;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import Footer from './Footer';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/Product/GetProduct/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleBookNow = () => {
    if (isLoggedIn) {
      navigate(`/book/${productId}`);
    } else {
      alert('You must be logged in to book a product.');
      navigate('/login');
    }
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Container>
        <Box marginTop={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                {product.product_name}
              </Typography>
              <img 
                src={`http://localhost:5002/api/image/${product.product_image}`} 
                alt={product.product_name} 
                style={{ width: '100%', height: 'auto', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">Description</TableCell>
                      <TableCell><Typography variant="body1" style={{ textAlign: 'justify' }}>{product.product_description}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Category</TableCell>
                      <TableCell>{product.category.category_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Subcategory</TableCell>
                      <TableCell>{product.subcategory.subcategory_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Actual Size</TableCell>
                      <TableCell>{product.actual_size}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Filter Size</TableCell>
                      <TableCell>{product.filter_size}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Material Type</TableCell>
                      <TableCell>{product.material_type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Amount</TableCell>
                      <TableCell>₹{product.amount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Finish</TableCell>
                      <TableCell>{product.finish}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Applications</TableCell>
                      <TableCell>{product.applications}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Coverage Area</TableCell>
                      <TableCell>{product.coverage_area}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">No. of Pcs in Box</TableCell>
                      <TableCell>{product.no_of_pcs_in_box}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Weight per Box</TableCell>
                      <TableCell>{product.weight_in_per_box} kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Date</TableCell>
                      <TableCell>{new Date(product.product_date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box marginTop={2}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleBookNow} 
                  style={{ marginLeft: '10px' }}
                >
                  Book Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;
