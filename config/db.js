const mongoose = require("mongoose");
const colors = require("colors");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connect to Database ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`error in connect db: ${error}`.bgRed.white);
  }
};
module.exports=ConnectDB;
