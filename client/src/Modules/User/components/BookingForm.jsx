// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Box, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const BookingForm = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [amount, setAmount] = useState(0);

//   const userId = localStorage.getItem("userId"); // Get userId from localStorage

//   useEffect(() => {
//     if (!userId) {
//       navigate("/login"); // Redirect to login if userId is not found
//     }

//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/api/Product/GetProduct/${productId}`);
//         const fetchedProduct = response.data;
//         setProduct(fetchedProduct);
//         setTotalAmount((Number(fetchedProduct.amount) || 0) * quantity);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//         setError('Error fetching product details');
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [productId, quantity, navigate, userId]);

//   useEffect(() => {
//     if (product) {
//       const amount = Number(product.amount) || 0;
//       setTotalAmount(amount * quantity);
//     }
//   }, [product, quantity]);

//   const handleQuantityChange = (e) => {
//     const qty = parseInt(e.target.value, 10) || 1;
//     setQuantity(qty);
//   };

//  // Define the function only once
// // Updated validation function for MongoDB ObjectID
// const isValidUserId = (userId) => /^[0-9a-fA-F]{24}$/.test(userId);

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // Assume storedUserId is fetched from localStorage
//   const storedUserId = localStorage.getItem('userId');

//   if (!storedUserId || !isValidUserId(storedUserId)) {
//     console.error('Invalid or missing User ID');
//     setError('Invalid or missing User ID');
//     return;
//   }

//   const bookingData = {
//     productId,
//     quantity,
//     amount: totalAmount,
//     name,
//     email,
//     phone,
//     address,
//     userId: storedUserId // Correctly use storedUserId
//   };

//   try {
//     const response = await fetch('http://localhost:5002/api/Booking/createBooking', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(bookingData),
//     });

//     const result = await response.json();
//     if (!response.ok) {
//       throw new Error(result.message);
//     }

//     console.log('Booking successful:', result);
//   } catch (error) {
//     console.error('Error submitting booking:', error);
//   }
// };


  
 
  
  

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <Container>
//       <Box marginTop={2}>
//         <Typography variant="h4">Book Product</Typography>
//         <Box marginTop={2}>
//           <TextField
//             label="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             fullWidth
//             required
//           />
//         </Box>
//         <Box marginTop={2}>
//           <TextField
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             required
//           />
//         </Box>
//         <Box marginTop={2}>
//           <TextField
//             label="Phone"
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             fullWidth
//             required
//           />
//         </Box>
//         <Box marginTop={2}>
//           <TextField
//             label="Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             fullWidth
//             required
//           />
//         </Box>
//         <Box marginTop={2}>
//           <TextField
//             label="Quantity"
//             type="number"
//             value={quantity}
//             onChange={handleQuantityChange}
//             InputProps={{ inputProps: { min: 1 } }}
//             fullWidth
//             required
//           />
//         </Box>
//         <Box marginTop={2}>
//           <Typography variant="h6">
//             Total Amount: ₹{totalAmount.toFixed(2)}
//           </Typography>
//         </Box>
//         <Box marginTop={2}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             disabled={submitting}
//           >
//             {submitting ? 'Submitting...' : 'Confirm Booking'}
//           </Button>
//         </Box>
//       </Box>

//       <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
//         <Alert onClose={() => setSuccess(false)} severity="success">
//           Booking successful!
//         </Alert>
//       </Snackbar>

//       <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
//         <Alert onClose={() => setError(null)} severity="error">
//           {error}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default BookingForm;

// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Box, TextField, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const BookingForm = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [bookingId, setBookingId] = useState(''); // State to hold the booking ID

//   const userId = localStorage.getItem("userId"); // Get userId from localStorage

//   useEffect(() => {
//     if (!userId) {
//       navigate("/login"); // Redirect to login if userId is not found
//     }

//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/api/Product/GetProduct/${productId}`);
//         const fetchedProduct = response.data;
//         setProduct(fetchedProduct);
//         setTotalAmount((Number(fetchedProduct.amount) || 0) * quantity);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//         setError('Error fetching product details');
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [productId, quantity, navigate, userId]);

//   useEffect(() => {
//     if (product) {
//       const amount = Number(product.amount) || 0;
//       setTotalAmount(amount * quantity);
//     }
//   }, [product, quantity]);

//   const handleQuantityChange = (e) => {
//     const qty = parseInt(e.target.value, 10) || 1;
//     setQuantity(qty);
//   };

//   // Updated validation function for MongoDB ObjectID
//   const isValidUserId = (userId) => /^[0-9a-fA-F]{24}$/.test(userId);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const storedUserId = localStorage.getItem('userId');
  
