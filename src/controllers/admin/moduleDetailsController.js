const moduleDetailsModel = require("../../models/moduleDetailsModel");
const moduleDetailsService = require("../../services/moduleDetailsService");

class moduleDetailsClass {
    create = async (req,res)=>{
        try {
            let {module_id,course_id} = req.body;
            const moduleData = await moduleDetailsModel.findOne({module_id:module_id});
            if(moduleData){
                return res.status(400).json({
                    status:"fail",
                    msg :"Module already exists for this course. You can not create it again module details"
                });
            }
            let data = await moduleDetailsModel.create(reqBody);
            return res.status(201).json({
                status : "success",
                msg : "Module details created",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };
    update = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {_id : id};
            let reqBody = req.body;
            let update = reqBody;
            let data = await moduleDetailsModel.findById(id);
            if(!data) return res.status(404).json({
                status:"fail",
                msg :"Module details not found"
            });
            let updateData = await moduleDetailsModel.findByIdAndUpdate(filter,update,{new: true});
            return res.status(200).json({
                status:"success",
                msg :"Module details updated successfully",
                data : updateData
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };
    moduleDetailsDelete = async function(req,res){
        try {
            let id = req.params.id;

            let filter = {_id : id};

            let data = await moduleDetailsModel.findById(id);

            if(!data) return res.status(404).json({
                status:"fail",
                msg :"Module details not found"
            });

            await moduleDetailsModel.findByIdAndDelete(filter);

            return res.status(200).json({
                status:"success",
                msg :"Module details deleted successfully",
            });

        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    allModuleDetails = async function (req, res) {
        let data = await moduleDetailsService.allModuleDetailsService();
        res.send(data);
    };

    singleModuleDetailsById = async function (req, res) {
        let data = await moduleDetailsService.singleModuleDetailsService(req);
        res.send(data);
    };
}

const moduleDetailsController = new moduleDetailsClass();

module.exports = moduleDetailsController;