var toOutput = require('./toOutput');
var message = require('./message');
var filter = require('./filter');

module.exports = function (response, callback = {}) {
    return function (error, data) {
        if (error) {
            if (error) {
                error = error.message;
            }
            error = filter(error, callback.error);
            message.error(error, 500, response);

        } else if (!data) {
            data = filter(data, callback.fail);
            message.error(data, 404, response);

        } else {
            data = filter(data, callback.success);
            if (typeof data === 'undefined') {
                return;
            }
            data = toOutput(data);
            message.success(data, 200, response);
        }
    }
}