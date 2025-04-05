const mongoose = require('mongoose');
const Joi = require('joi');

const Profile = mongoose.model('Profile', new mongoose.Schema({
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
	Id: {
		type: Number,
		min: 13,
		required: true,
	},
	passport: {
		type: Number,
		min: 4,
		max: 100,
		required: true
	}
}));

function validateProfile(profile) {
	const schema = Joi.object({
		username: Joi.string().min(3).max(50).required(),
		address: Joi.object({
			street: Joi.string().max(200).required(),
			building: Joi.string().max(200).allow("").optional(),
			houseNo: Joi.string().max(50).required(),
			district: Joi.string().max(100).required(),
			postalCode: Joi.string().max(20).required(),
			subDistrict: Joi.string().max(100).required(),
			province: Joi.string().max(100).required(),
			country: Joi.string().max(100).required(),
		}).required(),
		phone: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(3).max(50).email().required(),
		birthday: Joi.date().iso(),
		gender: Joi.string().min(3).max(7).required(),
		Id: Joi.Number().min(13).require(),
		passport: Joi.Number().min(4).max(100).require()
	})
	return schema.validate(profile);
}

exports.Profile = Profile;
exports.validate = validateProfile;