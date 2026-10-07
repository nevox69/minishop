const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

require("dotenv").config();

console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API key exists:", !!process.env.CLOUDINARY_API_KEY);
console.log("API secret exists:", !!process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api
  .ping()
  .then((result) => {
    console.log("✅ CLOUDINARY PING:", result);
  })
  .catch((err) => {
    console.log("❌ CLOUDINARY PING ERROR:", err);
  });

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "minishop",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}+${file.originalname}`);
//   },
// });
