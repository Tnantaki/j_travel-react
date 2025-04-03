const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userShema = new mongoose.Schema({
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
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

userShema.methods.generateAuthToken = function() {
	const token = jwt.sign({_id: this.id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
	return token;
}

const User = mongoose.model('User', userShema);


function validateUser(user) {
	const schema = Joi.object({
		email: Joi.string().min(3).max(50).required().email(),
		password: Joi.string().min(8).max(255).required()
	})
	return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;