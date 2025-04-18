const winston = require('winston');
const mongoose = require('mongoose');
const startJobs = require('./cronJob');

module.exports = function() {
	mongoose.connect('mongodb://localhost/jTravel')
		.then(() => {
			winston.info('Connected to MongoDB...');
			startJobs();
		}
	)
}