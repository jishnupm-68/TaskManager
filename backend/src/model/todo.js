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
        required: false,
        validate(value) {
            let due = new Date(value);
            if (due < new Date()) {
                throw new Error("Due date must be in the future");
            }
        }
    },
    status : {
        type: String,
        enum: ['Todo', 'In Progress', 'Completed'],
        required: true,
        default: 'Todo'
    }
}, {timestamps: true});

module.exports = mongoose.model('Todo', todoSchema);