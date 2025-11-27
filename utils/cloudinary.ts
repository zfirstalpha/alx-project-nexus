import { v2 as cloudinary, ConfigOptions } from "cloudinary";

// Define the configuration object with type safety
const cloudinaryConfig: ConfigOptions = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

// Configure Cloudinary
cloudinary.config(cloudinaryConfig);

// Export the configured Cloudinary instance
export default cloudinary;
