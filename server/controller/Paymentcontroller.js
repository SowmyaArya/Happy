// // controller/Paymentcontroller.js
// const Payment = require('../model/Payment_model');
// const Booking = require('../model/Booking_model');

// exports.submitPayment = async (req, res) => {
//   try {
//     const { orderId, transactionId, amount } = req.body;

//     // Verify the booking
//     const booking = await Booking.findById(orderId);
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     // Create a new payment record
//     const payment = new Payment({
//       orderId,
//       transactionId,
//       amount,
//       paymentStatus: 'Completed', // Or logic to determine the status
//     });

//     await payment.save();

//     // Optionally, update the booking status
//     booking.status = 'Paid'; // Update status as needed
//     await booking.save();

//     res.status(201).json({ message: 'Payment submitted successfully', payment });
//   } catch (error) {
//     console.error('Error submitting payment:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// exports.getAllPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find().populate('orderId');
//     res.json(payments);
//   } catch (error) {
//     console.error('Error fetching payments:', error);
//     res.status(500).json({ message: error.message });
//   }
// };


// -------------30---------------
const Payment = require('../model/Payment_model');
const Booking = require('../model/Booking_model');

exports.submitPayment = async (req, res) => {
  try {
    const { orderId, transactionId, amount } = req.body;

    // Verify the booking
    const booking = await Booking.findById(orderId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Create a new payment record
    const payment = new Payment({
      orderId,
      transactionId,
      amount,
      paymentStatus: 'Completed', // Or logic to determine the status
    });

    await payment.save();

    // Optionally, update the booking status
    booking.status = 'Paid'; // Update status as needed
    await booking.save();

    res.status(201).json({ message: 'Payment submitted successfully', payment });
  } catch (error) {
    console.error('Error submitting payment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('orderId');
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: error.message });
  }
};

// New endpoint for updating payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { paymentStatus } = req.body;

    // Validate payment status
    if (!['Paid', 'Failed'].includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    // Find and update the payment
    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { paymentStatus },
      { new: true } // Return the updated document
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Optionally, update related booking status if needed
    const booking = await Booking.findById(payment.orderId);
    if (booking) {
      booking.status = paymentStatus === 'Pending' ? 'Paid' : 'Failed';
      await booking.save();
    }

    res.json({ message: 'Payment status updated successfully', payment });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
