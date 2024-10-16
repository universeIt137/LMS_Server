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
    "/course/create",courseController.courseCreate
);

router.put
(
    "/course/update/:id",courseController.courseUpdate
);

router.delete
(
    "/course/delete/:id", 
    courseController.courseDelete
);

router.get
(
    "/all-course",  
    courseController.allCourse
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

router.get("/single/curriculum/:id", curriculumController.getSingleCurriculumById );
router.get("/curriculum-by-course-id/:course_id" , curriculumController.curriculumByCourseId);

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

router.get("/get/in/course/:id", getInCourseController.singleGetInCourseById);
router.get("/get-in-corse/by-corse-id/:courseId", getInCourseController.getInCourseByCourseId  );


// project related api

router.post
(
    "/project/create",
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

router.get("/single/project/:id", projectController.getSingleProjectById );
router.get("/project-by/course-id/:course_id", projectController.getProjectByCourseId);

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
router.get("/instructor-by/course-id/:courseId", instructorController.instructorByCourseId);
router.get("/single/instructor/:id", instructorController.getSingleInstructorById);

router.get("/instructors-name", instructorController.allInstructorName);
router.get("/instructor-profile/:id", instructorController.instructorProfile);
router.get("/all-instructors", instructorController.allInstructor);

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
    "/all-successful-student",
    successfulStudentController.allSuccessfulStudent
);

router.get("/single/successful-student/:id", successfulStudentController.getSingleStudentById);
router.get("/successful-student-by-course-id/:courseId", successfulStudentController.studentByCourseId);

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
    "/all-feedback",
    feedbackController.allFeedback
);

router.get("/single-feedback/:id",feedbackController.singleFeedbackById);

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

router.delete("/module-details/delete/:id", moduleDetailsController.moduleDetailsDelete);
router.get("/all/modules/details",moduleDetailsController.allModuleDetails);
router.get('/single/modules/details/:id', moduleDetailsController.singleModuleDetailsById)


// resource api 

router.post
(
    "/resource/create",
    resourceController.create
);

router.put("/resource/update/:id", resourceController.update);
router.delete("/resource/delete/:id", resourceController.resourceDelete);
router.get("/all/resource", resourceController.allResource);
router.get("/single/resource/:id", resourceController.singleResourceServiceById)

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