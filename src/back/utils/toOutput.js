var isArray = require('lodash/isArray');
var omit = require('lodash/omit');

function toOutput(data) {
    var clean;

    if (isArray(data)) {
        return data.map(function (item) {
            return toOutput(item);
        });
    }
    if (typeof data === 'object' && data._id !== undefined) {
        clean = omit(data.toObject(), ['_id', '__v']);
        clean.id = data._id;
        return clean;
    }
    return data;
}

module.exports = toOutput;