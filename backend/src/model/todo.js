const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false
    },
    priority : {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true,
    },
    dueDate : {
        type: Date,
        required: false
    },
    status : {
        type: String,
        enum: ['Todo', 'In Progress', 'Completed'],
        required: true,
        default: 'Todo'
    }
}, {timestamps: true});

module.exports = mongoose.model('Todo', todoSchema);