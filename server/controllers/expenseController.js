const Expense = require('../models/Expense');
const Budget = require('../models/Budget');

// @desc    Get all expenses for user
// @route   GET /api/v1/expenses
// @access  Private
exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    const budget = await Budget.findOne({ user: req.user.id }) || { monthlyBudget: 40000 };

    res.status(200).json({
      success: true,
      count: expenses.length,
      budget: budget.monthlyBudget,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add expense
// @route   POST /api/v1/expenses
// @access  Private
exports.createExpense = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const expense = await Expense.create(req.body);
    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete expense
// @route   DELETE /api/v1/expenses/:id
// @access  Private
exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    await expense.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
