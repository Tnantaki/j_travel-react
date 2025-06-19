const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const validatePage = require('../middlewares/validatePagination');
const { Image } = require('../models/image');
const { upload, initImage, uploadImage } = require('../services/uploadS3AndSaveDb');

router.get('/all', [auth, admin, validatePage], async(req, res) => {
	const {page, limit} = req.query;
	const skip = (page - 1) * limit;

	const [ totalItems, docs ] = await Promise.all([
		Image.countDocuments(),
		Image.find()
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

router.get('/', [auth, admin, validatePage], async(req, res) => {
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

			payload.imageUrl = imageUrl;
			
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

module.exports = router;