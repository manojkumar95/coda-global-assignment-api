'use strict';

const config = require('config'),
  mongoose = require('mongoose'),
  mongodbURL = config.get('db'),
  Promise = require('bluebird');

/**
 * Configuring mongoose Promise with Bluebird Promises
 * Referrence: http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = Promise;

module.exports = {
  connection: null,

  connect: function () {
    if (this.connection) {
      return this.connection;
    }
    this.connection = mongoose.connect(mongodbURL, {})
      .then(() => {
        console.log('Connected to MongoDB. MongoDB URL: "' + mongodbURL + '"');
      })
      .catch(err => {
        console.error('Failed to connect to MongoDB. Error:', err);
      });

    return this.connection
  }
};
