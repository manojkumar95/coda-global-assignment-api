const {
  v4: uuidv4
} = require('uuid');

const User = require('../models/user.js');
const CandidateModel = require('../models/candidate');

const {
  ApiConstants
} = require('../constants/statusCodes');

// const updateUser = (req, res) => {
//   const { user, firstName, lastName, phoneNumber } = req.body;
//   User.update(
//     { _id: user, firstName, lastName, phoneNumber }
//   )
//     .then(user => {
//       res.send(user);
//     }).catch(err => {
//       if (err.CastError) {
//         res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
//           status: ApiConstants.PRE_CONDITION_FAILED.status,
//           error: "User Id does not exist"
//         });
//       } else {
//         res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
//           status: ApiConstants.PRE_CONDITION_FAILED.status,
//           error: err.message
//         });
//       }
//     });
// };

const getUserById = (req, res) => {
  const userId = req.params.userId;
  User.findOne({
      _id: userId
    })
    .then(user => {
      const {
        _id,
        name,
        isVoted,
        authToken
      } = user;
      res.send({
        userId: _id,
        name,
        isVoted,
        authToken
      });
    }).catch(err => {
      res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
        status: ApiConstants.DATA_NOT_FOUND.status,
        error: err.message
      });
    });
};

const getUserByToken = (req, res) => {
  const authToken = req.params.authToken;
  User.findOne({
      authToken: authToken
    })
    .then(user => {
      const {
        _id,
        name,
        isVoted,
        authToken
      } = user;
      res.send({
        userId: _id,
        name,
        isVoted,
        authToken
      });
    }).catch(err => {
      res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
        status: ApiConstants.DATA_NOT_FOUND.status,
        error: err.message
      });
    });
};

const voteForCandidate = (req, res) => {
  const userId = req.params.userId;
  const candidateId = req.params.candidateId;
  User.findOne({
      _id: userId
    })
    .then(user => {
      const {
        isVoted
      } = user;
      if (isVoted) {
        return res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
          status: ApiConstants.DATA_NOT_FOUND.status,
          error: err.message
        });
      }
      user.isVoted = true;
      user.candidate = candidateId;
      user.save().then(() => {
        CandidateModel.findOneAndUpdate({
          _id: candidateId
        }, {
          $inc: {
            'numberOfVotes': 1
          }
        }, {
          new: true
        }).then(candidate => {
          res.status(200).json({
            message: 'OK'
          })
        }).catch(err => {
          return res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
            status: ApiConstants.DATA_NOT_FOUND.status,
            error: err.message
          });
        })

      }).catch(err => {
        return res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
          status: ApiConstants.DATA_NOT_FOUND.status,
          error: err.message
        });
      })
    }).catch(err => {
      return res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
        status: ApiConstants.DATA_NOT_FOUND.status,
        error: err.message
      });
    });
};

const loginUser = (req, res) => {
  const name = req.body.name;
  const passCode = req.body.passCode;

  User.findOne({
      name: name,
      passCode: passCode
    })
    .then(user => {
      console.log('user', user)
      const {
        _id,
        name,
        isVoted
      } = user;
      user.authToken = uuidv4();
      user.save().then(() => {
        res.status(200).json({
          authToken: user.authToken,
          userId: _id,
          name: name,
          isVoted: isVoted
        })
      }).catch(err => {
        return res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
          status: ApiConstants.DATA_NOT_FOUND.status,
          error: err.message
        });
      });
    }).catch(err => {
      res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
        status: ApiConstants.DATA_NOT_FOUND.status,
        error: err.message
      });
    });
};

const logoutUser = (req, res) => {
  const authToken = req.headers['x-coda-global-app'];
  User.findOne({
      authToken: authToken
    })
    .then(user => {
      user.authToken = null;
      user.save().then(() => {
        res.status(200).json({
          status: 'Success'
        })
      }).catch(err => {
        return res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
          status: ApiConstants.DATA_NOT_FOUND.status,
          error: err.message
        });
      });
    }).catch(err => {
      res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
        status: ApiConstants.DATA_NOT_FOUND.status,
        error: err.message
      });
    });
};

module.exports = {
  getUserById,
  getUserByToken,
  voteForCandidate,
  loginUser,
  logoutUser
};
