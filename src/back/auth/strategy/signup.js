var encrypt = require('../encrypt');
var User = require('../../models/User');

module.exports = function (username, password, done) {
    User.findOne({ username }, function (error, user) {
        if (error) return done(error);
        if (user) return done(null, false);
        return done(null, {
            username: username,
            password: encrypt(password)
        })
    })
}