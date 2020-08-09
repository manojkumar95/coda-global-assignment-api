const mongoose = require('mongoose');

const User = require('../models/user');
const Candidate = require('../models/candidate');

const loadInitialData = () => {
  mongoose.connection.db.dropDatabase((err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Initial loading started');
        createUsers();
        createCandidates();
    }
});
}

const createUsers = () => {
  const userData = [{
      name: 'user1',
      passCode: 'user1',
      isAdmin: false
    },
    {
      name: 'user2',
      passCode: 'user2',
      isAdmin: false
    }, {
      name: 'user3',
      passCode: 'user3',
      isAdmin: false
    }, {
      name: 'admin1',
      passCode: 'admin1',
      isAdmin: true
    }, {
      name: 'admin2',
      passCode: 'admin2',
      isAdmin: true
    },
    {
      name: 'candidate1',
      passCode: 'candidate1',
      isAdmin: false
    },
    {
      name: 'candidate2',
      passCode: 'candidate2',
      isAdmin: false
    }, {
      name: 'candidate3',
      passCode: 'candidate3',
      isAdmin: false
    }, {
      name: 'candidate4',
      passCode: 'candidate4',
      isAdmin: false
    }, {
      name: 'candidate5',
      passCode: 'candidate5',
      isAdmin: false
    }
  ];
  User.insertMany(userData, (err, users) => {
    if (err) {
      console.log(err);
    }
  })
}

const createCandidates = () => {
  const candidateData = [{
      name: 'candidate1',
      noOfChallengesSolved: 20,
      expertiseLevel: 1,
      expertiseIn: {
        dataStructures: 1
      },
      numberOfVotes: 0
    },
    {
      name: 'candidate2',
      noOfChallengesSolved: 20,
      expertiseLevel: 1,
      expertiseIn: {
        dataStructures: 1
      },
      numberOfVotes: 0
    },
    {
      name: 'candidate3',
      noOfChallengesSolved: 20,
      expertiseLevel: 1,
      expertiseIn: {
        dataStructures: 1
      },
      numberOfVotes: 0
    },
    {
      name: 'candidate4',
      noOfChallengesSolved: 20,
      expertiseLevel: 1,
      expertiseIn: {
        dataStructures: 1
      },
      numberOfVotes: 0
    },
    {
      name: 'candidate5',
      noOfChallengesSolved: 20,
      expertiseLevel: 1,
      expertiseIn: {
        dataStructures: 1
      },
      numberOfVotes: 0
    }

  ];
  Candidate.insertMany(candidateData, (err, candidates) => {
    if (err) {
      console.log(err);
    }
    console.log('Initial loading finished');
  })
}

module.exports = {
  loadInitialData
};