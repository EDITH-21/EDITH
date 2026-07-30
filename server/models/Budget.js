const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    monthlyBudget: {
      type: Number,
      default: 40000,
    },
    month: {
      type: String,
      required: true, // e.g. "May 2025" or "2025-05"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Budget', budgetSchema);
