var config = require('./config');
var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var toColor = require('./utils/toColor');
var routes = require('./routes');
var auth = require('./auth');
var api = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true,
}).then(() => {
    console.log(`db connected to ${toColor(config.database)}`);
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

api.use(config.root, routes);
api.listen(config.port, () => {
    var url = 'http://localhost:' + config.port + config.root;
    console.log(`api is running at ${toColor(url)}`);
});