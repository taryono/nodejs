require('dotenv').config()

module.exports = {
    'secret': process.env.SECRET,
    roles: ['USER', 'ADMIN', 'PM']
};