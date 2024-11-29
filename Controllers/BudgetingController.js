const budgetingModel = require("../Models/BudgetingModel");

const budgetingController = {
  async newBudget(req, res) {
    try {
      console.log(req.body);
      const result = await budgetingModel.createNew(req);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  async updateBudgeting(req, res) {
    try {
      const result = await budgetingModel.updateBudget(req);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = budgetingController;
