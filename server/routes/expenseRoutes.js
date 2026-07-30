const express = require('express');
const { getExpenses, createExpense, deleteExpense } = require('../controllers/expenseController');
const { expenseValidation } = require('../validators/expenseValidator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getExpenses)
  .post(expenseValidation, validate, createExpense);

router.route('/:id')
  .delete(deleteExpense);

module.exports = router;
