const _ = require('lodash');
const CandidateModel = require('../models/candidate');
const {
  ApiConstants
} = require('../constants/statusCodes');

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await CandidateModel.find({});
    return res.send({
      status: 'Success',
      candidates: candidates
    });
  } catch (err) {
    return res.status(ApiConstants.BAD_REQUEST.statusCode).send({
      status: ApiConstants.BAD_REQUEST.status,
      error: err.message
    });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const {
      _id,
      name,
      noOfChallengesSolved,
      expertiseLevel,
      expertiseIn
    } = req.body;
    const candidate = await CandidateModel.findOneAndUpdate({
      _id: _id
    }, {
      name,
      noOfChallengesSolved,
      expertiseIn,
      expertiseLevel
    }, {
      new: true
    });
    return res.send(candidate);
  } catch (err) {
    return res.status(ApiConstants.BAD_REQUEST.statusCode).send({
      status: ApiConstants.BAD_REQUEST.status,
      error: err.message
    });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const candidateId = req.params.candidateId;

    if (!candidateId || typeof (candidateId) !== 'string') {
      return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
        status: ApiConstants.PRE_CONDITION_FAILED.status,
        error: 'Candidate Id should be a valid id'
      });
    }

    await CandidateModel.findOneAndRemove({
      _id: candidateId
    });

    return res.send({
      status: 'Success'
    });
  } catch (err) {
    return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
      status: ApiConstants.PRE_CONDITION_FAILED.status,
      error: err.message
    });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidateId = req.params.candidateId;

    if (!candidateId || typeof (candidateId) !== 'string') {
      return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
        status: ApiConstants.PRE_CONDITION_FAILED.status,
        error: 'Candidate Id should be a valid id'
      });
    }

    const candidate = await CandidateModel.findOne({
      _id: candidateId
    });
    return res.send(candidate)
  } catch (err) {
    return res.status(ApiConstants.BAD_REQUEST.statusCode).send({
      status: ApiConstants.BAD_REQUEST.status,
      error: err.message
    });
  }
};

module.exports = {
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate
}