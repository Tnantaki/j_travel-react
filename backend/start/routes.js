const express = require('express');
const cors = require('cors')
const user = require('../routers/user');
const auth = require('../routers/auth');
const profile = require('../routers/profile');
const package = require('../routers/package');
const group = require('../routers/group');
const error = require('../middlewares/error');

module.exports = function(app) {
    app.use(cors());
    app.use(express.json());
    app.use('/api/users', user);
    app.use('/api/auth', auth);
    app.use('/api/profiles', profile);
    app.use('/api/packages', package);
    app.use('/api/groups', group);
    app.use(error);
}