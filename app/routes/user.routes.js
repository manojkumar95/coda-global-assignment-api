const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller.js');

// Find the user by userId
router.get('/users/:userId', users.getUserById);
router.get('/users/token/:authToken', users.getUserByToken);



// Insert a user in the User collection
router.put('/users/:userId/vote/:candidateId', users.voteForCandidate);

router.post('/users/login', users.loginUser);
router.post('/users/logout', users.logoutUser);

module.exports = router;
