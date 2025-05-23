const winston = require('winston');

module.exports = function (err, req, res, next) {
    winston.error(err.message, err);
    res.status(500).send('An internal server error occurred.');
}