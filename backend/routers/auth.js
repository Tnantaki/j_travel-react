const config = require('config');
const {User, validate} = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', async (req, res) => {
	const user = await User.find().sort('email');
	res.send(user);
});

router.post('/', async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({email: req.body.email})
	if (!user) return res.status(400).send('Invalid email or password');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password');

	const token = jwt.sign({_id: user.id}, config.get('jwtPrivateKey'));

	res.send(token);
});

module.exports = router;
