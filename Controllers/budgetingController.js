import Budgeting from "../Models/budgetingModel.js";

// Get all records
export const getAllRecord = async (req, res) => {
  try {
    const records = await Budgeting.findAll();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single record by monthAndYear and userId
export const getRecordById = async (req, res) => {
  const { monthAndYear, userId } = req.params;
  try {
    const record = await Budgeting.findOne({ where: { monthAndYear, userId } });
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new record
export const createRecord = async (req, res) => {
  try {
    const {
      monthAndYear,
      userId,
      total,
      essentialNeedsLimit,
      wantsLimit,
      savingsLimit,
      isReminder,
    } = req.body;

    const newRecord = await Budgeting.create({
      monthAndYear,
      userId: parseInt(userId, 10),
      total,
      essentialNeedsLimit,
      wantsLimit,
      savingsLimit,
      isReminder,
    });

    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a record by monthAndYear and userId
export const updateRecord = async (req, res) => {
  const { monthAndYear, userId } = req.params;
  try {
    const [updated] = await Budgeting.update(req.body, {
      where: { monthAndYear, userId },
    });
    if (!updated) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ message: "Record updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a record by monthAndYear and userId
export const deleteRecord = async (req, res) => {
  const { monthAndYear, userId } = req.params;
  try {
    const deleted = await Budgeting.destroy({
      where: { monthAndYear, userId },
    });
    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
