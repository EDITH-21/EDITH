const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Expense description title is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    type: {
      type: String,
      enum: ['Expense', 'Income', 'Savings'],
      default: 'Expense',
    },
    category: {
      type: String,
      enum: ['Food', 'Transport', 'Bills', 'Shopping', 'Entertainment', 'Healthcare', 'Education', 'Salary', 'Investment', 'Others'],
      default: 'Food',
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Card', 'Cash', 'Net Banking'],
      default: 'UPI',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Expense', expenseSchema);
