const mongoose = require('mongoose');
const Joi = require('joi');

const History = mongoose.model('History', new mongoose.Schema({
    Booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    }
}));