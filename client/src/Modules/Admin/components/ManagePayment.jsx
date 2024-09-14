// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
// import axios from 'axios';

// const ManagePayments = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/Payment/getAllPayments');
//         setPayments(response.data);
//       } catch (error) {
//         console.error('Error fetching payments:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <Paper>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Order ID</TableCell>
//               <TableCell>Transaction ID</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {payments.map((payment) => (
//               <TableRow key={payment._id}>
//                 <TableCell>{payment._id}</TableCell>
//                 <TableCell>{payment.transactionId}</TableCell>
//                 <TableCell>{payment.amount}</TableCell>
//                 <TableCell>{payment.paymentStatus}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// };

// export default ManagePayments;

// ---------30------------
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, Menu, MenuItem } from '@mui/material';
import axios from 'axios';

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPaymentId, setCurrentPaymentId] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/Payment/getAllPayments');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleStatusChange = async (status) => {
    try {
      await axios.put(`http://localhost:5002/api/Payment/updatePayment/${currentPaymentId}`, { paymentStatus: status });
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === currentPaymentId ? { ...payment, paymentStatus: status } : payment
        )
      );
      setAnchorEl(null); // Close the menu
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleClick = (event, paymentId) => {
    setAnchorEl(event.currentTarget);
    setCurrentPaymentId(paymentId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
        <TableHead>
      <TableRow>
        <TableCell 
        
        sx={{
          fontWeight: 'bold',
          fontSize: '1.1rem',
          color: '#6f4f28',
          borderBottom: '2px solid #6f4f28',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
        >Order ID</TableCell>
        <TableCell sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#6f4f28',
        borderBottom: '2px solid #6f4f28',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>Transaction ID</TableCell>
        <TableCell sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#6f4f28',
        borderBottom: '2px solid #6f4f28',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>Amount</TableCell>
        <TableCell sx={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: '#6f4f28',
        borderBottom: '2px solid #6f4f28',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>Status</TableCell>
      </TableRow>
    </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell>{payment._id}</TableCell>
                <TableCell>{payment.transactionId}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.paymentStatus}</TableCell>
                {/* <TableCell>
                  <Button
                    aria-controls="status-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, payment._id)}
                  >
                    Change Status
                  </Button>
                  <Menu
                    id="status-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => handleStatusChange('Paid')}>Paid</MenuItem>
                    <MenuItem onClick={() => handleStatusChange('Failed')}>Failed</MenuItem>
                  </Menu>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ManagePayments;
