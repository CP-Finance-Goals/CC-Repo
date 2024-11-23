import express from "express";
import {
  getAllDiaries,
  getDiaryById,
  createDiary,
  updateDiary,
  deleteDiary,
} from "../Controllers/diaryController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import upload from "../Middleware/uploadImage.js";

const budgetingDiaryRoutes = express.Router();

budgetingDiaryRoutes.get("/", verifyToken, getAllDiaries);
budgetingDiaryRoutes.get("/:id", verifyToken, getDiaryById);
budgetingDiaryRoutes.post(
  "/",
  verifyToken,
  upload.single("image"),
  createDiary
);
budgetingDiaryRoutes.put("/:id", verifyToken, updateDiary);
budgetingDiaryRoutes.delete("/:id", verifyToken, deleteDiary);

export default budgetingDiaryRoutes;
