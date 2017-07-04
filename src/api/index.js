var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var router = express.Router();

mongoose.connect('mongodb://localhost/test', {
    useMongoClient: true,
});

router.get('/', function (req, res) {
    res.send('api');
});

// ----------------------------------------
router.use('/', require('./routes/comment'));

module.exports = function (path, app) {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(parser.urlencoded({ extended: true }));
    app.use(parser.json());
    app.use(path, router);
};