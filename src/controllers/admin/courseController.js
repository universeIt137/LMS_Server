const courseModel = require("../../models/courseModel");

const cludHelper = require("../../helper/cloudinaryHelper");

class courseClass {
  courseCreate = async (req, res) => {
    try {
      const reqBody = req.body;
      const data = await courseModel.create(reqBody);
      return res.status(201).json({
        status: "success",
        msg: "Course created successfully",
        data: data,
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
      let filter = { _id: id };
      const update = req.body;
      
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
  };

  allCourseName = async (req, res) => {
    try {
      let data = await courseModel.aggregate([
        {
          $project: {
            _id: 1,
            course_name: 1,
          },
        },
      ]);
  
      if (data.length === 0) {
        return res.status(404).json({
          status: "fail",
          msg: "Course name not found",
        });
      }
  
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
  

}

const courseController = new courseClass();

module.exports = courseController;