//     if (!storedUserId || !isValidUserId(storedUserId)) {
//       console.error('Invalid or missing User ID');
//       setError('Invalid or missing User ID');
//       return;
//     }
  
//     const bookingData = {
//       productId,
//       quantity,
//       amount: totalAmount,
//       name,
//       email,
//       phone,
//       address,
//       userId: storedUserId
//     };
  
//     try {
//       const response = await fetch('http://localhost:5002/api/Booking/createBooking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });
  
//       const result = await response.json();
//       if (!response.ok) {
//         throw new Error(result.message);
//       }
  
//       console.log('Booking successful:', result);
//       setBookingId(result.booking._id); // Capture the booking ID
//       setSuccess(true); // Show the success dialog
  
//     } catch (error) {
//       console.error('Error submitting booking:', error);
//       setError('Error submitting booking');
//     }
//   };

//   const handleSuccessClose = () => {
//     setSuccess(false);
//     navigate(`/ViewOrderStatus/user/${userId}`); // Navigate to ViewOrderStatus
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <Container>
//       <Box marginTop={2}>
//         <Typography variant="h4">Book Product</Typography>
//         <Box marginTop={2}>
//           <TextField
//             label="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             fullWidth
//             required
//           />
//         </Box>
//         <Box marginTop={2}>
//           <TextField
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             required
//           />
//         </Box>
//         <Box marginTop={2}>
//           <TextField
//             label="Phone"
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             fullWidth
//             required
//           />
//         </Box>
//         <Box marginTop={2}>
//           <TextField
//             label="Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             fullWidth
//             required
//           />
//         </Box>
//         <Box marginTop={2}>
//           <TextField
//             label="Quantity"
//             type="number"
//             value={quantity}
//             onChange={handleQuantityChange}
//             InputProps={{ inputProps: { min: 1 } }}
//             fullWidth
//             required
//           />
//         </Box>
//         <Box marginTop={2}>
//           <Typography variant="h6">
//             Total Amount: ₹{totalAmount.toFixed(2)}
//           </Typography>
//         </Box>
//         <Box marginTop={2}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             disabled={submitting}
//           >
//             {submitting ? 'Submitting...' : 'Confirm Booking'}
//           </Button>
//         </Box>
//       </Box>

//       <Dialog open={success} onClose={handleSuccessClose}>
//         <DialogTitle>Booking Successful</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Your booking was successful!
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleSuccessClose} color="primary">
//             OK
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
//         <Alert onClose={() => setError(null)} severity="error">
//           {error}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default BookingForm;

// up right 6-today
// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Box, TextField, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Grid } from '@mui/material';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const BookingForm = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [fullName, setFullName] = useState('');
//   const [emailAddress, setEmailAddress] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [streetAddress, setStreetAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [stateProvince, setStateProvince] = useState('');
//   const [zipPostalCode, setZipPostalCode] = useState('');
//   const [country, setCountry] = useState('');

//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!userId) {
//       navigate("/login");
//     }

//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/api/Product/GetProduct/${productId}`);
//         const fetchedProduct = response.data;
//         setProduct(fetchedProduct);
//         setTotalAmount((Number(fetchedProduct.amount) || 0) * quantity);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//         setError(error.response?.data?.message || 'Error fetching product details');
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [productId, quantity, navigate, userId]);

//   useEffect(() => {
//     if (product) {
//       const amount = Number(product.amount) || 0;
//       setTotalAmount(amount * quantity);
//     }
//   }, [product, quantity]);

//   const handleQuantityChange = (e) => {
//     const qty = parseInt(e.target.value, 10) || 1;
//     setQuantity(qty);
//   };

//   const isValidUserId = (userId) => /^[0-9a-fA-F]{24}$/.test(userId);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const storedUserId = localStorage.getItem('userId');

//     if (!storedUserId || !isValidUserId(storedUserId)) {
//       setError('Invalid or missing User ID');
//       setSubmitting(false);
//       return;
//     }

//     const bookingData = {
//       productId,
//       quantity,
//       amount: totalAmount,
//       fullName,
//       emailAddress,
//       phoneNumber,
//       shippingAddress: {
//         streetAddress,
//         city,
//         stateProvince,
//         zipPostalCode,
//         country
//       },
//       userId: storedUserId
//     };

//     try {
//       const response = await fetch('http://localhost:5002/api/Booking/createBooking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       const result = await response.json();
//       if (!response.ok) {
//         throw new Error(result.message || 'Unknown error');
//       }

