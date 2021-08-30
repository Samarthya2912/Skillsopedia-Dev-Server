const mongoose = require('mongoose');
const User = require('../models/User');

exports.register = async(req, res) => {
    console.log('register data', req.body);
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

exports.login = async(req, res) => {
    const { username, password } = req.body;
    const user = User.findOne({ username });

    console.log('login data', req.body); //delete

    if(!username || !password) {
        req.status(400).json({
            success: false,
            error: 'Please provide email and password'
        })
    }

    try {
        const user = await User.findOne({ username }).select("+password");

        console.log(user); //delete

        if(!user) res.status(404).json({
            success: false,
            error: 'user not found'
        })

        const ismatching = await user.matchpasswords(password);
        console.log('comparison returns: ', ismatching);

        if(!ismatching){
            res.status(404).json({
                success: false,
                error: 'invalid credentails'
            }).end()
        } else {
            //if all good
            sendToken(user, 201, res)
        }
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