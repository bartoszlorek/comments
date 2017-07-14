var toOutput = require('./toOutput');
var format = require('./format');
var filter = require('./filter');

module.exports = function (response, onSuccess, onError, onFailure) {
    return function (error, data) {
        if (error) {
            if (error) {
                error = error.message;
            }
            error = filter(error, onError);
            response.json(format.error(error));

        } else if (!data) {
            data = filter(data, onFailure);
            response.json(format.error(data));

        } else {
            data = filter(data, onSuccess);
            if (typeof data === 'undefined') {
                return;
            }
            data = toOutput(data);
            response.json(format.success(data));
        }
    }
}