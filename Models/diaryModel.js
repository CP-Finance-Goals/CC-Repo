const db = require("../Config/database");
const moment = require("moment");

const diaryModel = {
  async createNew(userId, request) {
    const {
      monthAndYear,
      date,
      proofImgUrl,
      description,
      amount,
      categoryId,
      isExpense,
    } = request;

    const today = moment().format("YYYY-MM-DD HH:mm:ss");
    const userRef = db.collection("users").doc(userId.toString());
    const budgetingDiaryRef = userRef
      .collection("budgeting_diaries")
      .doc(today);
    const snapshot = await userRef.collection("budgeting_diaries").get();
    let newId = snapshot.size + 1;

    if (newId == NaN) {
      console.log(newId);
      return console.log("newId tidak boleh null");
    }

    await budgetingDiaryRef.set({
      id: newId,
      monthAndYear,
      date,
      proofImgUrl,
      description,
      amount,
      categoryId,
      isExpense,
    });

    //adding point into userprofile
    try {
      const userRef = db.collection("users").doc(userId.toString());
      const itemRef = userRef.collection("userItems").doc("userProfile");

      await itemRef.update({
        point: newId,
      });

      console.log("Point has been updated");
    } catch (error) {
      console.error("Error updating point:", error);
    }

    return { msg: "Successfully added budgeting diary" };
  },

  async updateDiary(userId, diaryId, updates) {
    console.log(diaryId);
    const userRef = db.collection("users").doc(userId.toString());
    const budgetingDiaryRef = userRef
      .collection("budgeting_diaries")
      .where("id", "==", parseInt(diaryId));
    const snapshot = await budgetingDiaryRef.get();

    if (snapshot.empty) {
      const result = await this.createNew(userId, updates);
      return {
        msg: "Diaries for the specified month and year does not exist. Adding new diaries...",
        detail: result,
      };
    }

    const diaryDoc = snapshot.docs[0];
    await diaryDoc.ref.update(updates);

    return { msg: "Budgeting updated successfully" };
  },
};

module.exports = diaryModel;
