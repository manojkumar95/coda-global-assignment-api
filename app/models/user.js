const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [100, 'Name exceeds 100 characters']
    },
    passCode: {
        type: String,
        maxlength: 18
    },
    isVoted: {
        type: Boolean,
        default: false
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
        // immutable: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    authToken: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
