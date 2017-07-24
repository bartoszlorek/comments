var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('../../config');

var User = require('../../models/User');
var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
}

module.exports = new JwtStrategy(options, function (payload, done) {
    User.findById(payload.id, function (error, user) {
        if (error) return done(error);
        if (!user) return done(null, false);
        return done(null, user);
    });
});