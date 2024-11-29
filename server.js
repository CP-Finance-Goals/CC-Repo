const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const db = require("./Config/database");
const router = require("./Routes/router");

const app = express();
require("dotenv").config();

db.listCollections()
  .then((collections) => {
    console.log("Tersambung ke Firestore. Koleksi yang ditemukan:");
    collections.forEach((collection) => console.log(collection.id));
  })
  .catch((error) => {
    console.error("Gagal menghubungkan ke Firestore:", error.message);
  });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
