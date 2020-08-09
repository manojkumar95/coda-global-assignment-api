const CandidateModel = require('../models/candidate');
const {
  ApiConstants
} = require('../constants/statusCodes');

const getAllCandidates = (req, res) => {
  CandidateModel.find({
      isDeleted: false
    })
    .then(candidates => {
      // let categoryList = [];
      // categories.forEach(candidate => {
      //     const { _id, name, type } = candidate;
      //     categoryList.push({
      //         id: _id,
      //         name,
      //         type
      //     });
      // })
      res.send({
        status: 'Success',
        candidates: candidates
      });
    }).catch(err => {
      res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
        status: ApiConstants.DATA_NOT_FOUND.status,
        error: err.message
      });
    });
};

const updateCandidate = (req, res) => {
  CandidateModel.create(req.body)
    .then(candidate => {
      const {
        _id,
        name,
        type
      } = candidate;
      res.send({
        status: 'Success',
        candidate: {
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

const deleteCandidate = (req, res) => {
  CandidateModel.create(req.body)
    .then(candidate => {
      const {
        _id,
        name,
        type
      } = candidate;
      res.send({
        status: 'Success',
        candidate: {
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

const getCandidateById = (req, res) => {
  const candidateId = req.params.candidateId;
  CandidateModel.findOne({
      _id: candidateId
    })
    .then(candidate => {
      // let categoryList = [];
      // categories.forEach(candidate => {
      //     const { _id, name, type } = candidate;
      //     categoryList.push({
      //         id: _id,
      //         name,
      //         type
      //     });
      // })
      console.log('candidateId', candidateId)
      console.log('candidate', candidate)
      res.send(candidate);
    }).catch(err => {
      res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
        status: ApiConstants.DATA_NOT_FOUND.status,
        error: err.message
      });
    });
};

module.exports = {
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate
}