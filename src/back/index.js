var config = require('./config');
var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var format = require('./utils/format');
var auth = require('./auth');
var router = express.Router();

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true,
});

router.use('/', require('./routes/comment'));
router.use('/', require('./routes/user'));
router.get('*', (req, res) => format.error(null, 404, res));

module.exports = function (path, app) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    auth(app);
    app.use(parser.urlencoded({ extended: true }));
    app.use(parser.json());
    app.use(path, router);
}