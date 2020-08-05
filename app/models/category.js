const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category Name required'],
        maxlength: [100, 'Category Name exceeds 100 characters']
    },
    type: {
        type: String,
        required: true,
        default: 'Custom'
    } // to identify if category exists by default or custom created by user
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);