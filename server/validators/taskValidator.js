const { check } = require('express-validator');

exports.taskValidation = [
  check('title', 'Title is required').not().isEmpty(),
  check('status', 'Invalid task status').optional().isIn(['To Do', 'In Progress', 'Review', 'Completed']),
  check('priority', 'Invalid priority level').optional().isIn(['Low', 'Medium', 'High']),
];
