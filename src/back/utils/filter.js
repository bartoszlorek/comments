module.exports = function (data, method) {
    if (typeof method === 'function') {
        return method(data);
    }
    if (typeof method === 'string') {
        return method;
    }
    return data;
}