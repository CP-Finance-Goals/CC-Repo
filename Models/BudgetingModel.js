const db = require("../Config/database");

const budgetingModel = {
  async createNew(req) {
    const { userId } = req.user;
    const {
      monthAndYear,
      total,
      essentialNeedsLimit,
      wantsLimit,
      savingsLimit,
      isReminder,
    } = req.body;
    console.log(userId);
    console.log(monthAndYear);
    const userRef = db.collection("users").doc(userId.toString());
    const userBudgetingRef = userRef.collection("budgetings").doc(monthAndYear.toString());
    await userBudgetingRef.set({
      monthAndYear,
      total,
      essentialNeedsLimit,
      wantsLimit,
      savingsLimit,
      isReminder,
    });

    return { msg: "Successfully added budget" };
  },

  async updateBudget(req) {
    const { userId } = req.user;
    const {
      monthAndYear,
      total,
      essentialNeedsLimit,
      wantsLimit,
      savingsLimit,
      isReminder,
    } = req.body;

    const userRef = db.collection("users").doc(userId.toString());
    const userBudgetingRef = userRef.collection("budgetings").doc(monthAndYear.toString());

    const docSnapshot = await userBudgetingRef.get();
    if (!docSnapshot.exists) {
      if (!docSnapshot.exists) {
        const result = await this.createNew(userId, request);
        return {
          msg: "Budgeting for the specified month and year does not exist. Adding new budget...",
          detail: result,
        };
      }
    }

    await userBudgetingRef.update({
      total,
      essentialNeedsLimit,
      wantsLimit,
      savingsLimit,
      isReminder,
    });

    return { msg: "Budgeting updated successfully" };
  },
};

module.exports = budgetingModel;
