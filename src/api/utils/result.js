/*
    // send a JSON response
    // error or data
    result(res);

    // error or users with data as value
    result(res, data => ({ users: data }));

    // send string status instead of data
    result(res, () => ({ status: 'success' }));
*/

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
