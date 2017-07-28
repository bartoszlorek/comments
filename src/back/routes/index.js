var router = require('express').Router();
var message = require('../utils/message');

require('fs').readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        router.use('/', require('./' + file));
    }
});

router.get('*', (req, res) => {
    message.error(null, 404, res);
});

module.exports = router;