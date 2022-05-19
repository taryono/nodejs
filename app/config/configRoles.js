require('dotenv').config()

module.exports = {
    'secret': process.env.ACCESS_TOKEN_SECRET,
    roles: ['ADMIN', 'USER', 'PM', 'DRIVER']
};