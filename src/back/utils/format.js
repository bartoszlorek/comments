function method(name, property) {
    return (data, code, response) => {
        if (typeof code !== 'number') {
            code = 200;
        }
        var output = {
            status: name,
            code: code
        }
        output[property] = data;

        if (response) {
            return response
                .status(code)
                .json(output);
        }
        return output;
    }
}

module.exports = {
    success: method('success', 'data'),
    error: method('error', 'message')
}