
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});






import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Readable } from "stream";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




export async function uploadToCloudinary(filePathOrBuffer, folder = "Doctor") {
  try {
    let result;
    
    if (Buffer.isBuffer(filePathOrBuffer)) {
      // Handle buffer (memory storage)
      result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder, resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        Readable.from(filePathOrBuffer).pipe(stream);
      });
    } else {
      // Handle file path (disk storage)
      result = await cloudinary.uploader.upload(filePathOrBuffer, {
        folder,
        resource_type: "image",
      });
      
      if (fs.existsSync(filePathOrBuffer)) {
        fs.unlinkSync(filePathOrBuffer);
      }
    }

    return result;  
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
}





export async function deleteFromCloudinary(publicId) {
  try {
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    throw err;
  }
}

export default cloudinary;
