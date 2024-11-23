import { Storage } from "@google-cloud/storage";

// Inisialisasi Storage
const storage = new Storage({
  keyFilename: "./api_key.json", // Ganti dengan file service account JSON
  projectId: "your project id", // Ganti dengan ID project GCP
});

const bucketName = "your bucket name"; // Ganti dengan nama bucket di GCP
const bucket = storage.bucket(bucketName);

// Fungsi untuk mengunggah file
export const uploadToCloud = (file) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(Date.now() + "-" + file.originalname);
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
