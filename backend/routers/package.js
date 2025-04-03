const {Package, validate} = require('../models/package');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const package = await Package.find().sort('-createdAt');
	res.send(package);
});

router.get('/:id', async (req, res) => {
	const package = await Package.findById(req.params.id);
	if (!package) return res.status(404).send('Package not found.');
	res.send(package);
})

router.post('/', [auth, admin], async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const package = new Package({
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		duration: req.body.duration,
		availableDates: req.body.availableDates
	});


	await package.save();
	res.send(package);
});

router.put('/:id', [auth, admin], async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const package = await Package.findByIdAndUpdate(
		req.params.id,
		{
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			duration: req.body.duration,
			availableDates: req.body.availableDates
		},
		{new: true}
	);

	if (!package) return res.status(404).send('Package not found.');

	res.send(package);
})


router.delete('/:id', [auth, admin], async (req, res) => {
	const package = await Package.findByIdAndDelete(req.params.id);

	if (!package) return res.status(404).send('Package not found.');

	res.send(package);
})


