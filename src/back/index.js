var config = require('./config');
var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var toColor = require('./utils/toColor');
var routes = require('./routes');
var auth = require('./auth');
var api = express();

var PORT = process.env.PORT || 8080;
var ROOT = process.env.ROOT || '/api';

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true,
});

auth(api);
api.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

api.use(parser.json());
api.use(parser.urlencoded({
    extended: true
}));

api.use(ROOT, routes);
api.listen(PORT, () => {
    var url = 'http://localhost:' + PORT + ROOT;
    console.log(`api is running at ${toColor(url)}`);
});