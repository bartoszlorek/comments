var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function (user) {
    var token = {
        id: user._id,
        username: user.username,
        password: user.password,
        email: user.email,
        role: user.role
    }
    return 'JWT ' + jwt.sign(token, config.secret, {
        expiresIn: 10080 // in seconds
    });
}