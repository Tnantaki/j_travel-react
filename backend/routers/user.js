const {User, validate, validatePassword} = require('../models/user');
const { Profile } = require('../models/profile');
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const validateDelete = require('../middlewares/validateDelete');
const express = require('express');
const bcrypt = require('bcrypt');
const { validateId, validateIds}  = require('../middlewares/validateObjId');
const winston = require('winston/lib/winston/config');
const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
	const user = await User.find().sort('email');
	res.send(user);
});

router.get('/me', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');

	res.send({email: user.email});
});

router.get('/:id', [auth, admin, validateId], async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) return res.status(404).send('User with the provided ID is not found.');

	res.send({email: user.email});
});

router.post('/', async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({email: req.body.email})
	if (user) return res.status(400).send('Email already registered.');

	user = new User({
		email: req.body.email,
		password: req.body.password,
		isAdmin: req.body.isAdmin
	});
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();

	res.send({email: user.email});
});

router.post('/me/change-password', auth, async (req, res) => {
	const {error} = validatePassword(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const {oldPassword, newPassword} = req.body;
	const user = await User.findById(req.user._id);
	if (!user) return res.status(404).send('User not found.');

	const validPassword = await bcrypt.compare(oldPassword, user.password);
	if (!validPassword) return res.status(400).send('Invalid current password.');

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(newPassword, salt);
	await user.save();

	res.send({message: 'Password updated successfully.'})
})

// user
router.delete('/me', auth, async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const user = await User.findByIdAndDelete(req.user._id).session(session);
		if (!user) return res.status(404).send('User not found.');

		const profile = await Profile.findOne({user: user._id}).session(session);
		if (profile)
			await Profile.deleteOne(profile).session(session);

		await session.commitTransaction();

		res.send({message: 'Your account has been deleted.'});

	} catch (err) {
		await session.abortTransaction();
		res.status(500).send('An error occurred' + err.message) 
	} finally {
		session.endSession();
	}
})

// admin
router.delete('/:id', [auth, admin, validateId], async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const user = await User.findByIdAndDelete(req.params.id).session(session);
		if (!user) return res.status(404).send('The user with the given ID was not found.');

		const profile = await Profile.findOne({user: req.params.id}).session(session);
		if (profile)
			await Profile.deleteOne(profile).session(session);
		
		await session.commitTransaction();

		res.send(user);
	} catch (err) {
		await session.abortTransaction();
		res.status(500).send('An error occurred' + err.message);
	} finally {
		session.endSession();
	}
});

router.delete('/delete-users', [auth, admin, validateIds], async (req, res) => {
	const {ids} = req.body;

	const session = await mongoose.startSession();
	session.startTransaction();

	try { 
		const users = await User.find({_id: {$in: ids}}).session(session);
		if (users.length === 0)
			return res.status(404).send('No users with provided ids found');

		const userIds = users.map(user => user._id).filter(Boolean);

		const delProfile = await Profile.deleteMany({user: {$in: users}}).session(session);

		const delUsers = await User.deleteMany({_id: {$in: userIds}}).session(session);

		session.commitTransaction();

		res.send({
			deletedCount: delUsers.deletedCount,
			message: `Deleted ${delProfile.deletedCount} profiles for ${users.length}`
		});

	} catch (err) {
		await session.abortTransaction();
		res.status(500).send('An error occurred' + err.message);
	} finally {
		session.endSession();
	}
});

module.exports = router;
