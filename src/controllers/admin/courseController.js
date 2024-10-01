const courseModel = require("../../models/courseModel");

const cludHelper = require("../../helper/cloudinaryHelper");

class courseClass {
  courseCreate = async (req, res) => {
    try {
      let { course_name, instructor_name, total_sit, batch_no } = req.body;

      let courseImg = "";

      if (req.file) {
        const result = await cludHelper.uploader.upload(req.file.path, {
          folder: "course-images",
        });
        courseImg = result.secure_url;
      }

      let courseData = new courseModel({
        course_name,
        course_img: courseImg,
        instructor_name,
        total_sit,
        batch_no,
      });

      await courseData.save();

      return res.status(201).json({
        status: "success",
        msg: "Course created successfully",
        data: courseData,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };
  courseUpdate = async (req, res) => {
    try {
      let id = req.params.id;

      let { course_name, instructor_name, total_sit, batch_no } = req.body;

      let filter = { _id: id };


      let courseImg = "";

      if (req.file) {
        const result = await cludHelper.uploader.upload(req.file.path, {
          folder: "course-images",
        });
        courseImg = result.secure_url;
      }

      let courseUpdateData = {
        course_name,
        course_img: courseImg,
        instructor_name,
        total_sit,
        batch_no,
      };

      const update = courseUpdateData;

      let data = await courseModel.findById({ _id: id });
      if (!data)
        return res.status(404).json({
          status: "fail",
          msg: "Course not found",
        });
      let updateData = await courseModel.findByIdAndUpdate(filter, update, {
        new: true,
      });

      return res.status(200).json({
        status: "success",
        msg: "Course updated successfully",
        data: updateData,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };
  courseDelete = async (req, res) => {
    try {
      let id = req.params.id;
      let filter = { _id: id };
      let data = await courseModel.findById({ _id: id });
      if (!data)
        return res.status(404).json({
          status: "fail",
          msg: "Course not found",
        });
      await courseModel.findByIdAndDelete(filter);
      return res.status(200).json({
        status: "success",
        msg: "Course delete successfully",
      });
    } catch (error) {
      return res.status({
        status: "fail",
        msg: error.toString(),
      });
    }
  };
  allCourseByAdmin = async (req, res) => {
    try {
      let data = await courseModel.find();
      if (data.length === 0)
        return res.status(404).json({
          status: "fail",
          msg: "Course not found",
        });
      return res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };
  singleCourse = async (req, res) => {
    try {
      let id = req.params.id;
      let filter = {_id : id};
      let data = await courseModel.findById(filter);
      if(!data) return res.status(404).json({
        status : "fail",
        msg : "Course data not found"
      });
      return res.status(200).json({
        status : "success",
        data : data
      });
    } catch (error) {
      return res.status(500).json({
        status : "fail",
        msg : error.toString()
      });
    }
  }
}

const courseController = new courseClass();

module.exports = courseController;
