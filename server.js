const express = require("express");
const cora = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const ConnectDB = require("./config/db");
const userRoutes = require("./routes/UserRoute");

//dotenv
dotenv.config();

//Mongodb connection
ConnectDB();

//Rest Objects
const app = express();

//Middlewares
app.use(cora());
app.use(express.json());
app.use(morgan("dev"));

//routes

app.use("/api/v1/auth", require("./routes/UserRoute"));
app.use("/api/v1/post", require("./routes/postRoutes"));

//port numbers
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`.bgGreen.white);
});
