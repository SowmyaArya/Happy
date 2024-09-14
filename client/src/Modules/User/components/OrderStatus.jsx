// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Box, Typography, CircularProgress, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stepper, Step, StepLabel, Modal } from '@mui/material';
// import FeedbackIcon from '@mui/icons-material/Feedback';
// import VisibilityIcon from '@mui/icons-material/Visibility';

// const OrderStatus = () => {
//   const { userId } = useParams();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [paymentOpen, setPaymentOpen] = useState(false);
//   const [feedbackOpen, setFeedbackOpen] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [transactionId, setTransactionId] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [thankYouMessage, setThankYouMessage] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
//   const [stepperModalOpen, setStepperModalOpen] = useState(false);
//   const [currentBooking, setCurrentBooking] = useState(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/api/Booking/getBookingsByUserId/${userId}`);
//         setBookings(response.data.bookings);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//         setError('Error fetching bookings');
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, [userId]);

//   useEffect(() => {
//     const deliveredBooking = bookings.some((booking) => booking.status === 'Delivered');
//     setThankYouMessage(deliveredBooking);
//   }, [bookings]);

//   const getStatusStyle = (status) => {
//     const statusColors = {
//       'Processing': '#f0ad4e',
//       'Order Packed': '#5bc0de',
//       'Shipped': '#0275d8',
//       'Delivered': '#5cb85c',
//       'Complete': '#5cb85c',
//       'Cancelled': '#d9534f',
//       'Approved': 'darkgreen',
//       'Paid': 'yellow',
//       'Pending': 'grey'
//     };
//     const color = statusColors[status] || '#ffffff';
//     return { backgroundColor: color, color: 'white' };
//   };

//   const getActiveStep = (status) => {
//     switch (status) {
//       case 'Processing':
//         return 0;
//       case 'Order Packed':
//         return 1;
//       case 'Shipped':
//         return 2;
//       case 'Delivered':
//         return 3;
//       default:
//         return 0;
//     }
//   };

//   const handlePayNowClick = (booking) => {
//     setSelectedBooking(booking);
//     setPaymentOpen(true);
//   };

//   const handleDownloadBill = async (booking) => {
//     try {
//       const response = await axios.get(`http://localhost:5002/api/bill/download/${booking._id}`, {
//         responseType: 'blob',
//       });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'bill.pdf');
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error('Error downloading bill:', error);
//       alert('Failed to download the bill. Please try again later.');
//     }
//   };

//   const handleClosePaymentForm = () => {
//     setPaymentOpen(false);
//     setSelectedBooking(null);
//     setTransactionId('');
//   };

//   const handleSubmitPayment = async () => {
//     try {
//       await axios.post('http://localhost:5002/api/Payment/submitPayment', {
//         orderId: selectedBooking._id,
//         transactionId,
//         amount: selectedBooking.amount
//       });
//       setBookings(bookings.map(booking =>
//         booking._id === selectedBooking._id ? { ...booking, status: 'Complete' } : booking
//       ));
//       handleClosePaymentForm();
//     } catch (error) {
//       console.error('Error submitting payment:', error);
//     }
//   };

//   const handleFeedbackOpen = (booking) => {
//     setSelectedBooking(booking);
//     setFeedbackOpen(true);
//   };

//   const handleFeedbackClose = () => {
//     setFeedbackOpen(false);
//     setSelectedBooking(null);
//   };

//   const handleFeedbackSubmit = async () => {
//     if (!selectedBooking) return;

//     try {
//       const feedbackData = {
//         userId,
//         orderId: selectedBooking._id,
//         productId: selectedBooking.productId,
//         name,
//         email,
//         message: feedback
//       };

//       const response = await axios.post('http://localhost:5002/api/Feedback/submit', feedbackData);

//       if (response.status === 201) {
//         setFeedbackSubmitted(true);
//         alert('Thank you for your feedback!');
//       } else {
//         console.error('Failed to submit feedback');
//       }
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//     } finally {
//       handleFeedbackClose();
//       setName('');
//       setEmail('');
//       setFeedback('');
//     }
//   };

//   const handleViewStepsClick = (booking) => {
//     setCurrentBooking(booking);
//     setStepperModalOpen(true);
//   };

