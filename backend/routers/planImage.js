const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Plan, validate } = require('../models/plan');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { Image } = require('../models/image');
const { upload, initImage, uploadImage} = require('../services/uploadS3AndSaveDb');
const { schedule } = require('node-cron');

async function createPlanAndImages(planData, imageFiles, req) {
	const session = await mongoose.startSession();

	try { 
			session.startTransaction();

			const imgInfos = await initImage(imageFiles, req);

			const uploadRes = await uploadImage(imgInfos);

			// save image to mongoose doc
			const createdImgs = [];
			for (let i = 0; i < imgInfos.length; i++) {
				const {payload} = imgInfos[i];
				const {imageUrl} = uploadRes[i];
				const {Key} = uploadRes[i];

				payload.imageUrl = imageUrl;
				payload.key = Key;

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
			schedules: []
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

router.patch('/image-to-plan/:id', upload.array('images'),
	[auth, admin], async(req, res) => {
		const session = await mongoose.startSession();
		session.startTransaction();

		try {
			if(!req.files || req.files.length === 0)
				return res.status(400).send('No file to upload.');

			if (!mongoose.Types.ObjectId.isValid(req.params.id))
				return res.status(400).send('Plan with the given ID was not found.');

			const plan = await Plan.findById(req.params.id).session(session);
			if (!plan) return res.status(404).send('Plan with the given ID was not found.');

			const imgInfos = await initImage(req.files, req);

			const uploadRes = await uploadImage(imgInfos);

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

			const updated = await Plan.findByIdAndUpdate(
				req.params.id,
				{images: createdImgs.map(img => img._id)},
				{new: true, runValidators: true}
			).session(session);
			if (!updated) return res.status(400).send('Plan with the given ID was not found.');

			await session.commitTransaction();

			res.send(updated);

		} catch (err) {
			await session.abortTransaction();
			res.status(500).send(err.message);
		} finally {
			session.endSession();
		}
	}
)

module.exports = router;