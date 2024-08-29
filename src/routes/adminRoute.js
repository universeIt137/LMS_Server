const express = require("express");

const router = new express.Router();
const {isLogIn,isAdmin} 
= require("../middlewares/authMiddleware")

//adminUser controller
const adminUserController = 
require("../controllers/admin/adminAuthController");
// course controller
const courseController = 
require("../controllers/admin/courseController");
// course details controller
const courseDetailsController = 
require("../controllers/admin/courseDetailsController");
// curriculum controller
const curriculumController = 
require("../controllers/admin/curriculumController");
// getInCourse controller
const getInCourseController = 
require("../controllers/admin/getInCourseController");
// project controller
const projectController =
require("../controllers/admin/projectController");
// instructor controller
const instructorController = 
require("../controllers/admin/instructorController");
//successful student controller 
const successfulStudentController = 
require("../controllers/admin/successfulStudentController");



router.delete
("/user/delete/:id", isLogIn, isAdmin,adminUserController.deleteUser);
router.get("/all-user/", isLogIn, isAdmin, adminUserController.allUser);
router.put
("/admin/update", isLogIn,isAdmin,adminUserController.adminProfileUpdate);


// course related api

router.post
("/course/create", isLogIn, isAdmin , courseController.courseCreate);

router.put
("/course/update/:id",isLogIn,isAdmin, courseController.courseUpdate);

router.delete
("/course/delete/:id", isLogIn, isAdmin, courseController.courseDelete);

router.get
("/admin-all-course", isLogIn, isAdmin, courseController.allCourseByAdmin);

// courseDetails related api

router.post
(
    "/course/details/created", isLogIn, isAdmin, 
    courseDetailsController.courseDetailsCreated
);

router.put
(
    "/course/details/update/:id", isLogIn, isAdmin,
    courseDetailsController.courseDetailsUpdate
);

router.delete
(
    "/course/details/delete/:id",isLogIn,isAdmin,
    courseDetailsController.courseDetailsDelete
);

router.get
(
    "/get/all/course-details-admin", isLogIn,isAdmin,
    courseDetailsController.getAllCourseDetails
);


// curriculum related api

router.post
(
    "/curriculum/create", isLogIn,isAdmin,
    curriculumController.createCurriculum
);

router.delete
(
    "/curriculum/delete/:id", isLogIn,isAdmin,
    curriculumController.deleteCurriculum
);

router.put
(
    "/curriculum/update/:id", isLogIn, isAdmin,
    curriculumController.updateCurriculum
);

router.get
(
    "/all/curriculum/admin", isLogIn, isAdmin,
    curriculumController.getAllCurriculumByAdmin 
);

// getInCourse related api

router.post
(
    "/get/in/course/create",isLogIn,isAdmin,
    getInCourseController.create
);

router.put
(
    "/get/in/course/update/:id", isLogIn, isAdmin,
    getInCourseController.updateGetInCourse
);

router.delete
(
    "/get/in/course/delete/:id", isLogIn, isAdmin,
    getInCourseController.deleteGetInCourse
);

router.get
(
    "/get/in/course/admin", isLogIn,isAdmin,
    getInCourseController.allGetInCourseAdmin
)

// project related api

router.post
(
    "/project/create", isLogIn,isAdmin,
    projectController.createProject
);

router.put
(
    "/project/update/:id", isLogIn,isAdmin,
    projectController.updateProject
);

router.delete
(
    "/project/delete/:id", isLogIn,isAdmin,
    projectController.deleteProject
);

router.get
(
    "/get/all/project/admin", isLogIn, isAdmin,
    projectController.getAllProjectByAdmin

)

// instructor related api

router.post
(
    "/instructor/create",isLogIn,isAdmin,
    instructorController.create
);

router.put
(
    "/instructor/update/:id",isLogIn,isAdmin,
    instructorController.updateInstructor
);

router.delete
(
    "/instructor/delete/:id", isLogIn,isAdmin,
    instructorController.deleteInstructor
);

router.get
(
    "/all/instructor/admin", isLogIn,isAdmin,
    instructorController.allInstructorByAdmin
);

// successful student related api

router.post
(
    "/student/create", isLogIn, isAdmin,
    successfulStudentController.create
);

router.put
(
    "/student/update/:id", isLogIn,isAdmin,
    successfulStudentController.update
);

router.delete
(
    "/student/delete/:id", isLogIn,isAdmin,
    successfulStudentController.successfulStudentDelete
)


module.exports = router;