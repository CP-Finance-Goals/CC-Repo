import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./Routes/routes.js";
import budgetingRoutes from "./Routes/budgetingRoute.js";
import budgetingDiaryRoutes from "./Routes/diaryRoute.js";

dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("database connected...");
} catch (error) {
  console.error(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
app.use("/api/budgeting", budgetingRoutes);
app.use("/api/budgeting-diary", budgetingDiaryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running at port", PORT));
