'use strict';

const config = require('config');
const mongoose = require('mongoose');
const mongodbURL = config.get('db');
const Promise = require('bluebird');
const { loadInitialData } = require('../migration/load.data')

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
        loadInitialData();
      })
      .catch(err => {
        console.error('Failed to connect to MongoDB. Error:', err);
      });

    return this.connection
  }
};
