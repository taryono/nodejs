var UserService = require('../services/user.service')
const jwt = require('jsonwebtoken');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const user_attributtes = require('../models/attributes/user')

exports.findAll = async function(req, res, next) {
    // Validate request parameters, queries using express-validator
    const { page, size, query } = req.query;
    const options = {
        attributes: ['id', 'name', 'address', 'cellphone', 'sex', 'email', 'username', 'password'],
        page: page, // Default 1
        paginate: parseInt(size), // Default 25
        order: [
            ['id', 'DESC']
        ],
    }
    const where_options = {
        attributes: ['id', 'name', 'address', 'cellphone', 'sex', 'email', 'username', 'password'],
        page: page, // Default 1
        paginate: parseInt(size), // Default 25
        order: [
            ['id', 'DESC']
        ],
        where: {
            name: {
                [Op.like]: `%${query}%`
            }
        }
    }
    const selected_option = query ? where_options : options;
    UserService.findAll(selected_option)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User" + err
            });
        });
}

exports.Store = async function(req, res, next) {
    // Validate request parameters, queries using express-validator 
    try {
        var users = await UserService.Store({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            cellphone: req.body.cellphone,
            sex: req.body.sex,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            status: req.body.status,
        });
        // var users = await UserService.Store(user_attributtes(req));
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Saved Store" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.Update = async function(req, res, next) {
    // Validate request parameters, queries using express-validator 
    try {
        var user = await UserService.findById(req.params.id).then(function(user) {
            user.name = req.body.name
            user.address = req.body.address
            user.email = req.body.email
            user.cellphone = req.body.cellphone
            user.sex = req.body.sex
            user.username = req.body.username
            user.password = req.body.password
            user.role = req.body.role
            user.status = req.body.status
            user.save();
            return user
        });


        return res.status(200).json({ status: 200, data: user, message: "Succesfully Users Update" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


exports.Me = async function(req, res, next) {
    // Validate request parameters, queries using express-validator 
    var authorization = req.headers.authorization.split(' ')[1];
    var userId = null;
    try {
        jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: "Error",
                    errors: err
                });
            } else {
                userId = decoded.id;
                // Fetch the user by id 
                UserService.Me({ id: userId }).then(function(user) {
                    // Do something with the user
                    return res.send({
                        loggedIn: true,
                        user: user,
                        token: authorization
                    })
                });
            }
        });
    } catch (e) {
        return res.status(401).send('unauthorized' + e);
    }
}
exports.findById = async function(req, res, next) {
    // Validate request parameters, queries using express-validator 
    try {
        var user = await UserService.findById(req.params.id);
        return res.status(200).json({ user });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.Delete = async function(req, res, next) {
    // Validate request parameters, queries using express-validator 
    try {
        var user = await UserService.Delete(req.params.id);
        return res.send(200);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}