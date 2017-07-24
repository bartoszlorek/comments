var passport = require('passport');
var format = require('../utils/format');

module.exports = function (role) {
    return function (req, res, next) {
        passport.authenticate('auth', function (error, user) {
            if (error || !user || role && role !== user.role) {
                return format.error('unauthorized', 403, res);
            }
            next();
        })(req, res, next);
    }
}