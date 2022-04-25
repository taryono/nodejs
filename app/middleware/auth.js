const config = require('../config/configRoles.js');
const roles = config.roles;

module.exports = {
    checkroleExisted(req, res, next) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!roles.includes(req.body.roles[i].toUpperCase())) {
                res.status(400).send({
                    auth: false,
                    id: req.body.id,
                    message: "Error",
                    errors: "Does NOT exist Role = " + req.body.roles[i]
                });
                return;
            }
        }
        next();
    }
}