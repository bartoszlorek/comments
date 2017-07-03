module.exports = function (response, callback) {
    return function (error, data) {
        if (error) {
            response.json({ error: error });
        }
        if (typeof callback === 'function') {
            response.json(callback(data));

        } else {
            response.json(data);
        }
    }
};