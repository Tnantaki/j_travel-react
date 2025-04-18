const {User, validate, validatePassword} = require('../models/user');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const validateDelete = require('../middlewares/validateDelete');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', async (req, res) => {
	const user = await User.find().sort('email');
	res.send(user);
});

router.get('/me', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');

	res.send(user);
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
	user.password = await bcrypt.hash(user.newPassword, salt);
	await user.save();

	res.send({message: 'Password updated successfully.'})

})

// user
router.delete('/me', auth, async (req, res) => {
	const user = await User.findByIdAndDelete(req.user._id);

	if (!user) return res.status(404).send('User not found.');

	res.send({message: 'Your account has been deleted.'});
})

// admin
router.delete('/:id', [auth, admin], async (req, res) => {
	const user = await User.findByIdAndDelete(req.params.id);

	if (!user) return res.status(404).send('The user with the given ID was not found.');
	
	res.send(user);
});

router.delete('/delete-users', [auth, admin, validateDelete], async (req, res) => {
	const {ids} = req.body;

	if (!Array.isArray(ids) || ids.length === 0)
		return res.status(404).send('Please provide an array of user IDs to delete.');

	const user = await User.deleteMany({_id: {$in: ids}});

	res.send({deletedCount: user.deletedCount});
});

module.exports = router;
