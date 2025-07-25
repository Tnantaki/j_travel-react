const mongoose = require('mongoose');
const Joi = require('joi');

const Plan = mongoose.model('Plan', new mongoose.Schema({
	type : {
		type: String,
		enum: ['private', 'tour'],
		required: true
	},
	title: {
		type: String,
		minlength: 5,
		maxlength: 150,
		required: true
	},
	description: {
		type: String,
		minlength: 5,
		maxlength: 255,
	},
	price: {
		type: Number,
		min: 0,
		required: true
	},
	duration: {
		type: Number,
		min: 5,
		required: true
	},
	seatsAvailable: {
		type: Number,
		min: 0,
		max: 30,
		required: function () {return this.type === 'tour';}
	},
	images: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Image'
	}],
	schedules: [{
		day: {type: Number, min: 1, max: 7, required: true},
		title: {type: String, minlength: 5, maxlength: 150, required: true},
		events: {type: [String], required: true}
	}],
	createdAt: {
		type: Date,
		default: Date.now
	}
}));

const scheduleSchema = Joi.object({
	day: Joi.number().integer().min(1).max(7).required(),
	title: Joi.string().min(5).max(150).required(),
	events: Joi.array().items(Joi.string().min(5).max(250)).required()
})

const scheduleUpdate = Joi.object({
	day: Joi.number().integer().min(1).max(7),
	title: Joi.string().min(5).max(150),
	events: Joi.array().items(Joi.string().min(5).max(250)),
})

function validatePlan(plan) {
	const schema = Joi.object({
		type: Joi.string().valid('private', 'tour').required(),
		title: Joi.string().min(5).max(150).required(),
		description: Joi.string().min(5).max(255),
		price: Joi.number().min(0).required(),
		duration: Joi.number().min(5).required(),
		seatsAvailable: Joi.when('type', {
			is: 'tour',
			then: Joi.number().min(0).max(30).required(),
			otherwise: Joi.forbidden
		}),
		schedules: Joi.array().items(scheduleSchema)
	});
	
	return schema.validate(plan)
}

function validateUpdatePlan(plan) {
	const schema = Joi.object({
		type: Joi.string().valid('private', 'tour'),
		title: Joi.string().min(5).max(150),
		description: Joi.string().min(5).max(255),
		price: Joi.number().min(0),
		duration: Joi.number().min(5),
		seatsAvailable: Joi.when('type', {
			is: 'tour',
			then: Joi.number().min(0).max(30),
			otherwise: Joi.forbidden
		}),
		schedules: Joi.array().items(scheduleUpdate).min(5)
	}).min(1); // ensure at least 1 filed is provided
	
	return schema.validate(plan)
}

exports.Plan = Plan;
exports.validate = validatePlan;
exports.validateUpdate = validateUpdatePlan;