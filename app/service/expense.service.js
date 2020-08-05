const Expense = require('../models/expense.js');
const mongoose = require('mongoose');

// Find the sum of expenses associated with each category
const findExpenseSumOnCategory = async (categoriesList, fromDate, endDate, user, callback) => {
    let amountMap = { ...categoriesList };
    try {
        await Promise.all(categoriesList.map(async (category, index) => {
            amountMap[index] = { ...amountMap[index], amount: 0 };
            await new Promise(async (resolve, reject) => {
                await Expense.find({
                    'categories': mongoose.Types.ObjectId(category._id),
                    'createdAt': { $gte: fromDate, $lte: endDate },
                    'user': user

                })
                    .then(async (expenses, err) => {
                        if (err) {
                            reject();
                        }
                        await Promise.all(expenses.map(async (expense, indexValue) => {
                            if (expense && amountMap[indexValue]) {
                                amountMap[indexValue].amount = amountMap[indexValue].amount + parseInt(expense.amount, 10);
                            }
                            resolve();
                        }))
                    })
                resolve();
            })
        })
        )
    } catch (err) {
        return (null, err);
    }
    return callback(amountMap, null);
}

module.exports = { findExpenseSumOnCategory };
