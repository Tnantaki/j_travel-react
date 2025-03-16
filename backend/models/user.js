const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
	username: {
		type: String,
		minLength: 3,
		maxLength: 50,
		unique: true,
		require: true
	},
	password: {
		type: Number,
		// minLength: 8,
		// maxLength: 50,
		require: true
	},
	address: {
		type: String,
		// maxLength: 500,
		required: false
	},
	phone: {
		type: String,
		minLength: 5,
		maxLength: 50,
		required: true,
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
		username: Joi.string().min(3).max(50).required(),
		password: Joi.number().required(),
		address: Joi.string(),
		phone: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(3).max(50).required(),
	})
	return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;