//   const handleCloseStepperModal = () => {
//     setStepperModalOpen(false);
//     setCurrentBooking(null);
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box sx={{ width: '100%', padding: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Order Status
//       </Typography>
//       {thankYouMessage && !feedbackSubmitted && (
//         <Typography variant="h6" sx={{ color: 'green', marginBottom: 2 }}>
//           Thank you for ordering! We hope you enjoyed our service.
//         </Typography>
//       )}
//       {feedbackSubmitted && (
//         <Typography variant="h6" sx={{ color: 'green', marginBottom: 2 }}>
//           Thank you for your feedback!
//         </Typography>
//       )}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Order ID</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <TableRow key={booking._id}>
//                   <TableCell>{booking._id}</TableCell>
//                   <TableCell>{booking.address}</TableCell>
//                   <TableCell>{booking.quantity}</TableCell>
//                   <TableCell>{booking.amount}</TableCell>
//                   <TableCell>{booking.name}</TableCell>
//                   <TableCell>{booking.email}</TableCell>
//                   <TableCell>
//                     <Box
//                       sx={{
//                         padding: 1,
//                         borderRadius: 1,
//                         ...getStatusStyle(booking.status),
//                       }}
//                     >
//                       {booking.status}
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Grid container spacing={2}>
//                       <Grid item>
//                         {booking.status === 'Delivered' && !feedbackSubmitted ? (
//                           <>
//                             <Button
//                               variant="contained"
//                               startIcon={<FeedbackIcon />}
//                               onClick={() => handleFeedbackOpen(booking)}
//                             >
//                               Give Feedback
//                             </Button>
//                             <Button
//                               variant="contained"
//                               onClick={() => handleDownloadBill(booking)}
//                               sx={{ marginTop: 2 }}
//                             >
//                               Download Bill
//                             </Button>
//                           </>
//                         ) : (
//                           <>
//                             {booking.status === 'Complete' ? (
//                               <Button
//                                 variant="contained"
//                                 startIcon={<FeedbackIcon />}
//                                 disabled
//                               >
//                                 Feedback Given
//                               </Button>
//                             ) : (
//                               <Button
//                                 variant="contained"
//                                 onClick={() => handleDownloadBill(booking)}
//                                 sx={{ marginTop: 2 }}
//                               >
//                                 Download Bill
//                               </Button>
//                             )}
//                           </>
//                         )}
//                         <Button
//                           variant="contained"
//                           startIcon={<VisibilityIcon />}
//                           onClick={() => handleViewStepsClick(booking)}
//                           sx={{ marginTop: 2 }}
//                         >
//                           View Steps
//                         </Button>
//                       </Grid>
//                     </Grid>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={8}>No bookings found</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={paymentOpen} onClose={handleClosePaymentForm}>
//         <DialogTitle>Payment Form</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Transaction ID"
//             value={transactionId}
//             onChange={(e) => setTransactionId(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClosePaymentForm} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmitPayment} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={feedbackOpen} onClose={handleFeedbackClose}>
//         <DialogTitle>Give Feedback</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Feedback"
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleFeedbackClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleFeedbackSubmit} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Modal open={stepperModalOpen} onClose={handleCloseStepperModal}>
//         <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: 1, width: '50%', margin: 'auto', marginTop: '10%' }}>
//           {currentBooking && (
//             <Stepper activeStep={getActiveStep(currentBooking.status)} alternativeLabel>
//               <Step>
//                 <StepLabel>Processing</StepLabel>
//               </Step>
//               <Step>
//                 <StepLabel>Order Packed</StepLabel>
//               </Step>
//               <Step>
//                 <StepLabel>Shipped</StepLabel>
//               </Step>
//               <Step>
//                 <StepLabel>Delivered</StepLabel>
//               </Step>
//             </Stepper>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default OrderStatus;
//upper one working code

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stepper, Step, StepLabel,
  Modal, IconButton, Menu, MenuItem
} from '@mui/material';
import QRCode from 'qrcode.react'; // Import QRCode component
import FeedbackIcon from '@mui/icons-material/Feedback';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const OrderStatus = () => {
  const { userId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [thankYouMessage, setThankYouMessage] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [stepperModalOpen, setStepperModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/Booking/getBookingsByUserId/${userId}`);
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        alert('You have not made any bookings yet. Please make a booking to view your status')
        setLoading(false);
      }
    };
    fetchBookings();
  }, [userId]);

  // useEffect(() => {
  //   if (error === 'No Bookings Found') {
  //     alert('You have not made any bookings yet. Please make a booking to view your status')
  //     navigate('/About'); // Navigate to About page
  //   }
  // }, [error, navigate]);

  useEffect(() => {
    const deliveredBooking = bookings.some((booking) => booking.status === 'Delivered');
    setThankYouMessage(deliveredBooking);
  }, [bookings]);

  
  const getStatusStyle = (status) => {
    const statusColors = {
      'Processing': '#f0ad4e',
      'Order Packed': '#5bc0de',
      'Shipped': '#0275d8',
      'Delivered': '#5cb85c',
      'Complete': '#5cb85c',
      'Cancelled': '#d9534f',
      'Approved': 'darkgreen',
      'Paid': 'yellow',
      'Pending': 'grey',
      'Reject': 'red',
    };
    const color = statusColors[status] || '#ffffff';
    return { backgroundColor: color, color: 'white' };
  };

  const getActiveStep = (status) => {
    switch (status) {
      case 'Processing':
        return 0;
      case 'Order Packed':
        return 1;
      case 'Shipped':
        return 2;
      case 'Delivered':
        return 3;
      default:
        return 0;
    }
  };

  const handlePayNowClick = (booking) => {
    setSelectedBooking(booking);
    setPaymentOpen(true);
  };

  const handleGenerateBill = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/bill/GenerateBill');
      window.open(response.request.responseURL, '_blank');
    } catch (error) {
      console.error('Error generating bill:', error);
    }
  };

  const handleClosePaymentForm = () => {
    setPaymentOpen(false);
    setSelectedBooking(null);
    setTransactionId('');
  };

  const handleSubmitPayment = async () => {
    try {
      await axios.post('http://localhost:5002/api/Payment/submitPayment', {
        orderId: selectedBooking._id,
        transactionId,
        amount: selectedBooking.amount
      });
      setBookings(bookings.map(booking =>
        booking._id === selectedBooking._id ? { ...booking, status: 'Complete' } : booking
      ));
      handleClosePaymentForm();
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  const handleFeedbackOpen = (booking) => {
    setSelectedBooking(booking);
    setFeedbackOpen(true);
  };

  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
    setSelectedBooking(null);
  };

  const handleFeedbackSubmit = async () => {
    if (!selectedBooking) return;

    try {
      const feedbackData = {
        userId,
        orderId: selectedBooking._id,
        productId: selectedBooking.productId,
        name,
        email,
        message: feedback
      };

      const response = await axios.post('http://localhost:5002/api/Feedback/submit', feedbackData);

      if (response.status === 201) {
        setFeedbackSubmitted(true);
        alert('Thank you for your feedback!');
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      handleFeedbackClose();
      setName('');
      setEmail('');
      setFeedback('');
    }
  };

  const handleViewStepsClick = (booking) => {
    setCurrentBooking(booking);
    setStepperModalOpen(true);
  };

  const handleCloseStepperModal = () => {
    setStepperModalOpen(false);
    setCurrentBooking(null);
  };

  const handleMenuClick = (event, booking) => {
    setSelectedBooking(booking);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;


  
  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
};
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h4" gutterBottom style={{color:'#19334d'}}>
        Order Status
      </Typography>
      {thankYouMessage && !feedbackSubmitted && (
        <Typography variant="h6" sx={{ color: 'green', marginBottom: 2 }}>
          Thank you for ordering! We hope you enjoyed our service.
        </Typography>
      )}
      {feedbackSubmitted && (
        <Typography variant="h6" sx={{ color: 'green', marginBottom: 2 }}>
          Thank you for your feedback!
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ 
        color: '#19334d', // Coffee brown color
        fontSize: '16px', // Font size
        fontWeight: 'bold', // Bold text
        borderBottom: '2px solid #19334d' // Optional: Add a bottom border to match the color
      }}>
            <TableRow>
              <TableCell sx={{ 
        color: '#19334d', // Coffee brown color
        fontSize: '16px', // Font size
        fontWeight: 'bold', // Bold text
        borderBottom: '2px solid #19334d' // Optional: Add a bottom border to match the color
      }}>Order ID</TableCell>
              <TableCell sx={{ 
        color: '#19334d', // Coffee brown color
        fontSize: '16px', // Font size
        fontWeight: 'bold', // Bold text
        borderBottom: '2px solid #19334d' // Optional: Add a bottom border to match the color
      }}>Address</TableCell>
              <TableCell sx={{ 
        color: '#19334d', // Coffee brown color
        fontSize: '16px', // Font size
        fontWeight: 'bold', // Bold text
        borderBottom: '2px solid #19334d' // Optional: Add a bottom border to match the color
      }}>Quantity</TableCell>
              <TableCell sx={{ 
        color: '#19334d', // Coffee brown color
        fontSize: '16px', // Font size
        fontWeight: 'bold', // Bold text
        borderBottom: '2px solid #19334d' // Optional: Add a bottom border to match the color
      }}>Amount</TableCell>
              <TableCell sx={{ 
        color: '#19334d', // Coffee brown color
        fontSize: '16px', // Font size
        fontWeight: 'bold', // Bold text
        borderBottom: '2px solid #19334d' // Optional: Add a bottom border to match the color
      }}>Name</TableCell>
              <TableCell sx={{ 
        color: '#19334d', // Coffee brown color
        fontSize: '16px', // Font size
        fontWeight: 'bold', // Bold text
        borderBottom: '2px solid #19334d' // Optional: Add a bottom border to match the color
      }}>Email</TableCell>
              <TableCell sx={{ 
        color: '#19334d', // Coffee brown color
        fontSize: '16px', // Font size
        fontWeight: 'bold', // Bold text
        borderBottom: '2px solid #19334d' // Optional: Add a bottom border to match the color
      }}>Status</TableCell>
              <TableCell sx={{ 
        color: '#19334d', // Coffee brown color
        fontSize: '16px', // Font size
        fontWeight: 'bold', // Bold text
        borderBottom: '2px solid #19334d' // Optional: Add a bottom border to match the color
      }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking._id}</TableCell>
                  <TableCell>
                    {booking.shippingAddress ? (
                      <>
                        {booking.shippingAddress.streetAddress}, {booking.shippingAddress.city}, {booking.shippingAddress.stateProvince}, {booking.shippingAddress.zipPostalCode}, {booking.shippingAddress.country}
                      </>
                    ) : (
                      'Address not available'
                    )}
                  </TableCell>
                  <TableCell>{booking.quantity}</TableCell>
                  <TableCell>₹{booking.amount.toFixed(2)}</TableCell>
                  <TableCell>{booking.fullName}</TableCell>
                  <TableCell>{booking.emailAddress}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        padding: 1,
                        borderRadius: 1,
                        ...getStatusStyle(booking.status),
                      }}
                    >
                      {booking.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuClick(e, booking)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedBooking?._id === booking._id}
                      onClose={handleMenuClose}
                      PaperProps={{
                        style: {
                          maxHeight: 200,
                          width: '20ch',
                        },
                      }}
                    >
                      {booking.status === 'Delivered' && !feedbackSubmitted ? (
                        <MenuItem onClick={() => handleFeedbackOpen(booking)}>
                          <FeedbackIcon sx={{ marginRight: 1 }} />
                          Give Feedback
                        </MenuItem>
                      ) : (
                        booking.status === 'Complete' && (
                          <MenuItem disabled>
                            <FeedbackIcon sx={{ marginRight: 1 }} />
                            Feedback Given
                          </MenuItem>
                        )
                      )}
                      <MenuItem onClick={() => handleViewStepsClick(booking)}>
                        <VisibilityIcon sx={{ marginRight: 1 }} />
                        View Steps
                      </MenuItem>
                      {booking.status === 'Delivered' && (
                        <MenuItem onClick={handleGenerateBill}>
                          <VisibilityIcon sx={{ marginRight: 1 }} />
                          Download Bill
                        </MenuItem>
                      )}
                      {booking.status === 'Approved' && (
                        <MenuItem onClick={() => handlePayNowClick(booking)}>
                          <VisibilityIcon sx={{ marginRight: 1 }} />
                          Pay Now
                        </MenuItem>
                      )}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" style={{fontSize:'20px'}}>
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payment Form Modal */}
      <Modal open={paymentOpen} onClose={handleClosePaymentForm}>
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }}>
    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
      Payment Form
    </Typography>
    <TextField
      label="Transaction ID"
      fullWidth
      margin="normal"
      value={transactionId}
      onChange={(e) => setTransactionId(e.target.value)}
    />
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <QRCode value={`upi://pay?pa=your-upi-id&pn=Your+Name&am=${selectedBooking?.amount}&cu=INR`} size={256} />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Scan the QR code to pay ₹{selectedBooking?.amount}
      </Typography>
    </Box>
    <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmitPayment}>
      Submit Payment
    </Button>
  </Box>
</Modal>

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} onClose={handleFeedbackClose}>
        <DialogTitle>Give Feedback</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Feedback"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFeedbackClose}>Cancel</Button>
          <Button onClick={handleFeedbackSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Stepper Modal */}
      {/* Stepper Modal */}
      <Modal open={stepperModalOpen} onClose={handleCloseStepperModal}>
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,  // Increased width
    height: 300,  // Increased height
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 8,  // Increased padding
  }}>
    <Stepper activeStep={getActiveStep(currentBooking?.status)} alternativeLabel sx={{ width: '100%', px: 4 }}>
      {['Processing', 'Order Packed', 'Shipped', 'Delivered'].map((label) => (
        <Step key={label}>
          <StepLabel sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{label}</StepLabel>  
        </Step>
      ))}
    </Stepper>
  </Box>
</Modal>


    </Box>
  );
};

export default OrderStatus;
