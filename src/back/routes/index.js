var router = require('express').Router();
var format = require('../utils/format');

router.use('/', require('./comment'));
router.use('/', require('./user'));
router.get('*', (req, res) => {
    format.error(null, 404, res);
});

module.exports = router;