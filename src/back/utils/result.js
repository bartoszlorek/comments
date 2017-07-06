var format = require('./format');

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
            }
            response.json(format.success(data));
        }
    }
}