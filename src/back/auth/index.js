var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var signup = require('./strategy/signup');
var auth = require('./strategy/auth');
var jwt = require('./strategy/jwt');

var User = require('../models/User');

module.exports = function (api) {
    api.use(passport.initialize());
    passport.use('signup', new LocalStrategy(signup));
    passport.use('auth', new LocalStrategy(auth));
    passport.use('jwt', jwt);
}