
const preRecordVideoModel = require("../../models/preRecordVideoModel");

exports.uploadPreRecordVideo = async(req,res)=>{
    try {
        const reqBoyd = req.body;

        let data = await uploadPreRecordVideo.create(reqBoyd)
        
        return res.status(201).json({
            status: "success",
            msg: "Video uploaded successfully",
            data : data
        });
        
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: error.message
        });
    
}
}