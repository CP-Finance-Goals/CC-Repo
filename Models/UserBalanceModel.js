const db = require("../Config/database");

const userBalanceModel = {
  async createNew(request) {
    const { userId } = request.user;
    const { monthAndYear, balance, currentBalance } = request.body;

    const userRef = db.collection("users").doc(userId.toString());
    const userBalanceRef = userRef.collection("userBalance").doc(monthAndYear);
    await userBalanceRef.set({
      monthAndYear,
      balance,
      currentBalance,
    });

    return { msg: "Successfully added balance" };
  },

  async updateBalance(request) {
    const { userId } = request.user;

    const { monthAndYear, balance, currentBalance } = request.body;

    const userRef = db.collection("users").doc(userId.toString());
    const userBalanceRef = userRef.collection("userBalance").doc(monthAndYear);

    const docSnapshot = await userBalanceRef.get();
    if (!docSnapshot.exists) {
      const result = await this.createNew(request);
      return {
        msg: "Balance for the specified month and year does not exist. Adding new balance...",
        detail: result,
      };
    }

    await userBalanceRef.update({
      balance,
      currentBalance,
    });

    return { msg: "Balance updated successfully" };
  },
};

module.exports = userBalanceModel;
