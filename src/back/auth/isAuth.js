var passport = require('passport');
var message = require('../utils/message');

module.exports = function (role) {
    return function (req, res, next) {
        passport.authenticate('auth', function (error, user) {
            if (error || !user || role && role !== user.role) {
                return message.error('unauthorized', 403, res);
            }
            next();
        })(req, res, next);
    }
}