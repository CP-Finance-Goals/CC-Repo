import User from "./userModel.js";
import Budgeting from "./budgetingModel.js";
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const BudgetingDiary = db.define(
  "BudgetingDiary",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER, // Ubah tipe ke INTEGER
      allowNull: false,
    },
    monthAndYear: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    date: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    photoUri: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isExpense: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "budgeting_diary",
    timestamps: false,
  }
);

BudgetingDiary.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
BudgetingDiary.belongsTo(Budgeting, {
  foreignKey: "monthAndYear",
  onDelete: "CASCADE",
});

export default BudgetingDiary;
