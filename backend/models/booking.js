const mongoose = require('mongoose');
const Joi = require('joi');

const Booking = mongoose.model('Booking', new mongoose.Schema ({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
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
	schedule: {
		type: Date,
		required: true
	},
	status: {
		type: String,
		enum: ['pending', 'confirmed', 'cancelled', 'completed'],
		default: 'pending',
		required: true
	},
	paymentStatus: {
		type: String,
		enum: ['unpaid', 'paid', 'refunned'],
		default: 'unpaid',
		required: true,
	}
}, {timestamps: true}));

function validate(booking) {
	return Joi.object({
		user: Joi.objectId().required(),
		plan: Joi.objectId().required(),
		group: Joi.objectId().required(),
		schedule: Joi.date(),
		status: Joi.string.valid('pending', 'confirmed', 'cancelled', 'completed').required(),
		paymentStatus: Joi.string.valid('unpaid', 'paid', 'refunned').required()
	}).validate(booking);
}

module.exports = {
	Booking, 
	validate
}