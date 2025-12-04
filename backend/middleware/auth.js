const jwt = require('jsonwebtoken');
const User = require('../src/model/user');
const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({message: "Unauthorized: Please login", status:false});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id} = decoded;
        const user= await User.findById(id);
        if(!user) return res.status(401).json({message: "Unauthorized: User not found", status:false});
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in auth middleware: ", error);
        res.status(500).json({message: "Internal Server Error "+error.message, status:false});
    }
};
module.exports = isLoggedIn;