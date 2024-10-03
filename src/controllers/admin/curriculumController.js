const curriculumModel = require("../../models/curriculumModel");
const curriculumService = require("../../services/curriculumService");

class curriculumClass {
    createCurriculum = async (req,res)=>{
        try {
            let reqBody = req.body;
            const data = await curriculumModel.create(reqBody);
            return res.status(201).json({
                status:"success",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    deleteCurriculum = async (req,res)=>{
        try {
            let id = req.params.id;
            let data = await curriculumModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "Curriculum not found"
            });
            await curriculumModel.findByIdAndDelete({_id:id});
            return res.status(200).json({
                status:"success",
                msg : "Curriculum delete successfully"
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg:error.toString()
            })
        }
    };

    updateCurriculum = async (req,res)=>{
        try {
            let id = req.params.id;
            let reqBody = req.body;
            let update = reqBody;
            let filter = { _id : id };
            let data = await curriculumModel.findById({_id:id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "Curriculum not found"
            });
            let updateData = await curriculumModel.findByIdAndUpdate
            (filter,update,{new:true});

            return res.status(200).json({
                status:"success",
                msg : "Curriculum update successfully",
                data : updateData
            });

        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    getAllCurriculumByAdmin = async (req,res)=>{
        let data = await curriculumService.allCurriculumService();
        res.send(data);
        console.log(data);
        // try {
        //     let data = await curriculumModel.find();
        //     if(data.length===0) return res.status(404).json({
        //         status:"fail",
        //         msg : "Curriculum not found"
        //     });
        //     return res.status(200).json({
        //         status : "success",
        //         data : data
        //     });
        // } catch (error) {
        //     return res.status(500).json({
        //         status:"fail",
        //         msg : error.toString()
        //     });
        // }
    };
}

let curriculumController = new curriculumClass();


module.exports = curriculumController;
