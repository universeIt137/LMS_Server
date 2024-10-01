const { default: mongoose } = require("mongoose");
const curriculumModel = require("../models/curriculumModel");
const courseDetailsModel = require("../models/courseDetailsModel");

class curriculumClass {
    singleCourseDetailsService = async (req) => {
        let courseId = new mongoose.Types.ObjectId(req.params.id);
        let matchStage = { $match: { course_id: courseId } };
        try {
            // join with curriculum id
            const joinWithCurriculumId = {
                $lookup: {
                    from: "curriculums",
                    localField: "course_id",
                    foreignField: "course_id",
                    as: "curriculumData"
                }
            };


            // join with get_course_id (get in course)

            const joinWithGetInCourseId = {
                $lookup: {
                    from: "get-in-courses",
                    localField: "course_id",
                    foreignField: "course_id",
                    as: "getInCourseData"
                }
            };



            // joinWithProjectDataId

            const joinWithProjectDataId = {
                $lookup: {
                    from: "project-datas",
                    localField: "project_details_id",
                    foreignField: "_id",
                    as: "projectData"
                }
            };



            // joinWithCourseSuccessStudentId

            const joinWithCourseSuccessStudentId = {
                $lookup: {
                    from: "successful-students",
                    localField: "successful_student_id",
                    foreignField: "_id",
                    as: "courseSuccessfulStudentData"
                }
            };





            // joinWithFeedbackStudentId

            const joinWithFeedbackStudentId = {
                $lookup: {
                    from: "lerner-feedbacks",
                    localField: "feedback_student_id",
                    foreignField: "_id",
                    as: "feedbackStudentData"
                }
            };




            // joinWithCourseInstructorId

            const joinWithCourseInstructorId = {
                $lookup: {
                    from: "instructors",
                    localField: "course_id",
                    foreignField: "course_id",
                    as: "courseInstructorData"
                }
            };





            let data = await courseDetailsModel.aggregate([
                matchStage,
                joinWithCurriculumId,
                joinWithGetInCourseId,
                joinWithProjectDataId,
                joinWithCourseSuccessStudentId,
                joinWithFeedbackStudentId,
                joinWithCourseInstructorId,
            ]);
            return {
                status: "success",
                data: data
            };

        } catch (error) {
            return {
                status: "fail",
                msg: error.toString()
            }
        }
    }
}

const SingleCourseDetailsService = new curriculumClass();

module.exports = SingleCourseDetailsService;