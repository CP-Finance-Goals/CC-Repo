const db = require("../Config/database");

const expenseModel = {
  async editExpenses(userId, request) {
    const {
      monthAndYear,
      date,
      description,
      amount,
      categoryId,
      total,
      essentialNeedsLimit,
      wantsLimit,
      savingsLimit,
      isReminder,
      balance,
      currentBalance,
      photoUrl,
    } = request;

    const diaryId = Date.now();

    const userRef = db.collection("users").doc(userId.toString());

    const diaryRef = userRef
      .collection("budgeting_diaries")
      .doc(diaryId.toString());

    const userBalanceRef = userRef
      .collection("userBalance")
      .doc(monthAndYear.toString());

    const userBudgetingRef = userRef
      .collection("budgetings")
      .doc(monthAndYear.toString());

    const budgetSnapshot = await userBudgetingRef.get();
    if (!budgetSnapshot.exists) {
      await userBudgetingRef.set({
        monthAndYear,
        total,
        essentialNeedsLimit,
        wantsLimit,
        savingsLimit,
        isReminder,
      });
      return {
        message:
          "Budget for the specified month and year does not exist. Successfully created new budget.",
      };
    } else {
      await userBudgetingRef.update({
        total,
        essentialNeedsLimit,
        wantsLimit,
        savingsLimit,
        isReminder,
      });
    }

    const balanceSnapshot = await userBalanceRef.get();
    if (!balanceSnapshot.exists) {
      await userBalanceRef.set({
        monthAndYear,
        balance: balance || 0,
        currentBalance: currentBalance || 0,
      });
      return {
        message:
          "Balance for the specified month and year does not exist. Successfully created new balance.",
      };
    } else {
      await userBalanceRef.update({
        balance: balance || 0,
        currentBalance: currentBalance || 0,
      });
    }

    const diarySnapshot = await diaryRef.get();
    if (!diarySnapshot.exists) {
      await diaryRef.set({
        id: diaryId,
        monthAndYear,
        date,
        photoUrl: photoUrl || null,
        description: description || null,
        amount,
        categoryId,
        isExpense: true,
      });
      return {
        message:
          "Diary for the specified month and year does not exist. Successfully created new diary.",
      };
    } else {
      await diaryRef.update({
        date,
        photoUrl: photoUrl || null,
        description: description || null,
        amount,
        categoryId,
      });
    }

    return { message: "Expenses updated successfully." };
  },

  async addExpenses(userId, request) {
    const {
      monthAndYear,
      total,
      essentialNeedsLimit,
      wantsLimit,
      savingsLimit,
      isReminder,
      balance,
      currentBalance,
      username,
      dob,
      savings,
      photoUrl,
    } = request;

    const userRef = db.collection("users").doc(userId.toString());
    const userDetailsRef = userRef.collection("userProfile").doc("profile");
    const userBalanceRef = userRef
      .collection("userBalance")
      .doc(monthAndYear.toString());
    const userBudgetingRef = userRef
      .collection("budgetings")
      .doc(monthAndYear.toString());

    await userBalanceRef.set({
      monthAndYear,
      balance: balance || 0,
      currentBalance: currentBalance || 0,
    });

    await userBudgetingRef.set({
      monthAndYear,
      total,
      essentialNeedsLimit,
      wantsLimit,
      savingsLimit,
      isReminder,
    });

    const detailsDoc = await userDetailsRef.get();
    if (!detailsDoc.exists) {
      throw new Error("User details not found");
    }

    const existingDetails = detailsDoc.data();

    const mergedUpdates = {
      username: username || existingDetails.username,
      dob: dob || existingDetails.dob,
      savings: savings !== undefined ? savings : existingDetails.savings,
      photoUrl: photoUrl || existingDetails.photoUrl,
    };

    await userDetailsRef.set(mergedUpdates, { merge: true });

    return {
      message: "Expenses has been added",
      photoUrl: mergedUpdates.photoUrl,
    };
  },
};

module.exports = expenseModel;
