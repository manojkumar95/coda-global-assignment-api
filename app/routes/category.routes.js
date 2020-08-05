const express = require('express');
const router = express.Router();
const categories = require('../controllers/category.controller.js');

// Find all categories
router.get('/categories', categories.findAllCategories);

// Insert a category in the Category collection
router.post('/categories', categories.createCategory);

module.exports = router;
