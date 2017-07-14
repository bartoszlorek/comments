var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var signup = require('./strategy/signup');
var login = require('./strategy/login');

var User = require('../models/User');

module.exports = function (app) {
    app.use(
        session({
            secret: 'mySecretKey',
            resave: true,
            saveUninitialized: true
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        console.log('serializing user: ', user);
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            console.log('deserializing user:', user);
            done(err, user);
        });
    });

    passport.use('signup', new LocalStrategy(signup));
    passport.use('login', new LocalStrategy(login));
}