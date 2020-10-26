const express = require('express');
const expenseController = require('../controller/expenses');
const authCheck = require('../middleware/check-auth');
const router = express.Router();

router.post('', expenseController.createExpense);

router.get('', expenseController.getExpenses);

router.get('/:id', expenseController.getExpenseById);

router.delete('/:id', expenseController.deleteExpense);

router.put('', expenseController.updateExpense);

module.exports = router;
