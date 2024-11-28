const userBalanceModel = require("../Models/UserBalanceModel");

const balanceController = {
  async newBalance(req, res) {
    try {
      const result = await userBalanceModel.createNew(req);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  async updateBalance(req, res) {
    try {
      const result = await userBalanceModel.updateBalance(req);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = balanceController;
