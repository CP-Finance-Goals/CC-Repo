const db = require("../Config/database");

const userBalanceModel = {
  async createNew(request) {
    const { userId } = request.user;
    const { monthAndYear, balance, currentBalance } = request.body;

    const userRef = db.collection("users").doc(userId.toString());
    const userBalanceRef = userRef
      .collection("userBalance")
      .doc(monthAndYear.toString());

    const balanceData = {
      monthAndYear,
      balance: balance || null,
      currentBalance: currentBalance || null,
    };

    await userBalanceRef.set(balanceData);

    return { message: "Successfully added new balance", data: balanceData };
  },

  async updateBalance(request) {
    const { userId } = request.user;
    const { monthAndYear, balance, currentBalance } = request.body;

    const userRef = db.collection("users").doc(userId.toString());
    const userBalanceRef = userRef
      .collection("userBalance")
      .doc(monthAndYear.toString());

    const docSnapshot = await userBalanceRef.get();
    if (!docSnapshot.exists) {
      const result = await this.createNew(request);
      return {
        message:
          "Balance for the specified month and year does not exist. Successfully created new balance",
        data: result.data,
      };
    }

    const updatedBalanceData = {
      balance: balance || null,
      currentBalance: currentBalance || null,
    };

    await userBalanceRef.update(updatedBalanceData, { merge: true });

    return {
      message: "Balance updated successfully",
      data: updatedBalanceData,
    };
  },
};

module.exports = userBalanceModel;
