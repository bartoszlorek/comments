var format = require('./format');
var isArray = require('lodash/isArray');
var omit = require('lodash/omit');

module.exports = function (response, success, failure) {
    return function (error, data) {
        if (error) {
            var message = error.message;
            if (typeof failure === 'function') {
                message = failure(error);
            }
            response.json(format.error(message));

        } else {
            if (typeof success === 'function') {
                data = success(data);
                if (typeof data === 'undefined') {
                    return;
                }
            }
            data = toOutput(data);
            response.json(format.success(data));
        }
    }
}

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