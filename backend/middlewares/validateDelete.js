const Joi = require('joi');

module.exports = function (schema) {
	const schema = Joi.object({
		ids: Joi.array().items(Joi.objectId()).min(1).required()
	});

	const {error} = schema.validate(req.body);
	if (error) return res.status(400).send(error.details[0].mesaage);

	next();
}