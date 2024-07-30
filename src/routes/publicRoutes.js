const express = require("express");

const router = express.Router();
const signUpController = require("../controllers/signUpControllers");

router.post("/sign-up",signUpController.signUp);
router.post("/login", signUpController.login);


module.exports = router;