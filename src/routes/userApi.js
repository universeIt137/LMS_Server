const express = require("express");

const router = express.Router();

const userController = require("../controllers/user/userController")

router.post("/user/registration", userController.signUp);




module.exports = router;