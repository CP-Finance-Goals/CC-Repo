const db = require("../Config/database");
const moment = require("moment");

const diaryModel = {
  async createNew(userId, request) {
    const {
      monthAndYear,
      date,
      photoUrl,
      description,
      amount,
      categoryId,
    } = request;

    const diaryId = Date.now();

    const userRef = db.collection("users").doc(userId.toString());
    const diaryRef = userRef.collection("budgeting_diaries").doc(diaryId.toString());

    const diaryData = {
      id: diaryId,
      monthAndYear,
      date,
      photoUrl: photoUrl || null,
      description: description || null,
      amount,
      categoryId,
      isExpense: true,
    };

    await diaryRef.set(diaryData);

    return { message: "Diary added successfully", photoUrl };
  },

};

module.exports = diaryModel;
