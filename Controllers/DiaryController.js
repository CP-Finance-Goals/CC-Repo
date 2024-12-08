const diaryModel = require("../Models/DiaryModel");
const uploadToCloud = require("../Middleware/UploadToStorage");

const diaryController = {
  async newDiary(req, res) {
    const { userId } = req.user;
    const { monthAndYear, date, description, amount, categoryId } = req.body;

    let photoUrl;

    if (req.file) {
      try {
        photoUrl = await uploadToCloud(req.file, "diary-photos");
      } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({ message: "Failed to upload image." });
      }
    } else {
      photoUrl = null;
    }

    const diary = {
      monthAndYear,
      date,
      photoUrl,
      description,
      amount,
      categoryId,
    };

    try {
      const result = await diaryModel.createNew(userId, diary);
      res.status(201).json({
        message: "Diary successfully added",
        photoUrl: result.photoUrl,
      });
    } catch (error) {
      console.error("Error creating diary:", error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = diaryController;
