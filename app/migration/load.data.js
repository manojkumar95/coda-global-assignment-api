const mongoose = require('mongoose');

const User = require('../models/user.js');
const Category = require('../models/category.js');

const loadInitialData = () => {
    mongoose.connection.db.dropDatabase((err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Initial loading started');
            createUser();
            createCategories();
        }
    });
}

const createUser = () => {
    const user = new User({
        firstName: "Sample",
        lastName: "User",
        phoneNumber: "1234567890"
    });
    User.create(user, (err, user) => {
        if (err) {
            console.log(err);
        }
    })
}

const createCategories = () => {
    const categoryData =
        [
            { name: 'Shopping', type: 'Default' },
            { name: 'Food', type: 'Default' },
            { name: 'Electricity', type: 'Default' },
            { name: 'Fuel', type: 'Default' }

        ];
    Category.insertMany(categoryData, (err, categories) => {
        if (err) {
            console.log(err);
        }
        console.log('Initial loading finished');
    })
}

module.exports = {
    loadInitialData
};