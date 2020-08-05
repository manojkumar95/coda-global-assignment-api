const Category = require('../models/category.js');
const { ApiConstants } = require('../constants/statusCodes');

const findAllCategories = (req, res) => {
    Category.find()
        .then(categories => {
            // let categoryList = [];
            // categories.forEach(category => {
            //     const { _id, name, type } = category;
            //     categoryList.push({
            //         id: _id,
            //         name,
            //         type
            //     });
            // })
            res.send({
                status: 'Success',
                categories: categories
            });
        }).catch(err => {
            res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
                status: ApiConstants.DATA_NOT_FOUND.status,
                error: err.message
            });
        });
};

const createCategory = (req, res) => {
    Category.create(req.body)
        .then(category => {
            const { _id, name, type } = category;
            res.send({
                status: 'Success',
                category: {
                    id: _id,
                    name,
                    type
                }
            });
        }).catch(err => {
            if (err.errors && err.errors.name) {
                res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
                    status: ApiConstants.PRE_CONDITION_FAILED.status,
                    error: err.errors.name.message
                });
            } else {
                res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
                    status: ApiConstants.PRE_CONDITION_FAILED.status,
                    error: err.message
                });
            }
        });
};

module.exports = {
    createCategory,
    findAllCategories
}