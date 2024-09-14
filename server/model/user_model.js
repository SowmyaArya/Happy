// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//     },
//     email: {
//         type: String,
//     },
//     phone: {
//         type: Number,
//     },
//     address: {
//         type: String,
//     },
//     password: {
//         type: String,
//     }
// });

// const UserModel = mongoose.model("user", userSchema);

// module.exports = UserModel;


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
    }
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
