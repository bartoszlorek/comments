var format = require('../utils/format');

module.exports = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(403).json(
            format.error('access denied, please log in', 403)
        );
    }
    next();
}