//       setSuccess(true);
//     } catch (error) {
//       console.error('Error submitting booking:', error);
//       setError(error.message || 'Error submitting booking');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleSuccessClose = () => {
//     setSuccess(false);
//     navigate(`/ViewOrderStatus/user/${userId}`);
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <Container>
//       <Box marginTop={4} padding={3} borderRadius={2} boxShadow={3} bgcolor="#f9f9f9">
//         <Typography variant="h4" color="primary" gutterBottom>Product Booking Form</Typography>
//         <Typography variant="h6" color="textSecondary" paragraph>Fill out the details below to book your product.</Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               fullWidth
//               required
//               inputProps={{ pattern: "[A-Za-z ]{1,50}" }}
//               helperText="Enter your full name (max 50 characters), only letters and spaces allowed"
//               error={!!error && !fullName}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Email Address"
//               type="email"
//               value={emailAddress}
//               onChange={(e) => setEmailAddress(e.target.value)}
//               fullWidth
//               required
//               inputProps={{ pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" }}
//               helperText="Enter a valid email address"
//               error={!!error && !emailAddress}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Phone Number"
//               type="text"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               fullWidth
//               required
//               inputProps={{ pattern: "\\d{10}" }}
//               helperText="Enter a 10-digit phone number"
//               error={!!error && !phoneNumber}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Street Address"
//               value={streetAddress}
//               onChange={(e) => setStreetAddress(e.target.value)}
//               fullWidth
//               required
//               inputProps={{ pattern: "[A-Za-z0-9 ,]{1,100}" }}
//               helperText="Enter your street address (max 100 characters)"
//               error={!!error && !streetAddress}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="City"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               fullWidth
//               required
//               inputProps={{ pattern: "[A-Za-z ]{1,50}" }}
//               helperText="Enter your city (max 50 characters), only letters and spaces allowed"
//               error={!!error && !city}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="State/Province"
//               value={stateProvince}
//               onChange={(e) => setStateProvince(e.target.value)}
//               fullWidth
//               required
//               inputProps={{ pattern: "[A-Za-z ]{1,50}" }}
//               helperText="Enter your state or province (max 50 characters), only letters and spaces allowed"
//               error={!!error && !stateProvince}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Zip/Postal Code"
//               value={zipPostalCode}
//               onChange={(e) => setZipPostalCode(e.target.value)}
//               fullWidth
//               required
//               inputProps={{ pattern: "\\d{5}(-\\d{4})?" }}
//               helperText="Enter a 5-digit zip code (optional 4-digit extension)"
//               error={!!error && !zipPostalCode}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Country"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               fullWidth
//               required
//               inputProps={{ pattern: "[A-Za-z ]{1,50}" }}
//               helperText="Enter your country (max 50 characters), only letters and spaces allowed"
//               error={!!error && !country}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Quantity"
//               type="number"
//               value={quantity}
//               onChange={handleQuantityChange}
//               InputProps={{ inputProps: { min: 1 } }}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="h6">
//               Total Amount: ₹{totalAmount.toFixed(2)}
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               disabled={submitting}
//               fullWidth
//             >
//               {submitting ? 'Submitting...' : 'Confirm Booking'}
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       <Dialog open={success} onClose={handleSuccessClose}>
//         <DialogTitle>Booking Successful</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Your booking was successful!
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleSuccessClose} color="primary">
//             OK
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
//         <Alert onClose={() => setError(null)} severity="error">
//           {error}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default BookingForm;

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Grid } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [zipPostalCode, setZipPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/Product/GetProduct/${productId}`);
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);
        setTotalAmount((Number(fetchedProduct.amount) || 0) * quantity);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError(error.response?.data?.message || 'Error fetching product details');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, quantity, navigate, userId]);

  useEffect(() => {
    if (product) {
      const amount = Number(product.amount) || 0;
      setTotalAmount(amount * quantity);
    }
  }, [product, quantity]);

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10) || 1;
    setQuantity(qty);
  };

  const isValidUserId = (userId) => /^[0-9a-fA-F]{24}$/.test(userId);

  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'fullName':
        errorMessage = /^[A-Za-z ]{1,50}$/.test(value) ? '' : 'Enter a valid full name (max 50 characters), only letters and spaces allowed';
        break;
      case 'emailAddress':
        errorMessage = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? '' : 'Enter a valid email address';
        break;
      case 'phoneNumber':
        errorMessage = /^\d{10}$/.test(value) ? '' : 'Enter a 10-digit phone number';
        break;
      case 'streetAddress':
        errorMessage = /^[A-Za-z0-9 ,]{1,100}$/.test(value) ? '' : 'Enter a valid street address (max 100 characters)';
        break;
      case 'city':
        errorMessage = /^[A-Za-z ]{1,50}$/.test(value) ? '' : 'Enter a valid city (max 50 characters), only letters and spaces allowed';
        break;
      case 'stateProvince':
        errorMessage = /^[A-Za-z ]{1,50}$/.test(value) ? '' : 'Enter a valid state or province (max 50 characters), only letters and spaces allowed';
        break;
      case 'zipPostalCode':
        errorMessage = /^\d{5}(-\d{4})?$/.test(value) ? '' : 'Enter a 5-digit zip code (optional 4-digit extension)';
        break;
      case 'country':
        errorMessage = /^[A-Za-z ]{1,50}$/.test(value) ? '' : 'Enter a valid country (max 50 characters), only letters and spaces allowed';
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    switch (name) {
      case 'fullName':
        setFullName(value);
        break;
      case 'emailAddress':
        setEmailAddress(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'streetAddress':
        setStreetAddress(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'stateProvince':
        setStateProvince(value);
        break;
      case 'zipPostalCode':
        setZipPostalCode(value);
        break;
      case 'country':
        setCountry(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const storedUserId = localStorage.getItem('userId');

    if (!storedUserId || !isValidUserId(storedUserId)) {
      setError('Invalid or missing User ID');
      setSubmitting(false);
      return;
    }

    const bookingData = {
      productId,
      quantity,
      amount: totalAmount,
      fullName,
      emailAddress,
      phoneNumber,
      shippingAddress: {
        streetAddress,
        city,
        stateProvince,
        zipPostalCode,
        country
      },
      userId: storedUserId
    };

    try {
      const response = await fetch('http://localhost:5002/api/Booking/createBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Unknown error');
      }

      setSuccess(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setError(error.message || 'Error submitting booking');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccess(false);
  };

  const handleViewStatus = () => {
    navigate(`/OrderStatus/${userId}`);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Box marginTop={4} padding={3} borderRadius={2} boxShadow={3} bgcolor="#f9f9f9">
        <Typography variant="h4" color="primary" gutterBottom>Product Booking Form</Typography>
        <Typography variant="h6" color="textSecondary" paragraph>Fill out the details below to book your product.</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              name="fullName"
              value={fullName}
              onChange={handleChange}
              fullWidth
              required
              error={!!formErrors.fullName}
              helperText={formErrors.fullName || "Enter your full name (max 50 characters), only letters and spaces allowed"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Address"
              name="emailAddress"
              type="email"
              value={emailAddress}
              onChange={handleChange}
              fullWidth
              required
              error={!!formErrors.emailAddress}
              helperText={formErrors.emailAddress || "Enter a valid email address"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={handleChange}
              fullWidth
              required
              error={!!formErrors.phoneNumber}
              helperText={formErrors.phoneNumber || "Enter a 10-digit phone number"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Street Address"
              name="streetAddress"
              value={streetAddress}
              onChange={handleChange}
              fullWidth
              required
              error={!!formErrors.streetAddress}
              helperText={formErrors.streetAddress || "Enter your street address (max 100 characters)"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              value={city}
              onChange={handleChange}
              fullWidth
              required
              error={!!formErrors.city}
              helperText={formErrors.city || "Enter your city (max 50 characters), only letters and spaces allowed"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State/Province"
              name="stateProvince"
              value={stateProvince}
              onChange={handleChange}
              fullWidth
              required
              error={!!formErrors.stateProvince}
              helperText={formErrors.stateProvince || "Enter your state or province (max 50 characters), only letters and spaces allowed"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip/Postal Code"
              name="zipPostalCode"
              value={zipPostalCode}
              onChange={handleChange}
              fullWidth
              required
              error={!!formErrors.zipPostalCode}
              helperText={formErrors.zipPostalCode || "Enter a 5-digit zip code (optional 4-digit extension)"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              name="country"
              value={country}
              onChange={handleChange}
              fullWidth
              required
              error={!!formErrors.country}
              helperText={formErrors.country || "Enter your country (max 50 characters), only letters and spaces allowed"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              InputProps={{ inputProps: { min: 1 } }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Total Amount: ₹{totalAmount.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={submitting}
              fullWidth
            >
              {submitting ? 'Submitting...' : 'Confirm Booking'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={success} onClose={handleSuccessClose}>
        <DialogTitle>Booking Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your booking was successful!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewStatus} color="primary">
            View Status
          </Button>
          <Button onClick={handleGoHome} color="primary">
            Go to Home
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookingForm;
