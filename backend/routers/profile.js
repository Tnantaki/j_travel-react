const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const {Profile, validate, validateUpdate} = require('../models/profile');
const express = require('express');
const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
	const profile = await Profile.find().sort('username');
	res.send(profile);
});

router.get('/:id', [auth, admin], async (req, res) => {
	const profile = await Profile.findById(req.params.id);
	if (!profile) return res.status(404).send('The profile with the given ID was not found.');

	res.send(profile);
});

router.get('/me', auth, async (req, res) => {
	const profile = await Profile.findOne({user: req.user._id});
	if (!profile) return res.status(404).send('Profile not found.');

	res.send(profile);
});

router.post('/', auth, async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const hasProfile = await Profile.findOne({user: req.user._id});
	if (hasProfile) return res.status(400).send('User already has a profile.');

	const profile = new Profile({
		user: req.user._id,
		username: req.body.username,
		address: req.body.address,
		phone: req.body.phone,
		email: req.body.email,
		birthday: req.body.birthday,
		gender: req.body.gender,
		idNumber: req.body.idNumber,
		passportNumber: req.body.passportNumber
	});

	await profile.save();
	res.send(profile);
});

router.put('/me', auth, async (req, res) => {
	const {error} = validateUpdate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const profile = await Profile.findOneAndUpdate(
		{user: req.user._id},
		{$set: req.body},
		{new: true, runValidators: true}
	);

	if (!profile) return res.status(404).send('Profile not found.');
	
	res.send(profile);
})

router.delete('/me', auth, async (req, res) => {
	const profile = await Profile.findOneAndDelete({user: user.req._id});
	if (!profile) return res.status(404).send('Profile not found.');

	res.send({message: 'Profile deleted successfully', profile});
});

module.exports = router;
