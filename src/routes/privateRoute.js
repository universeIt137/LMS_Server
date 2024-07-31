const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");



router.put("/update-user/:id", authMiddleware.isValidUser, userController.updateUser);
router.delete("/delete-user/:id", authMiddleware.isValidUser, userController.deleteUser);
router.get("/single-user", authMiddleware.isValidUser, userController.singleUser);
router.get("/all-user", authMiddleware.isValidUser, userController.allUser);


module.exports = router
