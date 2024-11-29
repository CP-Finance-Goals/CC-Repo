const express = require("express");
const userController = require("../Controllers/UserController");
const balanceController = require("../Controllers/BalanceController");
const budgetingController = require("../Controllers/BudgetingController");
const diaryController = require("../Controllers/DiaryController");
const verifyToken = require("../Middleware/VerifyToken");
const upload = require("../Middleware/UploadImage");

const router = express.Router();

router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);
router.get("/user/getAll", verifyToken, userController.getData);
router.put(
  "/user/details",
  verifyToken,
  upload.single("image"),
  userController.updateDetails
);
router.post("/user/balances", verifyToken, balanceController.newBalance);
router.put("/user/balances", verifyToken, balanceController.updateBalance);
router.post("/user/budgetings", verifyToken, budgetingController.newBudget);
router.put(
  "/user/budgetings",
  verifyToken,
  budgetingController.updateBudgeting
);
router.post(
  "/user/diaries",
  verifyToken,
  upload.single("image"),
  diaryController.newDiary
);

module.exports = router;
