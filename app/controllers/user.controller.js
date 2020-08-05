const User = require('../models/user.js');
const { ApiConstants } = require('../constants/statusCodes');

const updateUser = (req, res) => {
  const { user, firstName, lastName, phoneNumber } = req.body;
  User.update(
    { _id: user, firstName, lastName, phoneNumber }
  )
    .then(user => {
      res.send(user);
    }).catch(err => {
      if (err.CastError) {
        res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
          status: ApiConstants.PRE_CONDITION_FAILED.status,
          error: "User Id does not exist"
        });
      } else {
        res.status(ApiConstants.PRE_CONDITION_FAILED.statusCode).send({
          status: ApiConstants.PRE_CONDITION_FAILED.status,
          error: err.message
        });
      }
    });
};

const findFirstUser = (req, res) => {
  User.findOne()
    .then(user => {
      const { _id, firstName, lastName, phoneNumber } = user;
      res.send({
        userId: _id,
        firstName,
        lastName,
        phoneNumber
      });
    }).catch(err => {
      res.status(ApiConstants.DATA_NOT_FOUND.statusCode).send({
        status: ApiConstants.DATA_NOT_FOUND.status,
        error: err.message
      });
    });
};

module.exports = {
  findFirstUser,
  updateUser
};
