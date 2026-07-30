const { check } = require('express-validator');

exports.expenseValidation = [
  check('title', 'Expense description title is required').not().isEmpty(),
  check('amount', 'Amount must be a positive number').isNumeric(),
];
