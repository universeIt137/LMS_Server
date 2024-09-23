const express = require("express");

const router = express.Router();

// user controller 
const userController = require("../controllers/user/userAuthController");
// image middleware
const upload = require("../middlewares/imageMiddleware");
//middleware
const { isLogIn, isLogOut } = 
require("../middlewares/authMiddleware");
//course controller
const courseController = 
require("../controllers/user/courseController");
//course details controller
const courseDetailsController = 
require("../controllers/user/courseDetailsController");
//curriculum controller
const curriculumController = 
require("../controllers/user/curriculumController");
// getInCourse controller
const getInCourseController = 
require("../controllers/user/getInCourseController");
//project controller
const projectController =
require("../controllers/user/projectController");
// course successful student controller
const courseSuccessfulStudentController = 
require("../controllers/user/courseSuccessfulStudentController");
//feedback controller
const feedbackController = require("../controllers/user/feedbackController");


// auth related api

router.post("/user/sign-up", upload.single('profile_pick') ,userController.signUp);

router.post("/user/sign-in", isLogOut , userController.singIn);
router.get("/user/log-out", isLogIn ,userController.handleLogOut);
router.get("/single/user", isLogIn, userController.getUserProfile);
router.put("/user/update", isLogIn, userController.updateUserProfile);
router.get("/refresh-token", userController.handleRefreshToken);

// course related api

router.get("/all-course", courseController.getAllCourse);

// courseDetails related api

router.get
(
    "/get-all-course-details", courseDetailsController.getAllCourseDetails
)

// curriculum related api

router.get
(
    "/all/curriculum", curriculumController.getAllCurriculum
)

// get in course controller

router.get
(
    "/get/in/all/course", getInCourseController.allGetInCourse
);

// project related api

router.get
(
    "/get/all/project",projectController.getAllProject
);

// course successful student api

router.get
(
    "/course/successful/student",
    courseSuccessfulStudentController.allSuccessfulStudent
);

// feedback api

router.get
(
    "/all-feedback",feedbackController.allFeedback
);

module.exports = router;