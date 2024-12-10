const uploadToCloud = require("../Middleware/UploadToStorage");
const expenseModel = require("../Models/ExpensesModel");

const expensesController = {
  async updateExpenses(req, res) {
    const { userId } = req.user;
    const {
      monthAndYear,
      date,
      description,
      amount,
      categoryId,
      total = 0,
      essentialNeedsLimit = 0,
      wantsLimit = 0,
      savingsLimit = 0,
      isReminder = false,
      balance = 0,
      currentBalance = 0,
    } = req.body;

    try {
      const photoUrl = await uploadToCloud(req.file, "diary-photos");

      const expenses = {
        monthAndYear,
        date,
        photoUrl,
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
      };

      await expenseModel.editExpenses(userId, expenses);
      return res.status(201).json({
        message: "Expenses (Budgeting, Diary, Balance) successfully updated",
        photoUrl,
      });
    } catch (error) {
      console.error("Error updating expenses:", error.message);
      return res.status(500).json({ message: error.message });
    }
  },

  async newExpenses(req, res) {
    const { userId } = req.user;

    try {
      const {
        monthAndYear,
        total = 0,
        essentialNeedsLimit = 0,
        wantsLimit = 0,
        savingsLimit = 0,
        isReminder = false,
        balance = 0,
        currentBalance = 0,
        username,
        dob,
        savings,
      } = req.body;

      let photoUrl;

      if (req.file) {
        photoUrl = await uploadToCloud(req.file, "profile-pictures");
      } else {
        photoUrl = null;
      }

      const expenses = {
        monthAndYear,
        total,
        essentialNeedsLimit,
        wantsLimit,
        savingsLimit,
        isReminder,
        balance,
        currentBalance,
        username,
        dob: dob.toString(),
        savings: parseFloat(savings),
        photoUrl,
      };

      const result = await expenseModel.addExpenses(userId, expenses);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error creating expenses:", error.message);
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = expensesController;
