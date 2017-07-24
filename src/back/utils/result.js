var toOutput = require('./toOutput');
var format = require('./format');
var filter = require('./filter');

module.exports = function (response, callback = {}) {
    return function (error, data) {
        if (error) {
            if (error) {
                error = error.message;
            }
            error = filter(error, callback.error);
            format.error(error, 500, response);

        } else if (!data) {
            data = filter(data, callback.fail);
            format.error(data, 404, response);

        } else {
            data = filter(data, callback.success);
            if (typeof data === 'undefined') {
                return;
            }
            data = toOutput(data);
            format.success(data, 200, response);
        }
    }
}