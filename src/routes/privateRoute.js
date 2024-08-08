const express = require("express");
const router = express.Router();
// user controller
const userController = require("../controllers/userControllers");

// auth middleware
const authMiddleware = require("../middleware/authMiddleware");

// instructor controller
const instructorController = require("../controllers/instructorController");

// module controller
const moduleController = require("../controllers/moduleControllers");

// course controller
const courseController = require("../controllers/courseControllers");

// assignment controller
const assignmentController = require("../controllers/assignmentController");
const {isValidUser} = require("../middleware/authMiddleware");



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
router.put("/module-update/:id" , authMiddleware.isValidUser, moduleController.moduleUpdate);



// course api

router.post("/course-create" , authMiddleware.isValidUser, courseController.courseCreate);

// assignment api
router.post("/assignment-create", authMiddleware.isValidUser, assignmentController.createAssignment);



module.exports = router
