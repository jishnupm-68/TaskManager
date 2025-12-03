const express = require('express');
const app = express();
const connectDb = require('./config/db');
require('dotenv').config();



connectDb()
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.log("Failed to start server due to database connection error:", error);
})