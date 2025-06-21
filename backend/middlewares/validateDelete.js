const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = function (req, res, next) {
	const schema = Joi.object({
		ids: Joi.array().items(Joi.objectId()).min(1).required()
	});

	const {error} = schema.validate(req.body);
	if (error) return res.status(400).send(error.details[0].mesaage);

	next();
}