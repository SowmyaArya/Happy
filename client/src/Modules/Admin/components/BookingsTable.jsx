// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Select, MenuItem } from '@mui/material';
// import axios from 'axios';

// const BookingsTable = () => {
//   const [bookings, setBookings] = useState([]);
//   const [status, setStatus] = useState('');
//   const [selectedBookingId, setSelectedBookingId] = useState('');
//   const [showGenerateBill, setShowGenerateBill] = useState(false);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/Booking/getAllBookings');
//         setBookings(response.data);
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       }
//     };
//     fetchBookings();
//   }, []);

//   const handleStatusChange = (id, newStatus) => {
//     setSelectedBookingId(id);
//     setStatus(newStatus);
//   };

//   const updateStatus = async () => {
//     if (!status) return;

//     try {
//       await axios.put(`http://localhost:5002/api/Booking/updateBookingStatus/${selectedBookingId}/status`, { status });
//       const response = await axios.get('http://localhost:5002/api/Booking/getAllBookings');
//       setBookings(response.data);

//       const deliveredBookings = response.data.some(booking => booking.status === 'Delivered');
//       setShowGenerateBill(deliveredBookings);

//       setStatus('');
//       setSelectedBookingId('');
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const handleGenerateBill = async () => {
//     try {
//       const response = await axios.get('http://localhost:5002/api/bill/GenerateBill');
//       window.open(response.request.responseURL, '_blank');
//     } catch (error) {
//       console.error('Error generating bill:', error);
//     }
//   };

//   return (
//     <Paper>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {bookings.map((booking) => (
//               <TableRow key={booking._id}>
//                 <TableCell>{booking.name}</TableCell>
//                 <TableCell>{booking.email}</TableCell>
//                 <TableCell>{booking.phone}</TableCell>
//                 <TableCell>{booking.address}</TableCell>
//                 <TableCell>{booking.quantity}</TableCell>
//                 <TableCell>₹{booking.amount.toFixed(2)}</TableCell>
//                 <TableCell style={getStatusStyle(booking.status)}>
//                   {booking.status}
//                 </TableCell>
//                 <TableCell>
//                   {booking.status === 'Delivered' ? (
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={handleGenerateBill}
//                     >
//                       Generate Bill
//                     </Button>
//                   ) : (
//                     selectedBookingId === booking._id ? (
//                       <>
//                         <Select
//                           value={status}
//                           onChange={(e) => setStatus(e.target.value)}
//                           displayEmpty
//                           fullWidth
//                           style={{ width: 150 }}
//                         >
//                           <MenuItem value="Processing">Processing</MenuItem>
//                           <MenuItem value="Order Packed">Order Packed</MenuItem>
//                           <MenuItem value="Shipped">Shipped</MenuItem>
//                           <MenuItem value="Delivered">Delivered</MenuItem>
//                           <MenuItem value="Approved">Approved</MenuItem>
//                           <MenuItem value="Reject">Reject</MenuItem>
//                         </Select>
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           onClick={updateStatus}
//                           disabled={!status}
//                           style={{ marginLeft: 8 }}
//                         >
//                           Update
//                         </Button>
//                       </>
//                     ) : (
//                       <Button
//                         variant="outlined"
//                         color="primary"
//                         onClick={() => handleStatusChange(booking._id, booking.status)}
//                       >
//                         Edit Status
//                       </Button>
//                     )
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// };

// const getStatusStyle = (status) => {
//   switch (status) {
//     case 'Processing':
//       return { backgroundColor: 'yellow', color: 'black' };
//     case 'Order Packed':
//       return { backgroundColor: 'blue', color: 'white' };
//     case 'Shipped':
//       return { backgroundColor: 'orange', color: 'white' };
//     case 'Delivered':
//       return { backgroundColor: 'green', color: 'white' };
//     case 'Approved':
//       return { backgroundColor: 'Orange', color: 'white' };
//     default:
//       return { backgroundColor: 'grey', color: 'white' };
//   }
// };

// export default BookingsTable;

//working code up
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState(''); // Initialize to empty string
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [showGenerateBill, setShowGenerateBill] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/Booking/getAllBookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const handleStatusChange = (id, currentStatus) => {
    setSelectedBookingId(id);
    setStatus(currentStatus === 'Paid' || currentStatus === 'Pending' ? 'Processing' : currentStatus || 'Processing');
  };

  const updateStatus = async () => {
    if (!status) return;

    try {
      await axios.put(`http://localhost:5002/api/Booking/updateBookingStatus/${selectedBookingId}/status`, { status });
      const response = await axios.get('http://localhost:5002/api/Booking/getAllBookings');
      setBookings(response.data);

      const deliveredBookings = response.data.some(booking => booking.status === 'Delivered');
      setShowGenerateBill(deliveredBookings);

      setStatus(''); // Reset status to empty string
      setSelectedBookingId('');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleGenerateBill = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/bill/GenerateBill');
      window.open(response.request.responseURL, '_blank');
    } catch (error) {
      console.error('Error generating bill:', error);
    }
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>Full Name</TableCell>
              <TableCell sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>Email</TableCell>
              <TableCell sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>Phone</TableCell>
              <TableCell sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>Address</TableCell>
              <TableCell sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>Quantity</TableCell>
              <TableCell sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>Amount</TableCell>
              <TableCell sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>Status</TableCell>
              <TableCell sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#19334d',
        borderBottom: '2px solid #19334d',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.fullName}</TableCell>
                <TableCell>{booking.emailAddress}</TableCell>
                <TableCell>{booking.phoneNumber}</TableCell>
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
                <TableCell style={getStatusStyle(booking.status)}>
                  {booking.status}
                </TableCell>
                <TableCell>
                  {booking.status === 'Delivered' ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleGenerateBill}
                    >
                      Generate Bill
                    </Button>
                  ) : (
                    selectedBookingId === booking._id ? (
                      <>
                        <Select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          displayEmpty
                          fullWidth
                          style={{ width: 150 }}
                        >
                          <MenuItem value="Approved">Approved</MenuItem>
                          <MenuItem value="Processing">Processing</MenuItem>
                          <MenuItem value="Order Packed">Order Packed</MenuItem>
                          <MenuItem value="Shipped">Shipped</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                        </Select>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={updateStatus}
                          disabled={!status}
                          style={{ marginLeft: 8 }}
                        >
                          Update
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleStatusChange(booking._id, booking.status)}
                      >
                        Edit Status
                      </Button>
                    )
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'Processing':
      return { backgroundColor: 'yellow', color: 'black' };
    case 'Order Packed':
      return { backgroundColor: 'blue', color: 'white' };
    case 'Shipped':
      return { backgroundColor: 'orange', color: 'white' };
    case 'Delivered':
      return { backgroundColor: 'green', color: 'white' };
    case 'Approved':
      return { backgroundColor: 'orange', color: 'white' };
    default:
      return { backgroundColor: 'grey', color: 'white' };
  }
};

export default BookingsTable;
