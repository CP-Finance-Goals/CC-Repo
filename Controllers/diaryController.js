import BudgetingDiary from "../Models/diaryModel.js";
import { uploadToCloud } from "../Middleware/uploadToStorage.js";

// Get all records
export const getAllDiaries = async (req, res) => {
  try {
    const diaries = await BudgetingDiary.findAll();
    res.json(diaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single record by ID
export const getDiaryById = async (req, res) => {
  try {
    const record = await BudgetingDiary.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Diary not found" });
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new record
export const createDiary = async (req, res) => {
  try {
    const {
      userId,
      monthAndYear,
      date,
      description,
      amount,
      categoryId,
      isExpense,
    } = req.body;

    let photoUri = null;

    // Proses upload file jika ada
    if (req.file) {
      photoUri = await uploadToCloud(req.file); // Upload ke cloud storage dan dapatkan URL
    }

    // Simpan data ke database
    const newEntry = await BudgetingDiary.create({
      userId: parseInt(userId, 10),
      monthAndYear,
      date,
      description,
      amount,
      categoryId,
      isExpense,
      photoUri, // URL gambar yang dihasilkan
    });

    res.status(201).json(newEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create budgeting diary entry" });
  }
};

// Update a record by ID
export const updateDiary = async (req, res) => {
  try {
    const [updated] = await BudgetingDiary.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: "Diary not found" });
    }
    res.json({ message: "Diary updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a record by ID
export const deleteDiary = async (req, res) => {
  try {
    const deleted = await BudgetingDiary.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: "Diary not found" });
    }
    res.json({ message: "Diary deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
