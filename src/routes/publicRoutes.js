const express = require("express");

const router = express.Router();
const signUpController = require("../controllers/userControllers");
const passwordResetController = require("../controllers/passwordResetController");

// user routes

router.post("/sign-up",signUpController.signUp);
router.post("/login", signUpController.login);

// password reset routes

router.get("/send-email/:email", passwordResetController.sendEmailUser);
router.get("/otp-verify", passwordResetController.verifyOtpCode);
router.get("/password-set", passwordResetController.setNewPassword );



module.exports = router;