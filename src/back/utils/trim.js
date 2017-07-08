module.exports = function (text) {
    if (typeof text === 'string') {
        return text.trim();
    }
    return text;
}