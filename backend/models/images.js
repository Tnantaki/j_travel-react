const { required } = require('joi');
const mongoose = require('mongoose');

const imageSchema = new mongoose.Scema({
	imageUrl: {
		type: String,
		trim: true,
		required: true,
	},
	originalName: {
		type: String,
		trim: true,
		required: true
	},
	fileName: {
		type: String,
		trim: true,
		required: true,
	},
	fileSize: {
		type: Number,
		min: 0,
		required: true,
	},
	mimeType: {
		type: String,
		enum: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'], // Only allow these types
		required: true
	},
	uploadedAt: {
		type: Date,
		default: Date.now()
	},
	// Track if this image is actively being used or has been "deleted"
	// Instead of actually deleting, we often just mark as inactive
	isActive: {
		type: Boolean,
		default: true
	},
	// when converting to JSON (for api responses), include virtual fileds
	toJSON: {virtuals: true},
	toObject: {virtuals: true}
})