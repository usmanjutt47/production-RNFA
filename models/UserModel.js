const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Please add name "],
    trim: true,
  },
  email: {
    type: "string",
    required: [true, "Please add email"],
    trim: true,
    unique: true,
  },
  password: {
    type: "string",
    required: [true, "Please add password"],
    trim: true,
    min: 6,
    max: 20,
  },
  role:{
    type: "string",
    default:'user',
  }, 
},
{timestamps:true}
);
module.exports=mongoose.model('User',userSchema)