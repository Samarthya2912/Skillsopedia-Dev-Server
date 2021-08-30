const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, 'Please provide a username' ]
    },
    email: {
        type: String,
        required: [ true, 'Please provide a email' ],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [ true, 'Please provide password' ],
        minlength: 6,
        select: false
    },
    firstname: {
        type: String,
        required: [ true, 'Please provide first name' ],
        select: false
    },
    lastname: {
        type: String,
        select: false
    },
    fathersname: {
        type: String,
        select: false
    },
    dob: {
        type: Date,
        // default: Date.now,
        // required: [ true, 'Please provide date of birth' ],
        select: false
    },
    address: {
        type: String,
        select: false
    },
    level: {
        type: String,
        select: false
    },
    degreeprogram: {
        type: String,
        select: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.methods.getSignedToken = function() {
    const payload = { _id: this._id };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

const User = mongoose.model('User', userSchema);

module.exports = User;