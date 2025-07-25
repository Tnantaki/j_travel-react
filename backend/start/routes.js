const express = require('express');
const cors = require('cors')
const helmet = require('helmet');
const user = require('../routers/user');
const auth = require('../routers/auth');
const profile = require('../routers/profile');
const profileImage = require('../routers/profileImage');
const plan = require('../routers/plan');
const planImage = require('../routers/planImage');
const group = require('../routers/group');
const booking = require('../routers/booking');
const image = require('../routers/image');
const error = require('../middlewares/error');

module.exports = function(app) {
    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    // router handlers
    app.use('/api/users', user);
    app.use('/api/auth', auth);
    app.use('/api/profiles', profile);
    app.use('/api/profiles', profileImage)
    app.use('/api/plans', plan);
    app.use('/api/plans', planImage);
    app.use('/api/groups', group);
    app.use('/api/bookings', booking);
    app.use('/api/images', image);

    // error handler
    app.use(error);
}