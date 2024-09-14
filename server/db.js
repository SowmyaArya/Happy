// const mongoose = require('mongoose');

// const URI = "mongodb://127.0.0.1:27017/Happyfloors";


// const dbConnection = async () => {
//     try {
//         await mongoose.connect(URI);
//         console.log("Database connected");
//     } catch (err) {
//         console.error("Database connection error:", err);
//     }
// };

// module.exports = dbConnection;

// -------------------
const mongoose = require('mongoose');

const URI = "mongodb://127.0.0.1:27017/eshop";

const dbConnection = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

module.exports = dbConnection;
