
class ErrorHandler extends Error {
    constructor(code, message, errors) {
        super();
        this.code = code;
        this.message = message;
        this.errors = errors;
    }
}

const handleError = (err, res) => {
    console.log(err,12333)
    const { code, message, errors } = err;
    return res.status(code || 500).json({
        status: "error",
        code,
        message,
        errors
    });
};

module.exports = {
    ErrorHandler,
    handleError
}