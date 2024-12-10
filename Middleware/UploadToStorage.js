const { Storage } = require("@google-cloud/storage");
require("dotenv").config();

// Inisialisasi Storage
const storage = new Storage({
  keyFilename: "./storage_key.json", // Replace with your service account JSON path
  projectId: process.env.PROJECT_ID, // Replace with your GCP project ID
});

const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

const uploadToCloud = async (file, folderName) => {
  if (!file) return null;

  try {
    // Create the object name with folder prefix
    const blob = bucket.file(
      `${folderName}/${Date.now()}-${file.originalname}`
    );
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => {
      blobStream.on("error", (err) => {
        console.error(`Error uploading image to ${folderName}:`, err);
        reject(new Error("Failed to upload image."));
      });

      blobStream.on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  } catch (error) {
    console.error(`Unexpected error uploading image to ${folderName}:`, error);
    throw new Error("Failed to upload image.");
  }
};

module.exports = uploadToCloud;
