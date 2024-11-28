const { Storage } = require("@google-cloud/storage");
require("dotenv").config();

// Inisialisasi Storage
const storage = new Storage({
  keyFilename: "./storage_key.json", // Replace with your service account JSON path
  projectId: process.env.PROJECT_ID, // Replace with your GCP project ID
});

const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

const uploadToCloud = async (file, folderName = "") => {
  return new Promise((resolve, reject) => {
    // Create the object name with folder prefix
    const blob = bucket.file(
      `${folderName}/${Date.now()}-${file.originalname}`
    );
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on("error", (err) => reject(err));
    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = uploadToCloud;
