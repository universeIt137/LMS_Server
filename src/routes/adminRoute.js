const express = require("express");

const router = new express.Router();
const upload  = require("../middlewares/imageMiddleware.js")

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
//feedback controller
const feedbackController = 
require("../controllers/admin/feedbackController.js");
//assignment controller
const assignmentController = 
require("../controllers/admin/assignmentController.js");
//module controller
const moduleController = 
require("../controllers/admin/moduleController.js");
//moduleDetails controller
const moduleDetailsController = 
require("../controllers/admin/moduleDetailsController.js");
// resource controller
const resourceController = 
require("../controllers/admin/resoruceController.js");
// preRecorde video  controller
const preRecordVideoController = 
require("../controllers/admin/proRecordVideoController.js");
// live class controller
const liveClassController = require("../controllers/admin/liveClassController.js");

// img middleware




///auth api
router.delete
(
    "/user/delete/:id", 
    adminUserController.deleteUser
);
router.get(
    "/all-user/",  
    adminUserController.allUser
);
router.put
(
    "/admin/update",
    adminUserController.adminProfileUpdate
);


// course related api

router.post
(
    "/course/create", 
    upload.single("course_img"),courseController.courseCreate
);

router.put
(
    "/course/update/:id",
    upload.single("course_img"),courseController.courseUpdate
);

router.delete
(
    "/course/delete/:id", 
    courseController.courseDelete
);

router.get
(
    "/admin-all-course",  
    courseController.allCourseByAdmin
);

router.get("/all-course-name", courseController.allCourseName);

// courseDetails related api

router.post
(
    "/course/details/created",  
    courseDetailsController.courseDetailsCreated
);

router.put
(
    "/course/details/update/:id", 
    courseDetailsController.courseDetailsUpdate
);

router.delete
(
    "/course/details/delete/:id",
    courseDetailsController.courseDetailsDelete
);

router.get
(
    "/get/all/course-details-admin",
    courseDetailsController.getAllCourseDetails
);


// curriculum related api

router.post
(
    "/curriculum/create",
    curriculumController.createCurriculum
);

router.delete
(
    "/curriculum/delete/:id",
    curriculumController.deleteCurriculum
);

router.put
(
    "/curriculum/update/:id", 
    curriculumController.updateCurriculum
);

router.get
(
    "/all/curriculum/admin", 
    curriculumController.getAllCurriculumByAdmin 
);

// getInCourse related api

router.post
(
    "/get/in/course/create",
    getInCourseController.create
);

router.put
(
    "/get/in/course/update/:id", 
    getInCourseController.updateGetInCourse
);

router.delete
(
    "/get/in/course/delete/:id", 
    getInCourseController.deleteGetInCourse
);

router.get
(
    "/get/in/course/admin",
    getInCourseController.allGetInCourseAdmin
)

// project related api

router.post
(
    "/project/create", upload.single("project_img") ,
    projectController.createProject
);  

router.put
(
    "/project/update/:id", 
    projectController.updateProject
);

router.delete
(
    "/project/delete/:id",
    projectController.deleteProject
);

router.get
(
    "/get/all/project/admin", 
    projectController.getAllProjectByAdmin

)

// instructor related api

router.post
(
    "/instructor/create",
    instructorController.create
);

router.put
(
    "/instructor/update/:id",
    instructorController.updateInstructor
);

router.delete
(
    "/instructor/delete/:id",
    instructorController.deleteInstructor
);

router.get
(
    "/all/instructor",
    instructorController.allInstructorByAdmin
);

router.get("/instructors-name", instructorController.allInstructorName)

// successful student related api

router.post
(
    "/student/create",
    successfulStudentController.create
);

router.put
(
    "/student/update/:id",
    successfulStudentController.update
);

router.delete
(
    "/student/delete/:id",
    successfulStudentController.successfulStudentDelete
);

router.get
(
    "/all-successful-student/admin",
    successfulStudentController.allSuccessfulStudentByAdmin
);

// feedback related api

router.post
(
    "/feedback/create" , 
    feedbackController.createFeedback
);

router.put
(
    "/feedback/update/:id" ,
    feedbackController.updateFeedback
);

router.delete
(
    "/feedback/delete/:id",
    feedbackController.deleteFeedback
);

router.get
(
    "/all-feedback/admin",
    feedbackController.allFeedbackByAdmin
);

// module related api

router.post
(
    "/module/create",
    moduleController.moduleCreate
);

router.put
(
    "/module/update/:id",
    moduleController.moduleUpdate
);

router.delete
(
    "/module/delete/:id", 
    moduleController.moduleDelete
);

router.get
(
    "/get-all-module/admin",
    moduleController.getAllModuleByAdmin
);

router.get
(
    "/get/single/module/:id",
    moduleController.getSingleModuleByAdmin
);



// assignment related api

router.post
(
    "/assignment/create",
    assignmentController.assignmentPost
);

router.put
(
    "/assignment/update/:id",
    assignmentController.assignmentUpdate
);

router.delete
(
    "/assignment/delete/:id",
    assignmentController.assignmentDelete
);

router.get(
    "/all-assignment/admin",
    assignmentController.allAssignmentByAdmin
);

// module details api

router.post
(
    "/module-details/create", 
    moduleDetailsController.create
);


// resource api 

router.post
(
    "/resource/create",
    resourceController.create
);

// pre recorde video api

router.post
(
    "/upload/video",
    preRecordVideoController.create
);


// live class api

router.post
(
    "/live-class/create",
    liveClassController.create
)


module.exports = router;