const express = require('express');
const cors = require('cors');
const dbConnection = require('./db');

const app = express();
const PORTNO = 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
dbConnection();

// Basic route for testing
app.get('/hai', (req, res) => {
    res.send("hello");
});

// Route definitions
app.use("/api/user", require('./route/Userroute'));
app.use("/api/Category", require('./route/Categoryroute'));
app.use("/api/Product", require('./route/Productroute'));
app.use("/api/SubCategory", require('./route/SubCategoryroute'));
app.use("/api/Booking", require('./route/Bookingroute'));
app.use("/api/cart", require('./route/Cartroute'));
app.use("/api/Blog", require('./route/Blogroute'));
app.use("/api/Payment", require('./route/Paymentroute'));
app.use("/api/Feedback", require('./route/Feedbackroute'));
app.use("/api/bill", require('./route/billroute'));
app.use("/api/admin", require('./route/Adminroute'));

// Serve static files
app.use("/api/image", express.static("./Uploads"));

// Start server
app.listen(PORTNO, () => {
    console.log(`Server is running on port ${PORTNO}`);
});
