const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
var UserService = require('../services/user.service')

app.use(bodyParser.json());
const refreshTokens = [];

exports.Register = async function(req, res, next) {
    // Validate request parameters, queries using express-validator

    UserService.Register(req.body)
        .then(user => {
            if (user) {
                res.send('Register Success');
            } else {
                res.send('User Exists');
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User" + err
            });
        });
}

exports.Login = async function(req, res, next) {
    // Validate request parameters, queries using express-validator

    UserService.Login({ where: { username: req.body.username, password: req.body.password } })
        .then(user => {
            if (user) {
                // generate an access token
                const access_token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600m' });
                const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET);

                refreshTokens.push(refreshToken);
                user.access_token = access_token;
                user.save();
                res.send({
                    user: user,
                    token: access_token,
                    //refreshToken
                });
            } else {
                res.status(200).send('Username or password incorrect');
            }
        })
        .catch(err => {
            res.status(200).send({
                message: "Error retrieving Users " + err
            });
        });
}