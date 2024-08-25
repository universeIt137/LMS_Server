const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadFile = async (req, res, next) => {
    try {
        const file = req.files.photo;

        // Ensure file exists
        if (!file) {
            throw new Error("File not found in request.");
        }

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath);

        // Check if the result is valid JSON
        if (typeof result !== 'object' || !result.secure_url) {
            throw new Error("Unexpected response format from Cloudinary.");
        }

        // Respond with the result
        return res.status(200).json({
            status: "success",
            data: result
        });
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);

        // Log full error response for debugging
        if (error.response) {
            console.error("Full Error Response:", error.response.data);
        }

        // Send error response
        return res.status(500).json({
            status: "fail",
            msg: error.message || "Error uploading file."
        });
    }
};

module.exports = { uploadFile };
