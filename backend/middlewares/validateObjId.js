const mongoose = require('mongoose');

function validateId(req, res, next) {
	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(404).send('Invalid ID.')

    next();
}

function validateIds(req, res, next) {
    const {ids} = req.body;

	if (!Array.isArray(ids) || ids.length === 0)
		return res.status(404).send('Please provide an array of IDs to delete.');

	for (const id in ids) {
		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(404).send('Invalid ID.')
	};

    next();
}

module.exports = {
    validateId,
    validateIds
}