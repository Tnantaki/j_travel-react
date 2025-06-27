const Joi = require('joi');

module.exports = function(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().min(2).required(),
        limit: Joi.number().integer().min(1).max(10).default(5)
    });

    const {error, value} = schema.validate(req.query);
    if (error) {
        return res.status(400).send({
            error: 'Invalid query parameters',
            details: error.details[0].message
        });
    }

    req.query = value;
    next();
}