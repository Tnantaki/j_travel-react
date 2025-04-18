const express = require('express');
const cors = require('cors')
const helmet = require('helmet');
const user = require('../routers/user');
const auth = require('../routers/auth');
const profile = require('../routers/profile');
const plan = require('../routers/plan');
const group = require('../routers/group');
const booking = require('../routers/booking');
const error = require('../middlewares/error');

module.exports = function(app) {
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use('/api/users', user);
    app.use('/api/auth', auth);
    app.use('/api/profiles', profile);
    app.use('/api/plans', plan);
    app.use('/api/groups', group);
    app.use('/api/bookings', booking);
    app.use(error);
}