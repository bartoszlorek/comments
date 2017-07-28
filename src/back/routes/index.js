var router = require('express').Router();
var message = require('../utils/message');

router.use('/', require('./comment'));
router.use('/', require('./user'));
router.get('*', (req, res) => {
    message.error(null, 404, res);
});

module.exports = router;