const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../model/user");

userRouter.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password)
      return res.status(400).json({ message: "All fields are required", status: false });
    if (userName.length < 3 || userName.length > 30)
      return res.status(400).json({
        message: "Username must be between 3 and 30 characters long",
        status: false
      });
    if (password.length < 6)
      return res.status(400).json({message: "Password must be at least 6 characters long", status: false});
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid Email address", status: false });
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({message: "User with this email already exists",status: false});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = await user.getJwtToken();
    res.cookie("token", token, {
      httpOnly: false,
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
      secure: false,
      sameSite: "Lax",
    });
    res.status(201).json({message: "User registered successfully",status: true,data: user});
    }catch (error) {
    console.log("Error in signup:", error);
    res.status(500).json({
      message: "Internal Server Error " + error.message,
      status: false,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and Password are required", status: false });
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User not found", status: false });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials", status: false });
    const token = await user.getJwtToken();
    res.cookie("token", token, {
      httpOnly: false,
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
      secure: false,
      sameSite: "Lax",
    });
    res.status(200).json({ message: "Login successful", status: true, data: user });
  } catch (error) {
    console.log("Error in login: ", error);
    res.status(500).json({
      message: "Internal Server Error " + error.message,
      status: false,
    });
  }
});

userRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: false,
      expires: new Date(0),
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({ message: "Logout successful", status: true });
  } catch (error) {
    console.log("Error in logout: ", error);
    res.status(500).json({
        message: "Internal Server Error " + error.message,
        status: false,
      });
  }
});

module.exports = userRouter;
