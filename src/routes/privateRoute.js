const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");
const instructorController = require("../controllers/instructorController");
const moduleController = require("../controllers/moduleControllers");



router.put("/update-user/:id", authMiddleware.isValidUser, userController.updateUser);
router.delete("/delete-user/:id", authMiddleware.isValidUser, userController.deleteUser);
router.get("/single-user", authMiddleware.isValidUser, userController.singleUser);
router.get("/all-user", authMiddleware.isValidUser, userController.allUser);


// instructor api

router.post("/instructor-create", authMiddleware.isSuperAdmin, instructorController.instructorCreate);
router.put("/instructor-update/:id" , authMiddleware.isSuperAdmin, instructorController.instructorUpdate);
router.delete("/instructor-delete/:id" , authMiddleware.isSuperAdmin, instructorController.instructorDelete);
router.get("/all-instructor" , authMiddleware.isSuperAdmin, instructorController.allInstructor);


// module api

router.post("/module-create", authMiddleware.isValidUser, moduleController.moduleCreate);




module.exports = router
