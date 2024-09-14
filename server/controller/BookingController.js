// const mongoose = require('mongoose');
// const Booking = require('../model/Booking_model'); // Ensure this path is correct

// // Define createBooking function
// const createBooking = async (req, res) => {
//   try {
//     const { productId, quantity, amount, name, email, phone, address, userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({ success: false, message: 'User ID is required' });
//     }

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: 'Invalid User ID format' });
//     }

//     const newBooking = new Booking({
//       productId,
//       quantity,
//       amount,
//       name,
//       email,
//       phone,
//       address,
//       userId:userId
//     });

//     await newBooking.save();
//     res.status(201).json({ success: true, message: 'Booking created successfully', booking: newBooking });
//   } catch (error) {
//     console.error('Error creating booking:', error); // Improved logging
//     res.status(500).json({ success: false, message: 'Error creating booking', details: error.message });
//   }
// };


// // Define getAllBookings function
// const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     res.status(500).json({ success: false, message: 'Error fetching bookings', details: error.message });
//   }
// };

// // Define updateBookingStatus function
// const updateBookingStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: 'Invalid Booking ID format' });
//     }

//     const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'Booking not found' });
//     }

//     res.status(200).json({ success: true, message: 'Booking status updated successfully', booking });
//   } catch (error) {
//     console.error('Error updating booking status:', error);
//     res.status(500).json({ success: false, message: 'Error updating booking status', details: error.message });
//   }
// };

// // In your BookingController.js
// // const getBookingById = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     if (!mongoose.Types.ObjectId.isValid(id)) {
// //       return res.status(400).json({ success: false, message: 'Invalid Booking ID format' });
// //     }

// //     const booking = await Booking.findById(id);

// //     if (!booking) {
// //       return res.status(404).json({ success: false, message: 'Booking not found' });
// //     }

// //     res.status(200).json({ success: true, booking });
// //   } catch (error) {
// //     console.error('Error fetching booking:', error);
// //     res.status(500).json({ success: false, message: 'Error fetching booking', details: error.message });
// //   }
// // };

// const getBookingById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: 'Invalid Booking ID format' });
//     }

//     const booking = await Booking.findById(id);
//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'Booking not found' });
//     }

//     res.status(200).json({ success: true, booking });
//   } catch (error) {
//     console.error('Error fetching booking:', error);
//     res.status(500).json({ success: false, message: 'Error fetching booking', details: error.message });
//   }
// };

// module.exports = {
//   getBookingById,
//   // other exports
// };
// // Define getBookingsByUserId function
// const getBookingsByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: 'Invalid User ID format' });
//     }

//     const bookings = await Booking.find({ userId });

//     if (bookings.length === 0) {
//       return res.status(404).json({ success: false, message: 'No bookings found for this user' });
//     }

//     res.status(200).json({ success: true, bookings });
//   } catch (error) {
//     console.error('Error fetching bookings by user ID:', error);
//     res.status(500).json({ success: false, message: 'Error fetching bookings by user ID', details: error.message });
//   }
// };

// const count = async (req, res) => {
//   try {
//     const count = await Booking.countDocuments();
//     res.json({ count });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Get total number of bookings today
// const countToday = async (req, res) => {
//   try {
//     const startOfDay = new Date();
//     startOfDay.setHours(0, 0, 0, 0);
//     const endOfDay = new Date();
//     endOfDay.setHours(23, 59, 59, 999);

//     const count = await Booking.countDocuments({
//       createdAt: { $gte: startOfDay, $lt: endOfDay }
//     });
//     res.json({ count });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// // Export all functions
// module.exports = {
//   createBooking,
//   getAllBookings,
//   updateBookingStatus,
//   getBookingById,
//   getBookingsByUserId,
//   count,countToday
// };



const mongoose = require('mongoose');
const Booking = require('../model/Booking_model'); // Ensure this path is correct

// Define createBooking function
const createBooking = async (req, res) => {
  try {
    const {
      productId,
      quantity,
      amount,
      fullName,
      emailAddress,
      phoneNumber,
      shippingAddress,
      userId
    } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid User ID format' });
    }

    const newBooking = new Booking({
      productId,
      quantity,
      amount,
      fullName,
      emailAddress,
      phoneNumber,
      shippingAddress, // Updated to match new schema
      userId
    });

    await newBooking.save();
    res.status(201).json({ success: true, message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error); // Improved logging
    res.status(500).json({ success: false, message: 'Error creating booking', details: error.message });
  }
};



  const bookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('productId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Define getAllBookings function
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Error fetching bookings', details: error.message });
  }
};

// Define updateBookingStatus function
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Booking ID format' });
    }

    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({ success: true, message: 'Booking status updated successfully', booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, message: 'Error updating booking status', details: error.message });
  }
};

// Define getBookingById function
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Booking ID format' });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ success: false, message: 'Error fetching booking', details: error.message });
  }
};

// Define getBookingsByUserId function
const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid User ID format' });
    }

    const bookings = await Booking.find({ userId });

    if (bookings.length === 0) {
      return res.status(404).json({ success: false, message: 'No bookings found for this user' });
    }

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings by user ID:', error);
    res.status(500).json({ success: false, message: 'Error fetching bookings by user ID', details: error.message });
  }
};

// Get total number of bookings
const count = async (req, res) => {
  try {
    const count = await Booking.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get total number of bookings today
const countToday = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    console.log('Start of Day:', startOfDay);
    console.log('End of Day:', endOfDay);

    const count = await Booking.countDocuments({
      date: { $gte: startOfDay, $lt: endOfDay }
    });

    console.log('Count:', count);

    res.json({ count });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Export all functions
module.exports = {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  getBookingById,
  getBookingsByUserId,
  count,
  countToday,
  bookings
};
