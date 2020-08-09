const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Candidate Name required'],
        maxlength: [100, 'Candidate Name exceeds 100 characters'],
        trim: true
    },
    noOfChallengesSolved: {
        type: Number,
        min: 0
    },
    expertiseLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    expertiseIn: {
        dataStructures: {
            type: Number,
            min: 1,
            max: 5
        },
        algorithms: {
            type: Number,
            min: 1,
            max: 5
        },
        c: {
            type: Number,
            min: 1,
            max: 5
        },
        python: {
            type: Number,
            min: 1,
            max: 5
        },
        java: {
            type: Number,
            min: 1,
            max: 5
        },
    },
    numberOfVotes: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Candidate', CandidateSchema);