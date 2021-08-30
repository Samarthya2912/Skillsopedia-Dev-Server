const mongoose = require('mongoose');
const User = require('../models/User');

exports.register = async(req, res) => {
    console.log(req.body);
    const { username, email, password, firstname, lastname, fathersname, dob, address, level, degreeprogram } = req.body;

    try {
        const user = await User.create({
            username, email, password, firstname, lastname, fathersname, dob, address, level, degreeprogram
        })

        sendToken(user, 200, res);

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

function sendToken(user, statusCode, res) {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true, token 
    })
}