import express from "express";
import {
  getAllRecord,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
} from "../Controllers/budgetingController.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const budgetingRoutes = express.Router();

budgetingRoutes.get("/", verifyToken, getAllRecord);
budgetingRoutes.get("/:monthAndYear/:userId", verifyToken, getRecordById);
budgetingRoutes.post("/", verifyToken, createRecord);
budgetingRoutes.put("/:monthAndYear/:userId", verifyToken, updateRecord);
budgetingRoutes.delete("/:monthAndYear/:userId", verifyToken, deleteRecord);

export default budgetingRoutes;
