const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [30, "Username cannot exceed 30 characters"]
    },
    email : {
        type: String,
        required: true,
        unique: true,  
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email address");
            }
        }
    },
    password : {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
    },
    todos:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Todo',
        default: []
    }

},{timestamps: true});

userSchema.methods.comparePassword = async function (input){
    let user = this;
    let hash = user.password
    const result = await bcrypt.compare(input, hash);
    return result;
}
userSchema.methods.getJwtToken= async function (){
    let user =this;
    const token = await jwt.sign({id: user._id},
         process.env.JWT_SECRET, 
         {expiresIn: '2h'});
    return token;
}

const User = mongoose.model('User', userSchema);
module.exports = User;