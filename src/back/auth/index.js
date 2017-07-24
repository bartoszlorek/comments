var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var signup = require('./strategy/signup');
var login = require('./strategy/login');
var jwt = require('./strategy/jwt');

var User = require('../models/User');

module.exports = function (app) {
    app.use(passport.initialize());
    passport.use('signup', new LocalStrategy(signup));
    passport.use('login', new LocalStrategy(login));
    passport.use('auth', jwt);
}