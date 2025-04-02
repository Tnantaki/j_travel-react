require('express-async-errors');
const config = require('config');
const winston = require('winston');
const error = require('./middleware/error');
const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);
const cors = require('cors')
const mongoose = require('mongoose');
const express = require('express');
const user = require('./routers/user');
const auth = require('./routers/auth');
const profile = require('./routers/profile');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/jTravel')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Error connecting to MongoDB...', err));

app.use(cors())
app.use(express.json());
app.use('/api/users', user)
app.use('/api/auth', auth);
app.use('/api/profiles', profile)

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));