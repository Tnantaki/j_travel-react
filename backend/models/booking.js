const mongoose = require('mongoose');
const Joi = require('joi');

const Booking = mongoose.model('Booking', new mongoose.Schema ({
	plan: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Plan',
		required: true,
	},
	group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group',
		required: true
	},
	firstDay: {
		type: Date,
		required: true
	},
	lastDay: {
		type: Date,
		required: true
	},
	status: {
		type: String,
		enum: ['pending', 'confirmed', 'cancelled', 'traveling', 'completed'],
		default: 'pending',
	},
	paymentStatus: {
		type: String,
		enum: ['unpaid', 'paid', 'refunned'],
		default: 'unpaid',
	}
}, {timestamps: true}));

function validate(booking) {
	return Joi.object({
		plan: Joi.objectId().required(),
		group: Joi.objectId().required(),
		firstDay: Joi.date().required(),
		lastDay: Joi.date().required(),
		status: Joi.string().valid('pending', 'confirmed', 'cancelled', 'traveling', 'completed').required(),
		paymentStatus: Joi.string().valid('unpaid', 'paid').required()
	}).validate(booking);
}

function validateUpdate(booking) {
	const schema = Joi.object({
		plan: Joi.forbidden(),
		group: Joi.forbidden(),
		firstDay: Joi.date(),
		lastDay: Joi.date(),
		status: Joi.string.valid('pending', 'confirmed', 'cancelled', 'traveling', 'completed'),
		paymentStatus: Joi.string.valid('unpaid', 'paid', 'refunned')
	}).min(1);

	return schema.validate(booking);
}

module.exports = {
	Booking, 
	validate,
	validateUpdate
}