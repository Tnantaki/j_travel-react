const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const validatePage = require('../middlewares/validatePagination');
const { Image } = require('../models/image');

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

router.post('/', [auth, admin], async(req, res) => {
	if (!req.files || req.files.length === 0)
		return res.status(400).send(error.detials[0].message);
	
})

module.exports = router;