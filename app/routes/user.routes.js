const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller.js');

// Find the first user
router.get('/api/user', users.findFirstUser);

// Insert a user in the User collection
router.post('/api/user/update', users.updateUser);

module.exports = router;
