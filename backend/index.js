const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const user = require('./routers/user');
const app = express();

mongoose.connect('mongodb://localhost/jTravel')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Error connecting to MongoDB...', err));

app.use(express.json());
app.use('/api/users', user)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));