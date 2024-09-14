// In your routes file (e.g., bookingRoutes.js)
const express = require('express');
const router = express.Router();
const bookingController = require('../controller/BookingController'); // Ensure this path is correct

router.post('/createBooking', bookingController.createBooking);
router.post('/bookings', bookingController.bookings);
router.get('/getAllBookings', bookingController.getAllBookings);
router.put('/updateBookingStatus/:id/status', bookingController.updateBookingStatus);
router.get('/getBookingById/:id', bookingController.getBookingById);
router.get('/getBookingsByUserId/:userId', bookingController.getBookingsByUserId);
router.get('/count', bookingController.count);
router.get('/countToday', bookingController.countToday);


module.exports = router;
