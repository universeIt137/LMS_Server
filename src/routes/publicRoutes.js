const express = require("express");

const router = express.Router();
const signUpController = require("../controllers/signUpControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/sign-up",signUpController.signUp);
router.post("/login", signUpController.login);
router.put("/update/:id" , authMiddleware.isValidUser, signUpController.updateUser );


module.exports = router;