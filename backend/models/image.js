const Joi = require('joi');
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
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
	key: {
		type: String,
		trim: true,
		required: true
	},
	caption: {
		type: String,
		maxlength: 500,
		default: ''
	},
	uploadedAt: {
		type: Date,
		default: Date.now
	},
	uploadedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	// Track if this image is actively being used or has been "deleted"
	// Instead of actually deleting, we often just mark as inactive
	isActive: {
		type: Boolean,
		default: true
	},
	tag: [{
		type: String,
		trim: true,
		lowercase: true
	}]
}, {
	timestamps: true,
	// when converting to JSON (for api responses), include virtual fileds
	// toJSON: {virtuals: false},
	toObject: {virtuals: true}
});

// Index for finding images by upload date (most recent first)
imageSchema.index({ uploadedAt: -1 });

// Index for finding active images quickly
imageSchema.index({ isActive: 1 });

// Compound index for finding a user's active images
imageSchema.index({ uploadedBy: 1, isActive: 1 });

imageSchema.index({
	tags: 'text',
	caption: 'text',
	originalName: "text"
})

// virtual field: create a human-readable file size
// this doesn't get stored in the db but is calculated when accessed
imageSchema.virtual('fileSizeFormatted').get(function() {
	const size = this.fileSize;
	if (size < 1024) return size + ' bytes';
	if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
	return (size / (1024 * 1024)).toFixed(1) + ' MB';
});

// static method: find images by tag --> this only allow single tag querying
// imageSchema.statics.findByTag = function(tag) {
// 	return this.find({
// 		tag: {$in: [tag.toLowerCase()]},
// 		isActive: true
// 	}).sort({uploadedAt: -1});
// }
imageSchema.statics.findByTags = function(tags) {
	const allTags = tags.map(t => t.toLowerCase().trim());
	return this.find({
		tag: {$in: allTags},
		isActive: true
	})
	.sort({uploadedAt: -1});
};

// Middleware: Before saving, ensure filename is unique
imageSchema.pre('save', async function(next) {
	// Only run this check if fileName is being modified
	if (!this.isModified('fileName')) return next();
	
	// Check if another image already has this filename
	const existingImage = await this.constructor.findOne({ 
	  fileName: this.fileName,
	  _id: { $ne: this._id } // Exclude current document
	});
	
	if (existingImage) {
	  const error = new Error('Filename already exists in database');
	  return next(error);
	}
	
	next();
  });

function validateImage(image) {
	const schema = Joi.object({
		originalName: Joi.string().max(255).required(),
		fileName: Joi.string().max(255).required(),
		fileSize: Joi.number().min(0).required(),
		mimeType: Joi.string()
					.valid(
						'image/jpeg', 
						'image/jpg', 
						'image/png', 
						'image/webp', 
						'image/gif')
						.required(),
		caption: Joi.string().max(255).allow('').optional(),
		uploadedBy: Joi.string().regex(/^[a-f\d]{24}$/i).optional(),
		isActive: Joi.boolean().optional(),
		tag: Joi.array().items(Joi.string().trim().lowercase()).optional()
	});

	return schema.validate(image, {abortEarly: false});
}

const Image = mongoose.model('Image', imageSchema);

module.exports = {
	Image,
	validateImage
}