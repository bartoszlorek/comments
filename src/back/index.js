var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var format = require('./utils/format');
var router = express.Router();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', {
    useMongoClient: true,
});

router.use('/', require('./routes/comment'));
router.use('/', require('./routes/user'));

router.get('*', (req, res) => {
    res.status(404).json(format.error(null, 404));
});

module.exports = function (path, app) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(parser.urlencoded({ extended: true }));
    app.use(parser.json());
    app.use(path, router);
}