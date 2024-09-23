const projectModel = require("../../models/projectModel");
const cludHelper = require("../../helper/cloudinaryHelper");

class projectClass {
  createProject = async (req, res) => {
    try {
      let { project_name, course_id } = req.body;

      let projectImg = "";

      if (req.file) {
        const result = await cludHelper.uploader.upload(req.file.path, {
          folder: "project-images",
        });
        projectImg = result.secure_url;
      }

      let newData = new projectModel({
        project_name,
        course_id,
        project_img: projectImg,
      });

      await newData.save();

      return res.status(201).json({
        status: "success",
        msg: "Project created successfully",
        data: newData,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };

  updateProject = async (req, res) => {
    try {
      let id = req.params.id;
      let filter = { _id: id };
      let { project_name, course_id } = req.body;
      let projectImg = "";

      if (req.file) {
        const result = await cludHelper.uploader.upload(req.file.path, {
          folder: "project-images",
        });
        projectImg = result.secure_url;
      }

      let update = {
        project_name,
        course_id,
        project_img: projectImg,
      };


      let data = await projectModel.findById({ _id: id });
      if (!data)
        return res.status(404).json({
          status: "fail",
          msg: "Project data not found",
        });

      let updateData = await projectModel.findByIdAndUpdate(filter, update, {
        new: true,
      });
      return res.status(200).json({
        status: "success",
        msg: "Project data update successfully",
        data: updateData,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };


  deleteProject = async (req, res) => {
    try {
      let id = req.params.id;
      let filter = { _id: id };
      let data = await projectModel.findById({ _id: id });

      if (!data)
        return res.status(404).json({
          status: "fail",
          msg: "Project data not found",
        });

      await projectModel.findByIdAndDelete(filter);
      return res.status(200).json({
        status: "success",
        msg: "Project data delete successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };

  getAllProjectByAdmin = async (req, res) => {
    try {
      let data = await projectModel.find();
      if (data.length === 0)
        return res.status(404).json({
          status: "fail",
          msg: "Project data not found",
        });
      return res.status(200).json({
        status: "success",
        msg: "find all project data successfully",
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

const projectController = new projectClass();

module.exports = projectController;
