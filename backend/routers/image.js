const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const validatePage = require('../middlewares/validatePagination');
const { Image } = require('../models/image');
const { upload, initImage, uploadImage, s3Client } = require('../services/uploadS3AndSaveDb');
const validateDelete = require('../middlewares/validateDelete');
const { DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const { validateIds } = require('../middlewares/validateObjId');

router.get('/all', [auth, admin, validatePage], async(req, res) => {
	const {page, limit} = req.query;
	const skip = (page - 1) * limit;

	const [ totalItems, docs ] = await Promise.all([
		Image.countDocuments({isActive: true}),
		Image.find({isActive: true})
			.sort({uploadedAt: -1})
			.skip(skip)
			.select('')
			.select('fileName imageUrl')
	]);

	const totalPages = Math.ceil(totalItems / limit);

	res.send({
		page,
		limit,
		totalPages,
		totalItems,
		items: docs
	});
})

router.get('/by-tag', [auth, admin, validatePage], async(req, res) => {
	const {page, limit, tags } = req.query;
	const skip = (page - 1) * limit;

	let filter = {isActive: true};
	if (tags) {
		const tagList = tags.split(',').map(t => t.toLowerCase().trim());
		filter.tag = {$in: tagList};
	}

	const [ totalItems, items ] = await Promise.all([
		Image.countDocuments(filter),
		Image.find(filter)
			.sort({uploadedAt: -1})
			.skip(skip)
			.limit(limit)
			.select('fileName imageUrl tag')
	]);

	res.send({
		page,
		limit,
		totalPages: Math.ceil(totalItems / limit),
		totalItems,
		items
	})

})

router.get('/inactive-images', [auth, admin], async(req, res) => {
	const imgs = await Image.find({isActive: false})
		.select('fileName imaggeUrl tag')

	if (!imgs || imgs.length === 0)
		res.status(404).send('No images found.');

	res.send({total: imgs.length, imgs});
})

router.post('/', upload.array('images') ,[auth, admin], async(req, res) => {
	if (!req.files || req.files.length === 0)
		return res.status(400).send('No file to upload.');
	
	try {
		const imgInfos = await initImage(req.files, req);
		const uploadRes = await uploadImage(imgInfos);

		const createdImg = [];
		for (let i = 0; i < imgInfos.length; i++) {
			const {payload} = imgInfos[i];
			const {imageUrl} = uploadRes[i];
			const {Key} = uploadRes[i];

			payload.imageUrl = imageUrl;
			payload.key = Key;
			
			const imgDoc = new Image(payload);
			const savedImg = await imgDoc.save();
			createdImg.push(savedImg);
		}

		res.send({
			success: true,
			createdImg
		})

	} catch (error) {
		res.status(400).send(error.message);
	}
})

router.patch('/active-images', [auth, admin, validateIds], async(req, res) => {
	const {ids} = req.body;
	if (!ids || ids.length === 0)
		return res.status(400).send("IDs are not provided.");
	
	const images = await Image.updateMany(
		{_id: {$in: ids}},
		{isActive: true},
		{new: true, runValidators: true}
	)
	if (!images) return res.status(400).send('Invalid IDs');

	res.send({
		success: images.acknowledged,
		updated: images.matchedCount
	})
})
 
router.delete('/soft-delete', [auth, admin, validateDelete], async(req, res) => {
	const {ids} = req.body;
	
	const imgs = await Image.find({_id: {$in: ids}});
	if (!imgs || imgs.length === 0) return res.status(404).send('Images not found');

	for (let img of imgs) {
		img.isActive = false
		await img.save();
	}

	res.send('Delete completed.');
});

router.delete('/hard-delete', [auth, admin, validateDelete], async(req, res) => {
	const {ids} = req.body
	
	try {

		const imgs = await Image.find({_id: {$in: ids}});
		if (!imgs || imgs.length === 0)
			return res.status(404).send('Images not found.');

		const s3Keys = imgs.map(img => img.key);

		const deleted = await Image.deleteMany({_id: {$in: ids}});

		// use DeleteObjectsCommand (plural) with proper batch format
		let s3DeleteRes = null
		let s3Error = null;

		if (s3Keys.length > 0) {
			try {
				const deleteParams = {
					Bucket: process.env.AWS_BUCKET_NAME,
					Delete: {
						Objects: s3Keys.map(key => ({Key: key})),
						Quiet: false //get detailed response about successes/failures
					}
				};

				s3DeleteRes = await s3Client.send(new DeleteObjectsCommand(deleteParams))
			} catch (error) {
				s3Error = error;
				console.error('S3 batch deletion failed:', error);
			}
		}

		// process results
		const success = s3DeleteRes?.Deleted?.length || 0;
		const fail = s3DeleteRes?.Errors?.length || (s3Error ? s3Keys.length: 0);

		if (s3DeleteRes?.Errors && s3DeleteRes.Errors.length > 0) 
			console.error('Some S3 deletions failed', s3DeleteRes.Errors);

		if (s3Error) 
			console.error('Complete S3 deletion failure', s3Error);

		res.send({deletedCount: deleted.deletedCount,
			s3CleanupStatus: {
				successful: success,
				failed: fail,
				errors: s3DeleteRes?.Errors || (s3Error ? [{error: s3Error.message}] : undefined)
			}
		});
	} catch(error) {
		console.error('Hard delete error:', error);
		res.status(500).send('Interal server error during images deleteion');
	}
})

module.exports = router;