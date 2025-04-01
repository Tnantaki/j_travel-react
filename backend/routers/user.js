const {User, validate} = require('../models/user');
const asyncMiddleware = require('../middlewares/async');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', asyncMiddleware(async (req, res) => {
    const user = await User.find().sort('email');
    res.send(user);
}));

router.get('/me', auth, asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}));

router.post('/', asyncMiddleware(async (req, res) => {
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
}));

router.delete('/:id', [auth, admin], asyncMiddleware(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).send('The user with the given ID was not found.');
    
    res.send(user);
}));

module.exports = router;
