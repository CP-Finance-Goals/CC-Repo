const diaryModel = require("../Models/DiaryModel");
const uploadToCloud = require("../Middleware/UploadToStorage");

const diaryController = {
  async newDiary(req, res) {
    const { userId } = req.user;
    const { monthAndYear, date, description, amount, categoryId, isExpense } =
      req.body;

    let proofImgUrl = null;

    if (req.file) {
      proofImgUrl = await uploadToCloud(req.file, "proof-image"); // URL from Cloud Storage
    }

    const diary = {
      monthAndYear,
      date,
      proofImgUrl,
      description,
      amount,
      categoryId,
      isExpense,
    };

    try {
      const result = await diaryModel.createNew(userId, diary);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  async updateDiaries(req, res) {
    const { userId } = req.user;
    const {
      diaryId,
      monthAndYear,
      date,
      description,
      amount,
      categoryId,
      isExpense,
    } = req.body;

    let proofImgUrl;

    if (req.file) {
      console.log("file diterima");
      proofImgUrl = await uploadToCloud(req.file, "proof-image"); // URL from Cloud Storage
    } else {
      proofImgUrl = req.body.proofImgUrl;
    }

    const diary = {
      monthAndYear,
      date,
      proofImgUrl,
      description,
      amount,
      categoryId,
      isExpense,
    };

    try {
      const result = await diaryModel.updateDiary(userId, diaryId, diary);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = diaryController;
