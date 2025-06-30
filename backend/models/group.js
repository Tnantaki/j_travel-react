const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const Group = mongoose.model('Group', new mongoose.Schema({
	leader: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Profile', 
		required: true
	},
	plan: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Plan',
		required: true
	},
	members: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Profile'
	}],
	createdAt: {
		type: Date,
		default: Date.now
	}
}));

function validateGroup(group) {
	const schema = Joi.object({
		plan: Joi.objectId().required(),
		members: Joi.array().items(Joi.objectId())
	});
	
	return schema.validate(group);
}

function validateUpdate(group) {
	const schema = Joi.object({
		plan: Joi.objectId(),
		members: Joi.array().items(Joi.objectId())
	});
	
	return schema.validate(group);
}

module.exports.Group = Group;
module.exports.validate = validateGroup;
module.exports.validateUpdate = validateUpdate;
