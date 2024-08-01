const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");
const instructorController = require("../controllers/instructorController");



router.put("/update-user/:id", authMiddleware.isValidUser, userController.updateUser);
router.delete("/delete-user/:id", authMiddleware.isValidUser, userController.deleteUser);
router.get("/single-user", authMiddleware.isValidUser, userController.singleUser);
router.get("/all-user", authMiddleware.isValidUser, userController.allUser);


// instructor api

router.post("/instructor-create", authMiddleware.isSuperAdmin, instructorController.instructorCreate);
router.put("/instructor-update/:id" , authMiddleware.isSuperAdmin, instructorController.instructorUpdate);




module.exports = router
