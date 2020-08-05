const Expense = require('../models/expense.js');
const Category = require('../models/category.js');
const ExpenseService = require('../service/expense.service.js');
const { ApiConstants } = require('../constants/statusCodes');
const Moment = require('moment');

const findAllExpenses = (req, res) => {
    Expense.find({ user: req.body.user })
        .populate('categories')
        .exec((err, expenses) => {
            if (err) {
                res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
                    status: ApiConstants.DATA_NOT_FOUND.status,
                    error: err.message
                });
            };
            let expensesList = [];
            expenses.forEach(expense => {
                const { _id, title, amount, notes, user, createdAt, categories } = expense;
                expensesList.push({
                    id: _id,
                    title,
                    amount,
                    createdAt,
                    categories,
                    notes,
                    user
                });
            })
            res.send({
                status: 'Success',
                expenses: expensesList
            });
        });
}

const createExpense = (req, res) => {
    Expense.create(req.body)
        .then(expense => {
            const { _id, title, amount, notes, user, categories, createdAt } = expense;
            res.send({
                status: 'Success',
                category: {
                    id: _id,
                    title,
                    amount,
                    notes,
                    user,
                    categories,
                    createdAt
                }
            });
            res.send(expense);
        }).catch(err => {
            if (err.errors && err.errors) {
                const { title, amount, categories, user } = err.errors;
                let errorMsg = '';
                if (title) {
                    errorMsg = title.message;
                } else if (amount) {
                    errorMsg = amount.message;
                } else if (categories) {
                    errorMsg = categories.message;
                } else if (err.errors.user) {
                    errorMsg = user.message;
                }
                res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
                    status: ApiConstants.PRE_CONDITION_FAILED.status,
                    error: errorMsg
                });
            } else {
                res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
                    status: ApiConstants.PRE_CONDITION_FAILED.status,
                    error: err.message
                });
            }
        });
};

const findExpenseByPeriodRange = (req, res) => {
    let { fromDate = new Date(), period, user } = req.body;
    if (!fromDate) fromDate = new Date();
    let endDate = '';
    fromDate = Moment(fromDate).valueOf();
    if (period === 'month') {
        endDate = Moment(fromDate).add(30, 'days').valueOf();
    } else if (period === 'week') {
        endDate = Moment(fromDate).add(7, 'days').valueOf();
    } else if (period === 'day') {
        endDate = Moment(fromDate).add(1, 'days').valueOf();
    }
    Category.find()
        .then(categoriesList => {
            ExpenseService.findExpenseSumOnCategory(categoriesList, fromDate, endDate, user, (value, err) => {
                if (err) {
                    res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
                        status: ApiConstants.DATA_NOT_FOUND.status,
                        error: err.message
                    });
                }
                res.send(value);
            });
        }).catch(err => {
            categories = [];
        });
};

module.exports = {
    createExpense,
    findAllExpenses,
    findExpenseByPeriodRange
};
