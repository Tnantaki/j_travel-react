const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const cors = require('cors')
const mongoose = require('mongoose');
const express = require('express');
const user = require('./routers/user');
const auth = require('./routers/auth');
const profile = require('./routers/profile');
const app = express();

mongoose.connect('mongodb://localhost/jTravel')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Error connecting to MongoDB...', err));

app.use(cors())

app.use(express.json());
app.use('/api/users', user)
app.use('/api/auth', auth);
app.use('/api/profiles', profile)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));