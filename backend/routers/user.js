const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const user = await User.find().sort('username');
    res.send(user);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        contact: req.body.contact,
        phone: req.body.phone,
        email: req.body.email
    });

    await user.save();
    res.send(user);
});

module.exports = router;
