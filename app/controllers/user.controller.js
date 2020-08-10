const {
  v4: uuidv4
} = require('uuid');
const _ = require('lodash');

const User = require('../models/user.js');
const CandidateModel = require('../models/candidate');

const {
  ApiConstants
} = require('../constants/statusCodes');

const getUserById = async (req, res) => {

  try {
    const userId = req.params.userId;

    if (!userId || typeof (userId) !== 'string') {
      return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
        status: ApiConstants.PRE_CONDITION_FAILED.status,
        error: 'User does not exist'
      });
    }

    const user = await User.findOne({
      _id: userId
    });
    const {
      _id,
      name,
      isVoted,
      authToken,
      isAdmin
    } = user;
    return res.send({
      userId: _id,
      name,
      isVoted,
      authToken,
      isAdmin
    });
  } catch (err) {
    return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
      status: ApiConstants.PRE_CONDITION_FAILED.status,
      error: err.message
    });
  }
};

const getUserByToken = async (req, res) => {
  try {
    const authToken = req.params.authToken;

    if (!authToken || typeof (authToken) !== 'string') {
      return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
        status: ApiConstants.PRE_CONDITION_FAILED.status,
        error: 'User token does not exist'
      });
    }

    const user = await User.findOne({
      authToken: authToken
    });
    const {
      _id,
      name,
      isVoted,
      isAdmin
    } = user;
    return res.send({
      userId: _id,
      name,
      isVoted,
      authToken,
      isAdmin
    });
  } catch (err) {
    return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
      status: ApiConstants.PRE_CONDITION_FAILED.status,
      error: err.message
    });
  }
};

const voteForCandidate = async (req, res) => {
  try {
    const userId = req.params.userId;
    const candidateId = req.params.candidateId;

    if (!userId || typeof (userId) !== 'string') {
      return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
        status: ApiConstants.PRE_CONDITION_FAILED.status,
        error: 'User Id not valid'
      });
    }

    if (!candidateId || typeof (candidateId) !== 'string') {
      return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
        status: ApiConstants.PRE_CONDITION_FAILED.status,
        error: 'Candidate Id not valid'
      });
    }

    const user = await User.findOne({ _id: userId });
    const {
      isVoted
    } = user;
    if (isVoted) {
      return res.status(ApiConstants.BAD_REQUEST.statusCode).send({
        status: ApiConstants.BAD_REQUEST.status,
        error: err.message
      });
    }

    user.isVoted = true;
    user.candidate = candidateId;

    await user.save();

    await CandidateModel.findOneAndUpdate({
      _id: candidateId
    }, {
      $inc: {
        'numberOfVotes': 1
      }
    }, {
      new: true
    });
    return res.status(200).json({
      message: 'OK'
    })
  } catch (err) {
    return res.status(ApiConstants.BAD_REQUEST.statusCode).send({
      status: ApiConstants.BAD_REQUEST.status,
      error: err.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const name = req.body.name;
    const passCode = req.body.passCode;

    if (!name || typeof (name) !== 'string') {
      return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
        status: ApiConstants.PRE_CONDITION_FAILED.status,
        error: 'User credentials not valid'
      });
    }

    if (!passCode || typeof (passCode) !== 'string') {
      return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
        status: ApiConstants.PRE_CONDITION_FAILED.status,
        error: 'User credentials not valid'
      });
    }

    const user = await User.findOne({
      name: name,
      passCode: passCode
    });
    const {
      _id,
      isVoted,
      isAdmin
    } = user;
    user.authToken = uuidv4();

    await user.save();

    return res.status(200).json({
      authToken: user.authToken,
      userId: _id,
      name: name,
      isVoted: isVoted,
      isAdmin: isAdmin
    })
  } catch (err) {
    return res.status(ApiConstants.BAD_REQUEST.statusCode).send({
      status: ApiConstants.BAD_REQUEST.status,
      error: err.message
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const authToken = req.headers['x-coda-global-app'];
    if (!authToken || typeof (authToken) !== 'string') {
      return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
        status: ApiConstants.PRE_CONDITION_FAILED.status,
        error: 'User token not valid'
      });
    }
    const user = await User.findOne({
      authToken: authToken
    });
    user.authToken = null;

    await user.save();

    return res.status(200).json({
      status: 'Success'
    })
  } catch (err) {
    res.status(ApiConstants.BAD_REQUEST.statusCode).send({
      status: ApiConstants.BAD_REQUEST.status,
      error: err.message
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const {
      name,
      passCode,
      isAdmin
    } = req.body;
    let user = new User();
    user.name = name;
    user.passCode = passCode;
    user.isAdmin = isAdmin;
    await user.save();
    return res.status(200).json({
      status: 'Success'
    })
  } catch (err) {
    return res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
      status: ApiConstants.PRE_CONDITION_FAILED.status,
      error: err.message
    });
  }
};

module.exports = {
  getUserById,
  getUserByToken,
  voteForCandidate,
  loginUser,
  logoutUser,
  registerUser
};
