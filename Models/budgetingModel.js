import User from "./userModel.js";
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Budgeting = db.define(
  "Budgeting",
  {
    monthAndYear: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true, // PK
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // FK ke tabel users
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    essentialNeedsLimit: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    wantsLimit: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    savingsLimit: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    isReminder: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "budgeting",
    timestamps: false,
  }
);

Budgeting.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

export default Budgeting;
