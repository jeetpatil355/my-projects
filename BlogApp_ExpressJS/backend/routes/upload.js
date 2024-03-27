const cloudinary = require("cloudinary").v2
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};


const added = async (image) => {
    //imgage = > base64
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if (result && result.secure_url) {
                return resolve(result);
            }
            console.log(error.message);
            return reject({ message: error.message });
        });
    });
};

module.exports = added;