const mongoose = require('mongoose');
const Joi = require('joi');

const Group = mongoose.model('Group', new mongoose.Schema({
    leader: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
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
        leader: Joi.objectId().required(),
        memebers: Joi.array().items(Joi.objectId()).required()
    })
    
    return schema.validate(group);
}

exports.Group = Group;
exports.validate = validateGroup;