const express = require('express');
const app = express();
const connectDb = require('./config/db');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const userRouter = require('./src/routes/user');
const todoRouter = require('./src/routes/todo');
const aiTodoParserRouter = require('./src/routes/aiTodoParser')
const cors = require("cors");
app.use(cors({
    origin: process.env.CORS_ORIGIN_STRING,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
})); 
app.use(express.json());
app.use(cookieParser());
app.use("/", userRouter)
app.use("/", todoRouter);
app.use('/', aiTodoParserRouter)
connectDb()
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.log("Failed to start server due to database connection error:", error.message);
})  