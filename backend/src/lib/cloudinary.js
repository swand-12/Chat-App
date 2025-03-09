import{v2 as cloudinary} from "cloudinary";
import {config} from "dotenv";
config(); 
cloudinary.config({
    cloud_name:process.env.CLOUD_INARY_CLOUD_NAME,
    api_key:process.env.CLOUD_INARY_API_KEY,
    api_secret:process.env.CLOUD_INARY_API_SECRET
})

export default cloudinary;