const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ExpenseSchema = Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: [100, 'Title exceeds 100 characters']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        max: [100000000000, 'Amount exceeds maximum limit']
    },
    notes: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    }],
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Expense', ExpenseSchema);