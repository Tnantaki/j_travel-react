const mongoose = require('mongoose');
const Joi = require('joi');

const Profile = mongoose.model('Profile', new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: true
	},
	username: {
		type: String,
		minlength: 3,
		maxlength: 50,
		unique: true,
		required: true
	},
	address: {
		street: { type: String, maxlength: 200, required: true },
		building: { type: String, maxlength: 200, required: false },
		houseNo: { type: String, maxlength: 50, required: true },
		district: { type: String, maxlength: 100, required: true },
		postalCode: { type: String, maxlength: 20, required: true },
		subDistrict: { type: String, maxlength: 100, required: true },
		province: { type: String, maxlength: 100, required: true },
		country: { type: String, maxlength: 100, required: true, default: "Thailand" }
	},
	phone: {
		type: String,
		minlength: 5,
		maxlength: 50,
		required: true,
	},
	email: {
		type: String,
		minlength: 3,
		maxlength: 50,
		unique: true,
		required: true
	},
	birthday: { 
		type: Date,
		required: true 
	},
	gender: {
		type: String,
		minlength: 3,
		maxlength: 7,
		required: true
	},
	idNumber: {
		type: String,
		min: 13,
		required: true,
	},
	passportNumber: {
		type: String,
		min: 4,
		max: 100,
		required: true
	}
}));

function validateProfile(profile) {
	const schema = Joi.object({
		user: Joi.objectId().required(),
		username: Joi.string().min(3).max(50).required().trim(),
		address: Joi.object({
			street: Joi.string().max(200).required().trim(),
			building: Joi.string().max(200).allow("").optional().trim(),
			houseNo: Joi.string().max(50).required().trim(),
			district: Joi.string().max(100).required().trim(),
			postalCode: Joi.string().max(20).required().trim(),
			subDistrict: Joi.string().max(100).required().trim(),
			province: Joi.string().max(100).required().trim(),
			country: Joi.string().max(100).default("Thailand").required().trim(),
		}).required(),
		phone: Joi.string().pattern(/^[0-9+\-\s]+$/).min(5).max(50).required().trim(),
		email: Joi.string().min(3).max(50).email().required().trim(),
		birthday: Joi.date().iso().required().trim(),
		gender: Joi.string().valid('male', 'female', 'other').min(3).max(7).required().trim(),
		idNumber: Joi.number().min(13).require().trim(),
		passportNumber: Joi.number().min(4).max(100).require().trim()
	})
	return schema.validate(profile);
}

function validateUpdate (profile) {
	const schema = Joi.object({
		user: Joi.forbidden(),
		username: Joi.string().min(3).max(50).trim(),
		address: Joi.object({
			street: Joi.string().max(200).trim(),
			building: Joi.string().max(200).allow("").optional().trim(),
			houseNo: Joi.string().max(50).trim(),
			district: Joi.string().max(100).trim(),
			postalCode: Joi.string().max(20).trim(),
			subDistrict: Joi.string().max(100).trim(),
			province: Joi.string().max(100).trim(),
			country: Joi.string().max(100).default("Thailand").trim(),
		}),
		phone: Joi.string().pattern(/^[0-9+\-\s]+$/).min(5).max(50).trim(),
		email: Joi.string().min(3).max(50).email().trim(),
		birthday: Joi.date().iso().trim(),
		gender: Joi.string().valid('male', 'female', 'other').min(3).max(7).trim(),
		idNumber: Joi.number().min(13).trim(),
		passportNumber: Joi.number().min(4).max(100).trim()
	}).min(1);

	return schema.validate(profile);
}

module.exports = {
	Profile,
	validateProfile,
	validateUpdate
}