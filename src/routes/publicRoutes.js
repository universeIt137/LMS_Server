const express = require("express");

const router = express.Router();
const signUpController = require("../controllers/userControllers");
const passwordResetController = require("../controllers/passwordResetController");

router.post("/sign-up",signUpController.signUp);
router.post("/login", signUpController.login);

// password reset routes

router.get("/send-email/:email", passwordResetController.sendEmailUser);
router.get("/otp-verify", passwordResetController.otpVerify );


module.exports = router;