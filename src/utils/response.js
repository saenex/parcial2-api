function success(req, res, data, status = 200) {
    res.status(status).json({
        error: false,
        status: status,
        data: data
    });
}

function error(req, res, message, status = 500) {
    res.status(status).json({
        error: true,
        status: status,
        message: message
    });
}

module.exports = {
    success,
    error
};