const mongoose = require('mongoose'), Schema = mongoose.Schema;

const UserSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        maxlength: [100, 'First Name exceeds 100 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        maxlength: [100, 'Last Name exceeds 100 characters']
    },
    phoneNumber: {
        type: String, maxlength: 18,
        validate: {
            validator: function (v) {
                return /^\d{7,18}$/i.test(v)                ;
            },
            message: () => 'Entered value is not a valid phone number!'
        }
    },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
