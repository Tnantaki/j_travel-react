const {Group, validate} = require('../models/group');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const group = await Group.find().sort('-createdAt');
});

router.get('/me', auth, async (req, res) => {
    const group = await Group.find({members: req.user._id}).populate('leader', 'package', 'title');

    if (group.length === 0) return res.status(404).send('You are not a member of any group.');

    res.send(group);
});

router.post('/', auth, async (req, res) => {
    
})


