/*
    // usage
    // send data or error
    model.find(result(res));

    // send users with data as value
    model.find(result(res,
        data => ({ users: data })
    ));

    // send string status instead of data
    model.find(result(res,
        () => ({ status: 'success' })
    ));
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