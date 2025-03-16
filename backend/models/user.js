const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
	password: {
		type: Number,
		// minLength: 8,
		// maxLength: 50,
		require: true
	},
	email: {
		type: String,
		minLength: 3,
		maxLength: 50,
		unique: true,
		require: true
	}
}));

function validateUser(user) {
	const schema = Joi.object({
		password: Joi.number().required(),
		email: Joi.string().min(3).max(50).required(),
	})
	return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;