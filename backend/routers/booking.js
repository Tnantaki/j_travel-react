const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { Booking } = require('../models/booking');

router.get('/', [auth, admin], async (req, res) => {
    const booking = await Booking.find().sort('createdAt');
    if (!booking) return res.status(404).send('Booking not found.');

    res.send(booking);
});

router.get('/me', auth, async (req, res) => {
    
})