const mongoose = require('mongoose');
const connectDb = async () => {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to database successfully");
}

module.exports = connectDb; 