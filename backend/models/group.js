const mongoose = require('mongoose');
const Joi = require('joi');

const Group = mongoose.model('Group', new mongoose.Schema({
	leader: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User', 
		required: true
	},
	plan: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Plan',
		required: true
	},
	members: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
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

exports.Group = Group;
exports.validate = validateGroup;

// package: {
// 	type: mongoose.Schema.Types.ObjectId,
// 	ref: 'Package',
// 	required: function() {return this.type === 'tour';}
// },
// leader: Joi.when('type', {
// 	is: 'private',
// 	then: Joi.objectId().required(),
// 	otherwise: Joi.forbidden()
// }),