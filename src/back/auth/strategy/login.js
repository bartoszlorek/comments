var decrypt = require('../decrypt');
var User = require('../../models/User');

module.exports = function (username, password, done) {
    User.findOne({ username }, function (error, user) {
        if (error) return done(error);
        if (!user || !decrypt(user, password)) {
            return done(null, false);
        }
        return done(null, user);
    })
}