const { Plan, validate, validateUpdate } = require('../models/plan');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const validateDelete = require('../middlewares/validateDelete');
const express = require('express');
const { default: mongoose } = require('mongoose');
const { validateId } = require('../middlewares/validateObjId');
const router = express.Router();

router.get('/', async (req, res) => {
	const plan = await Plan.find()
		.sort('-createdAt')
		.populate('images')
	res.send(plan);
});

router.get('/:id', async (req, res) => {
	const plan = await Plan.findById(req.params.id)
		.populate('images')
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
		schedules: req.body.schedules
	});

	await plan.save();
	res.send(plan);
});

router.put('/:id', [auth, admin], async (req, res) => {
	const { error } = validateUpdate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	if ('schedules' in req.body)
		return res.status(400).send('Use a specific endpoint to update schedules.');

	const plan = await Plan.findByIdAndUpdate(
		req.params.id,
		{$set: req.body},
		{ new: true, runValidators: true }
	);
	if (!plan) return res.status(404).send('Plan not found.');

	res.send(plan);
})

router.put('/update-plans', [auth, admin], async (req, res) => {
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

// only change one schduel at a time
router.patch('/:id/schedules/:scheduleIndex', [auth, admin, validateId], async(req, res) => {
	const {error} = validateUpdate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const {schedules: sc} = req.body;

	const idx = parseInt(req.params.scheduleIndex, 10);
	console.log(idx);

	const updates = Object.entries(sc[0]).reduce((acc, [key, val]) => {
		acc[`schedules.${idx}.${key}`] = val; // mongodb expect `schedules.0.tile` and such
		return acc;
	}, {});

	const plan = await Plan.findByIdAndUpdate(
		req.params.id,
		{$set: updates},
		{new: true, runValidators: true}
	);
	if (!plan) return res.status(400).send('Plan not found.');
	
	res.send(plan);
})

router.patch('/schedules/:id', [auth, admin, validateId], async(req, res) => {
	const {error} = validateUpdate(req.body);
	if (!error) return res.status(400).send(error.details[0].message);

	const {index: idx, schedules: sc} = req.body;

	if(!Array.isArray(idx) || idx.length === 0)
		return res.status(400).send('Missing index.');

	if (!idx.some(isNaN)) 
		return res.status(400).send('Index must be number only.');

	if (sc.length !== idx.length)
		return res.status(400).send('Index and schedules length must match.');

	const updates = [];
	let i = 0;
	for (const obj of sc) {
		const newSc = Object.entries(obj).reduce((acc, [key, val]) => {
			acc[`schedules.${idx[i]}.${key}`] = val;
			return acc;
		}, {})
		i++;
		updates.push(newSc);
	}

	// flatten array into one object
	const setObj = Object.assign({}, ...updates);

	const plan = await Plan.findByIdAndUpdate(
		req.params.id,
		{$set: setObj},
		{new: true, runValidators: true}
	);
	if (!plan) res.status(404).send('Plan not found.');

	res.send(plan);
})

router.delete('/:id', [auth, admin], async (req, res) => {
	const plan = await Plan.findByIdAndDelete(req.params.id);

	if (!plan) return res.status(404).send('Plan not found.');

	res.send(plan);
})

router.delete('/delete-plans', [auth, admin, validateDelete], async (req, res) => {
	const { ids } = req.body;

	if (!Array.isArray(ids) || ids.length === 0)
		return res.status(400).send('Please provide an array of plan IDs to delete.');

	const plan = await Plan.deleteMany({ _id: { $in: ids } });

	res.send({ deletedCount: plan.deletedCount });
})

module.exports = router;