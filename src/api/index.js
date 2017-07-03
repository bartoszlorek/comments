var express = require('express');
var mongoose = require('mongoose');
var routes = express.Router();

mongoose.connect('mongodb://localhost/test', {
    useMongoClient: true,
});

routes.get('/', function (req, res) {
    res.send('api');
});

// ----------------------------------------
routes.use('/', require('./routes/comment'));

module.exports = routes;