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
            response.json(format.error(error));

        } else if (!data) {
            data = filter(data, callback.fail);
            response.json(format.error(data));

        } else {
            data = filter(data, callback.success);
            if (typeof data === 'undefined') {
                return;
            }
            data = toOutput(data);
            response.json(format.success(data));
        }
    }
}