// route/Paymentroute.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controller/Paymentcontroller');

router.post('/submitPayment', paymentController.submitPayment);
router.get('/getAllPayments', paymentController.getAllPayments); // Ensure this matches the endpoint
// Remove or add additional routes as necessary
router.put('/updatePayment/:paymentId', paymentController.updatePaymentStatus);
module.exports = router;
