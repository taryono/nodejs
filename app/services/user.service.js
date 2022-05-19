var model = require("../models");
var User = model.User;
exports.findAll = async function(options) {
    try {
        return await User.paginate(options);
    } catch (e) {
        // Log Errors
        throw Error("Error while Paginating Users" + e);
    }
};

exports.findById = async function(query) {
    try {
        var user = await User.findByPk(query);
        return user;
    } catch (e) {
        // Log Errors
        throw Error("Error while Paginating Users" + e);
    }
};

exports.Store = async function(query) {
    try {
        var users = await User.create(query);
        return users;
    } catch (e) {
        // Log Errors
        throw Error("Error while Paginating Users");
    }
};

exports.Update = async function(query) {
    try {
        var user = await User.update(query);
        return user;
    } catch (e) {
        // Log Errors
        throw Error("Error while Paginating Users");
    }
};

exports.Login = async function(query) {
    try {
        var user = await User.findOne(query);
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (e) {
        // Log Errors
        throw Error("Error while Fetch User Login" + e);
    }
};

exports.Register = async function(req) {
    try {
        $is_user_exists = await User.findOne({
            where: { username: req.username, password: req.password },
        });
        if (!$is_user_exists) {
            req.role = "user";
            var user = await User.create(req);
            return user;
        } else {
            return null;
        }
    } catch (e) {
        // Log Errors
        throw Error("Error " + e);
    }
};

exports.Me = async function(query) {
    try {
        var user = await User.findOne(query);
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (e) {
        // Log Errors
        throw Error("Data Tidak Ditemukan " + e);
    }
};

exports.Delete = async function(query) {
    try {
        var user = await User.findByPk(query);
        if (user) {
            return user.destroy();
        } else {
            return null;
        }
    } catch (e) {
        // Log Errors
        throw Error("Data Tidak Ditemukan " + e);
    }
};