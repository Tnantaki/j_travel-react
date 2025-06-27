const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const uploadLocal = require('../middlewares/uploadLocal');
const {Profile, validate, validateUpdate} = require('../models/profile');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path =require('path');

router.get('/', [auth, admin], async (req, res) => {
	const profile = await Profile.find().sort('username');
	res.send(profile);
});

router.get('/me', auth, async (req, res) => {
	const profile = await Profile.findOne({user: req.user._id});
	if (!profile) return res.status(404).send('Profile not found.');

	res.send(profile);
});

router.get('/:id', [auth, admin], async (req, res) => {
	const profile = await Profile.findById(req.params.id);
	if (!profile) return res.status(404).send('The profile with the given ID was not found.');

	res.send(profile);
});

router.post('/', auth, async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const [hasProfile, dupEmail] = await Promise.all([
		Profile.findOne({user: req.user._id}),
		Profile.findOne({email: req.body.email})
	])
	if (hasProfile) return res.status(400).send('User already has a profile.');
	if (dupEmail) return res.status(400).send('This email is already existed.');

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

router.post('/upload-image', [auth, uploadLocal.single('profileImg')], async (req, res) => {
	try {
		if (!req.file)
			return res.status(400).send('No file to upload.');

		const profile = await Profile.findOne({user: req.user._id});
		if (!profile) {
			// clean up the uploaded file if profile doesn't exist
			fs.unlinkSync(req.file.path);
			return res.status(400).send('Profile not found.');
		}

		if (profile.user.toString() != req.user._id.toString()) {
			fs.unlinkSync(req.file.path);
			return res.status(401).send('Error: cannot upload profile image.');
		}

		// clean up previous profile image if it exist
		if (profile.profileImage) {
			const prevImagePath = path.join(__dirname, '../uploads', path.basename(profile.profileImage));
			if (fs.existsSync(prevImagePath))
				fs.unlinkSync(prevImagePath);
		}

		const fullUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

		profile.profileImage = fullUrl;
		await profile.save();

		res.json({
			success: true,
			filename: req.file.filename,
			url: fullUrl
		});
	}
	catch (error) {
		if (req.file)
			fs.unlinkSync(req.file.path);
		res.status(500).send('Server error during file upload.');
	}
});

router.put('/me', auth, async (req, res) => {
	const {error} = validateUpdate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const profile = await Profile.findOneAndUpdate(
		{user: req.user._id}, // find user id , not profile id
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
