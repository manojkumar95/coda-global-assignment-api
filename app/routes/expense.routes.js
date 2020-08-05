const express = require('express');
const router = express.Router();
const expenses = require('../controllers/expense.controller.js');

// Find all expenses
router.post('/api/expenses', expenses.findAllExpenses);

// Find expenses by range period (daily, weekly or monthly)
router.post('/api/expenses/filter', expenses.findExpenseByPeriodRange);

// Insert a expense in the Expense collection
router.post('/api/expense/create', expenses.createExpense);

module.exports = router;