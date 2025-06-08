const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');
const { Plan, validate } = require('../models/plan');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const Image = require('../models/image');
const { ALLOW_IMAGE_TYPES, MAX_FILE_SIZE} = require('../services/imageUploadService');
const uploadImageToS3 = require('../services/uploadS3AndSaveDb');

const upload = multer({
	storage: multer.memoryStorage(),
	limit: { fileSize: MAX_FILE_SIZE},
	fileFilter(req, file, cb) { 
		if (!ALLOW_IMAGE_TYPES.includes(file.mimetype))
			return cb(new Error('Only JPEG, PNG, WebP or GIF images allowed'))
		cb(null, true);
	}
});

async function createPlanAndImages(planData, imageFiles) {
	const session = await mongoose.startSession();

	try { 
		session.startTransaction();

		const uploadRes = [];

		// for (let imageFile of imageFiles) {
		// 	const uploadRes = await uploadImageToS3(imageFile);
		for (let imageFile of imageFiles) {
			// console.log(imageFile);
			const res = await uploadImageToS3(imageFile);
			uploadRes.push(res);
		}

		const createdImgs = [];
		for (let i = 0; i < uploadRes.length; i++) {
			const res = uploadRes[i];
			// console.log(res);
			const imageFile = imageFiles[i];

			const imageDoc = new Image({
				imageUrl: res.imageUrl,
				originalName: res.originalName,
				fileName: res.Key,
				fileSize: res.size,
				mimeType: res.mimeType,
				caption: imageFile.caption || '',
				tags: imageFile.tags || [],
				uploadedBy: planData.adminId
			});

			const savedImage = await imageDoc.save({session});
			createdImgs.push(savedImage);
		}

		const planDoc = new Plan({
			...planData, // spread operator
			images: createdImgs.map(img => img._id),
		});

		const savedPlan = await planDoc.save({session});

		await session.commitTransaction();
		return await savedPlan;

	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}

}

router.post('/create-with-image', upload.array('images'), 
	[auth, admin], async(req, res) => {
		const {error} = validate(req.body);
		if (error)
			return res.status(400).send(error.details[0].message);

		const planData = {
			type: req.body.type,
			title: req.body.title,
			description: req.body.description,
			price: parseFloat(req.body.price),
			duration: parseFloat(req.body.duration),
			seatsAvailable: req.body.type === 'tour' ? parseInt(req.body.seatsAvailable) : undefined,
			adminId: req.user._id
		}

		const newPlan = await createPlanAndImages(planData, req.files);

		res.status(201).send({
			success: true,
			plan: newPlan
		});
	}
);

module.exports = router;