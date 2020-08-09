const express = require('express');
const router = express.Router();
const candidates = require('../controllers/candidate.controller.js');

// Find all categories
router.get('/candidates', candidates.getAllCandidates);
router.get('/candidates/:candidateId', candidates.getCandidateById);


// Insert a candidate in the candidate collection
// router.post('/candidates', candidates.createCategory);
router.put('/candidates/:candidateId', candidates.updateCandidate);
router.delete('/candidates/:candidateId', candidates.deleteCandidate);


module.exports = router;
