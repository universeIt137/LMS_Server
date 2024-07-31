const express = require("express");

const router = express.Router();
const signUpController = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/sign-up",signUpController.signUp);
router.post("/login", signUpController.login);

module.exports = router;