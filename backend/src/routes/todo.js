const express = require('express');
const todoRouter = express.Router();
const Todo = require('../model/todo');
const User = require('../model/user');
const isLoginedIn = require('../../middleware/auth');

todoRouter.get('/',isLoginedIn ,async(req, res)=>{
    try {
        const _id = req.user._id;
        const todos = await User.findById(_id).populate('todos').select('todos').exec();
        res.status(200).json({message: "Todos fetched successfully", status:true, data: todos.todos}); 
    } catch (error) {
        console.log("Error in fetching todos: ", error);
        res.status(500).json({message: "Internal Server Error "+error.message, status:false});
    }
});

module.exports = todoRouter;