var format = require('./format');
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

function callback(data, method) {
    if (typeof method === 'function') {
        return method(data);
    }
    if (typeof method === 'string') {
        return method;
    }
    return data;
}

module.exports = function (response, success, failure) {
    return function (error, data) {
        if (error || data === null) {
            if (error) {
                error = error.message;
            }
            error = callback(error, failure);
            response.json(format.error(error));

        } else {
            data = callback(data, success);
            if (typeof data === 'undefined') {
                return;
            }
            data = toOutput(data);
            response.json(format.success(data));
        }
    }
}