const mongoose = require('mongoose');
const Joi = require('joi');

const Package = mongoose.model('Package', new mongoose.Schema({
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
    availableDates: [{type: Date}],
    createdAt: {
        type: Date,
        default: Date.now
    }
}));

function validatePackage(package) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(150).required(),
        description: Joi.string().min(5).max(255),
        price: Joi.number().min(0).required(),
        duration: Joi.number().min(5).required(),
        availableDates: Joi.array().items(Joi.date())
    })
    
    return schema.validate(package)
}

exports.Package = Package;
exports.validate = validatePackage;