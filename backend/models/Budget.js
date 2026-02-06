// models/Budget.js
const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  category: String,
  amount: Number,
  period: {
    type: String,
    enum: ["weekly", "monthly", "yearly"],
    default: "monthly",
  },
  alertThreshold: {
    type: Number,
    default: 80,
  },
}, { timestamps: true });

module.exports = mongoose.model("Budget", budgetSchema);
