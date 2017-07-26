var express = require('express');
var toColor = require('./back/utils/toColor');
var path = require('path');
var app = express();

var PORT = process.env.PORT || 8080;
var BASE = 'dist/index.html';

app.use(express.static('dist'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', BASE));
});

app.listen(PORT, () => {
    var url = 'http://localhost:' + PORT;
    console.log(`server is running at ${toColor(url)}`);
});