const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const user = await User.find().sort('email');
    res.send(user);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User({
        password: req.body.password,
        email: req.body.email
    });

    await user.save();
    res.send(user);
});

module.exports = router;
