import express from "express";
import { Register, Login, Logout } from "../Controllers/userController.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.delete("/logout", Logout);

export default router;
