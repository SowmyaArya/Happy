


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const status = () => {
  const { bookingId } = useParams(); // Get booking ID from URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/Booking/getBookingById/${bookingId}`);
        setBooking(response.data.booking); // Ensure response data structure matches
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setError('Error fetching booking');
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4">View Order Status</Typography>
      {booking && (
        <Box marginTop={2}>
          <Typography variant="h6">Order ID: {booking._id}</Typography>
          <Typography>Status: {booking.status}</Typography>
          <Typography>Quantity: {booking.quantity}</Typography>
          <Typography>Amount: {booking.amount}</Typography>
          <Typography>Name: {booking.name}</Typography>
          <Typography>Email: {booking.email}</Typography>
          <Typography>Address: {booking.address}</Typography>
          {/* Add more details if needed */}
        </Box>
      )}
    </Box>
  );
};



export default status;
