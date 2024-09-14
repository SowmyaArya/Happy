const express = require('express');
const router = express.Router();
const billController = require('../controller/Billcontroller'); // Ensure this path is correct

// Define routes
router.get('/generateBill', billController.generateBill);
// router.get('/sendBill', billController.sendBill);
router.get('/download/:bookingId',billController.download);
module.exports = router;
