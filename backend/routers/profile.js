const auth = require('../middlewares/auth');
const {Profile, validate} = require('../models/profile');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const user = await Profile.find().sort('username');
    res.send(user);
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const profile = new Profile({
        username: req.body.username,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        birthday: req.body.birthday,
        gender: req.body.gender,
        Id: req.body.Id,
        passport: req.body.passport
    });

    await profile.save();
    res.send(profile);
});

module.exports = router;
