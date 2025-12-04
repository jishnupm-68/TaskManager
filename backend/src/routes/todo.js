const express = require('express');
const todoRouter = express.Router();
const User = require('../model/user');
const Todo = require('../model/todo');
const isLoggedIn = require('../../middleware/auth');

todoRouter.get('/',isLoggedIn ,async(req, res)=>{
    try {
        const _id = req.user._id;
        const todos = await User.findById(_id).populate('todos').select('todos').exec();
        res.status(200).json({message: "Todos fetched successfully", status:true, data: todos.todos}); 
    } catch (error) {
        console.log("Error in fetching todos: ", error);
        res.status(500).json({message: "Internal Server Error "+error.message, status:false});
    }
});

todoRouter.post('/todo', isLoggedIn, async(req, res)=>{
    try {
        const {title, priority, dueDate, status} = req.body;
        const _id = req.user._id;
        const user = await User.findById(_id);
        const todo = await Todo.findOne({title, dueDate, priority});
        if(todo) return res.status(400).json({message: "Todo already exists", status:false});
        if(!user) return res.status(404).json({message: "User not found", status:false});
        if(!title || !priority || !dueDate) return res.status(400).json({message: "Please provide all required fields", status:false});
        const due = new Date(dueDate);
        console.log(due < new Date())
        if(due < new Date()) return res.status(400).json({message: "Due date must be in the future", status:false});
        const newTodo = new Todo({
            title,
            priority,
            dueDate,
            status
        });
        await newTodo.save();
        user.todos.push(newTodo._id);
        await user.save();
        res.status(201).json({message: "Todo added successfully", status:true, data: newTodo});
    } catch (error) {
        console.log("Error in adding todo: ", error.message);
        res.status(500).json({message: "Internal Server Error "+error.message, status:false});
    }
});

todoRouter.patch('/todo', isLoggedIn, async(req, res)=>{
    try {
        
        const {_id, title, priority, dueDate, status} = req.body;
        let existingTodo = await Todo.findById(_id);
        if(!existingTodo) return res.status(404).json({message: "Todo not found", status:false});
        const due = new Date(dueDate);
        if(due < new Date()) return res.status(400).json({message: "Due date must be in the future", status:false});
        existingTodo = await Todo.findByIdAndUpdate(_id, {
            title, priority, dueDate, status
        }, {runValidators: true, new: true});
        res.status(200).json({message: "Todo updated successfully", status:true, data: existingTodo});
    } catch (error) {
        console.log("Error in updating todo: ", error.message);
        res.status(500).json({message: "Internal Server Error "+error.message, status:false});
    }
});
todoRouter.delete('/todo/:id', isLoggedIn, async(req, res)=>{
    try {
        const todoId = req.params.id;
        const _id = req.user._id;
        const existingTodo = await Todo.findById(todoId);
        if(!existingTodo) return res.status(404).json({message: "Todo not found", status:false});
        const user = await User.findById(_id);
        if(!user) return res.status(404).json({message: "User not found", status:false});
        user.todos = user.todos.filter(id => id.toString() !== todoId);
        await user.save();
        await Todo.findByIdAndDelete(todoId);
        res.status(200).json({message: "Todo deleted successfully", status:true});
    } catch (error) {
        console.log("Error in deleting todo: ", error.message);
        res.status(500).json({message: "Internal Server Error "+error.message, status:false});
    }
});


module.exports = todoRouter;