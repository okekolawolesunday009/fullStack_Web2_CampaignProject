// // AOW8M-CrhNIF7VSR6rHQW1ViP2k
// // CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dwblhxqyz
const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv')
const fs = require('fs')
dotenv.config()




cloudinary.config(
    {
        cloud_name: 'dwblhxqyz',
        api_key: "863343753386181",
        api_secret: 'AOW8M-CrhNIF7VSR6rHQW1ViP2k'
    }
)



const fileUpload = async (req, res, next) => {
   try {
        const image = req.file;

        if (!image || !image.path) {
            return res.status(400).json({ message: "No image provided" });
        }

        // Image upload to Cloudinary
        const result = await cloudinary.uploader.upload(image.path, {
            use_filename: true,
            folder: "imageUploads"
        });

        

        req.imageUrl = result.secure_url;
        next()

        if (!result) {
            return res.status(500).json({ message: "Image not uploaded" });
        }

        fs.inlink(image.path, (err) => {
            if (err) {
                console.error("Failed to delete local image:", err)
            } else {
                console.log("Local iage file deleted successfully")
            }
        })


    
    } catch (err) {
        console.log(err, "error")
    }
}

module.exports = {
    fileUpload
}

