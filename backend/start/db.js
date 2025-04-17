const winston = require('winston');
const mongoose = require('mongoose');
const { startJob } = require('./cronJob');

module.exports = function() {
	mongoose.connect('mongodb://localhost/jTravel')
		.then(() => {
			winston.info('Connected to MongoDB...');
			startJob();
		}
	)
}