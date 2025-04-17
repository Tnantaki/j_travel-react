const { Plan, validate, validateUpdate } = require('../models/plan');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const validateDelete = require('../middlewares/validateDelete');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const plan = await Plan.find().sort('-createdAt');
	res.send(plan);
});

router.get('/:id', async (req, res) => {
	const plan = await Plan.findById(req.params.id);
	if (!plan) return res.status(404).send('Plan not found.');
	res.send(plan);
})

router.post('/', [auth, admin], async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const plan = new Plan({
		type: req.body.type,
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		duration: req.body.duration,
		seatsAvailable: req.body.seatsAvailable,
		availableDates: req.body.availableDates
	});

	await plan.save();
	res.send(plan);
});

router.put('/:id', [auth, admin], async (req, res) => {
	const { error } = validateUpdate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const plan = await Plan.findByIdAndUpdate(
		req.params.id,
		{
			type: req.body.type,
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			duration: req.body.duration,
			seatsAvailable: req.body.seatsAvailable,
			availableDates: req.body.availableDates
		},
		{ new: true }
	);
	if (!plan) return res.status(404).send('Plan not found.');

	res.send(plan);
})

router.put('/update-profiles', [auth, admin], async (req, res) => {
	const { ids, updateData } = req.body;
	if (!Array.isArray(ids) || ids.length === 0)
		return res.status(404).send('Please provide an array of plan IDs to update.');
	if (typeof updateData !== 'object' || Objject.keys(updateData).length === 0)
		return res.status(400).send('Please provide the fields to update.');

	const { error } = validateUpdate(updateData);
	if (error) return res.status(400).send(error.details[0].message);

	const plan = Plan.updateMany(
		{ _id: { $in: ids } },
		{ $set: updateData }
	)

	res.send({ modifiedCount: plan.modifiedCount });
})



router.delete('/:id', [auth, admin], async (req, res) => {
	const plan = await Plan.findByIdAndDelete(req.params.id);

	if (!plan) return res.status(404).send('Plan not found.');

	res.send(plan);
})

router.delete('/', [auth, admin, validateDelete], async (req, res) => {
	const { ids } = req.body;

	if (!Array.isArray(ids) || ids.length === 0)
		return res.status(404).send('Please provide an array of plan IDs to delete.');

	const plan = await Plan.deleteMany({ _id: { $in: ids } });

	res.send({ deletedCount: plan.deletedCount });
})

module.exports = router;