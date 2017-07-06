module.exports = {
    success: (data) => ({
        status: 'success',
        data: data
    }),
    error: (message, code) => {
        var error = {
            status: 'error'
        }
        if (typeof message === 'string') {
            error.message = message;
        }
        if (typeof code === 'number') {
            error.code = code;
        }
        return error;
    }
}