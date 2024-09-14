import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Typography from '@mui/material/Typography'; // Import Typography
import FeedbackIcon from '@mui/icons-material/Feedback';

const OrderTable = ({ bookings, onPayNowClick, onFeedbackOpen }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Complete':
        return { backgroundColor: 'green', color: 'white' };
      default:
        return { backgroundColor: 'red', color: 'white' };
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking._id}</TableCell>
                <TableCell>{booking.address}</TableCell>
                <TableCell>{booking.quantity}</TableCell>
                <TableCell>{booking.amount}</TableCell>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{booking.email}</TableCell>
                <TableCell style={getStatusStyle(booking.status)}>
                  {booking.status}
                </TableCell>
                <TableCell>
                  {booking.status === 'Approve' && (
                    <Button variant="contained" color="primary" onClick={() => onPayNowClick(booking)}>
                      Pay Now
                    </Button>
                  )}
                  {booking.status === 'Delivered' && (
                    <Button
                      variant="contained"
                      startIcon={<FeedbackIcon />}
                      onClick={() => onFeedbackOpen(booking)}
                    >
                      Give Feedback
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Typography>No bookings found for this user.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
