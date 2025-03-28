const {User, validate} = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', async (req, res) => {
    const user = await User.find().sort('email');
    res.send(user);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send('Email already registered.');

    user = new User({
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send({email: user.email});
});

module.exports = router;
