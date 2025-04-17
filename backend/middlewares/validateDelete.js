const Joi = require('joi');

module.exports = function (req, res, next) {
	const schema = Joi.object({
		ids: Joi.array().items(Joi.objectId()).min(1).required()
	});

	const {error} = body.validate(req.body);
	if (error) return res.status(400).send(error.details[0].mesaage);

	next();
}