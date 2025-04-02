const express = require('express');
const cors = require('cors')
const user = require('../routers/user');
const auth = require('../routers/auth');
const profile = require('../routers/profile');
const error = require('../middlewares/error');

module.exports = function(app) {
    app.use(cors())
    app.use(express.json());
    app.use('/api/users', user)
    app.use('/api/auth', auth);
    app.use('/api/profiles', profile)
    app.use(error);
}