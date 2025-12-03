const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("Error connecting to database:", error);
    }
}

module.exports = connectDb;