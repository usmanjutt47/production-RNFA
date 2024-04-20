const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helper/authHelper");
const userModal = require("../models/UserModel");
var { expressjwt: jwt } = require("express-jwt");
require('dotenv').config();

// Middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});


//Register user
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }
    if (!password || password.length < 6 || !/\d/.test(password)) {
      return res.status(400).send({
        success: false,
        message: "password is required and 6 characters long",
      });
    }
    //exisiting user
    const exisitingUser = await userModal.findOne({ email });
    if (exisitingUser) {
      return res.status(500).send({
        success: false,
        message: "User already Register with this email",
      });
    }
    //hashed Password
    const hashedPassword = await hashPassword(password);
    //save user
    const user = await userModal({
      name,
      email,
      password: hashedPassword,
    }).save();
    return res.status(201).send({
      success: true,
      message: "Registration successfull please login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in register Api",
      error: error,
    });
  }
};

//Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation of Login
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid email or password",
      });
    }
    //find user
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }
    //match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid username password",
      });
    }
    //JWT token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    //undifined password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login successfull",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login api",
      error,
    });
  }
};

//update User profile

const updateUserControler = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    //user find
    const user = await userModal.findOne({ email });
    //password validate
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be at least 6 characters",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    //updated user
    const updatedUser = await userModal.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile updated Please Login",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user update api",
      error,
    });
  }
};

module.exports = {
  requireSignIn,
  registerController,
  loginController,
  updateUserControler,
};
