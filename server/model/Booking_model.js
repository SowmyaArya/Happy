// // const mongoose = require('mongoose');
// // const { isEmail } = require('validator');

// // const bookingSchema = new mongoose.Schema({
// //   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
// //   quantity: { type: Number, required: true },
// //   amount: { type: Number, required: true }, // Ensure the amount field is defined
// //   bookingDate: { type: Date, default: Date.now },
// //   name: { type: String, required: true },
// //   email: { 
// //     type: String, 
// //     required: true, 
// //     validate: [isEmail, 'Invalid email address'] 
// //   },
// //   phone: { 
// //     type: String, 
// //     required: true, 
// //     validate: {
// //       validator: function(v) {
// //         return /\d{10}/.test(v); // Basic validation for a 10-digit phone number
// //       },
// //       message: props => `${props.value} is not a valid phone number!`
// //     }
// //   },
// //   address: { type: String, required: true },
// // }, {
// //   timestamps: true // Automatically add createdAt and updatedAt fields
// // });

// // const Booking = mongoose.model('Booking', bookingSchema);
// // module.exports = Booking;


// const mongoose = require('mongoose');
// const { isEmail } = require('validator');

// const bookingSchema = new mongoose.Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   quantity: { type: Number, required: true },
//   amount: { type: Number, required: true },
//   bookingDate: { type: Date, default: Date.now },
//   name: { type: String, required: true },
//   email: { 
//     type: String, 
//     required: true, 
//     validate: [isEmail, 'Invalid email address'] 
//   },
//   phone: { 
//     type: String, 
//     required: true, 
//     validate: {
//       validator: function(v) {
//         return /\d{10}/.test(v); // Basic validation for a 10-digit phone number
//       },
//       message: props => `${props.value} is not a valid phone number!`
//     }
//   },
//   address: { type: String, required: true },
//   status: { type: String, default: 'Pending' }, // Add status field
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true } // Add userId field
// }, {
//   timestamps: true
// });

// const Booking = mongoose.model('Booking', bookingSchema);
// module.exports = Booking;

// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, required: true },
//   quantity: { type: Number, required: true },
//   amount: { type: Number, required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true },
//   status: { type: String, default: 'Pending' }
// });

// module.exports = mongoose.model('Booking', bookingSchema);

const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  stateProvince: { type: String, required: true },
  zipPostalCode: { type: String, required: true },
  country: { type: String, required: true }
});

const bookingSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  shippingAddress: { type: addressSchema, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
