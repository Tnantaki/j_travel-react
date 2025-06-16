const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');
const { Plan, validate } = require('../models/plan');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { Image, validateImage } = require('../models/image');
const { ALLOW_IMAGE_TYPES, 
	MAX_FILE_SIZE, 
	validateImageFile, 
	generateUniqeFileName} = require('../services/imageUploadService');
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

async function createPlanAndImages(planData, imageFiles, req) {
	const session = await mongoose.startSession();

	try { 
			session.startTransaction();

			const captions = Array.isArray(req.body.caption) ? req.body.caption : [];
			const tags = Array.isArray(req.body.tag) ? req.body.tag : [];

			const imgInfos = [];
			for (let i = 0; i < imageFiles.length; i++) {
				// validate file and generate name
				const file = imageFiles[i];
				const fileType = await validateImageFile(file.buffer);
				const fileName = generateUniqeFileName(file.originalname, fileType);

				const payload = {
					originalName: file.originalname,
					fileName: fileName,
					fileSize: file.buffer.length,
					mimeType: fileType.mime,
					caption: captions[i],
					tag: tags[i]
						? tags[i].split(',').map(t => t.trim().toLowerCase())
						: [],
					isActive: true,
					uploadedBy: req.user._id
				}

				const {error} = validateImage(payload);
				if (error)
					throw new Error(`Validation failed for "${payload.originalName}": ${error.details[0].message}`);
				
				imgInfos.push({file, fileType, fileName, payload});
			}

			// upload image to aws
			const uploadRes = [];
			for (const {file, fileType, fileName} of imgInfos) {
				const res = await uploadImageToS3({
					buffer: file.buffer,
					originalname: file.originalname,
					fileName,
					mimeType: fileType.mime
				})
				uploadRes.push(res);
			}

			// save image to mongoose doc
			const createdImgs = [];
			for (let i = 0; i < imgInfos.length; i++) {
				const {payload} = imgInfos[i];
				const {imageUrl} = uploadRes[i];

				payload.imageUrl = imageUrl;

				const imgDoc = new Image(payload);
				const savedImg = await imgDoc.save({session});
				createdImgs.push(savedImg);
			}

			// create and save plan
			const planDoc = new Plan({
				...planData, // spread operator
				images: createdImgs.map(img => img._id)
			});

			const savedPlan = await planDoc.save({session});

			await session.commitTransaction();
			return savedPlan;

	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}

}

router.post('/create-with-image', upload.array('images'), 
	[auth, admin], async(req, res) => {
		if (!req.files || req.files.length === 0)
			return res.status(400).send('No file to upload.');

		const planData = {
			type: req.body.type,
			title: req.body.title,
			description: req.body.description,
			price: parseFloat(req.body.price),
			duration: parseFloat(req.body.duration),
			seatsAvailable: req.body.type === 'tour' ? parseInt(req.body.seatsAvailable) : undefined,
			// adminId: req.user._id
		}

		const {error} = validate(planData);
		if (error)
			return res.status(400).send(error.details[0].message);

		try {
			const newPlan = await createPlanAndImages(planData, req.files, req);
			res.status(201).send({
				success: true,
				plan: newPlan
			});
		}catch (error) {
			res.status(400).send(error.message);
		}
	}
);

module.exports = router;