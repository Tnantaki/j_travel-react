const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const validatePage = require('../middlewares/validatePagination');
const { Image } = require('../models/image');
 
router.get('/all', [auth, admin, validatePage], async(req, res) => {
	const page = Math.max(1, parseInt(req.query.page, 10) || 1);
	const limit = Math.min(50, parseInt(req.query.limit, 10) || 10);
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

module.exports = router;