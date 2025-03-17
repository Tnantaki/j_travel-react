const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
	email: {
		type: String,
		minLength: 3,
		maxLength: 50,
		unique: true,
		require: true
	},
	password: {
		type: String,
		minlength: 8,
		maxlength: 255,
		require: true
	}
}));

function validateUser(user) {
	const schema = Joi.object({
		email: Joi.string().min(3).max(50).required().email(),
		password: Joi.string().min(8).max(255).required()
	})
	return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;