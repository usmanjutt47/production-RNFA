const express = require("express");
const {
  registerController,
  loginController,
  updateUserControler,
  requireSignIn,
} = require("../controllers/UserController");

//routuer object
const router = express.Router();

//Routtes
//Register type POST
router.post("/register", registerController);

//Login type POST
router.post("/login", loginController);

//Update || Pull
router.put("/update-user", requireSignIn, updateUserControler);

//export
module.exports = router;
