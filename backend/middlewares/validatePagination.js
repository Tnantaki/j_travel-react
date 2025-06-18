const Joi = require('joi');

const paginationSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(25),
    tags: Joi.string().pattern(/^[a-z0-9]+(?:,[a-z0-9]+)*$/i)
});

module.exports = function (req, res, next) {
    const { error, value } = paginationSchema.validate(req.query, {
        // strip out unknown keys so only page & limit remain
        stripUnknown: true,
        // return all errors, not just the first
        abortEarly: false
    });

    if (error) {
        const details = error.details.map(d => d.message).join('; ');
        return res.status(400).send(`Invalid query parameters: ${details}`);
    }

    // overwrite req.query with the validated & defualted values
    req.query = value;
    next();
}