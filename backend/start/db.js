require('dotenv').config();
const winston = require('winston');
const mongoose = require('mongoose');
const startJobs = require('./cronJob');
const config = require('config');

module.exports = function() {
	const db = config.get('db');
	console.log(`▶️  Using Mongo URI: ${db}`);
	mongoose.connect(db)
		.then(() => {
			winston.info(`Connected to ${db}...`);
			if (process.env.NODE_ENV !== 'test')
				startJobs();
		})
		.catch(err => {
			console.error('❌ Mongoose connection error:', err.message);
			process.exit(1);
		});
}


// module.exports = function() {
// 	const db = config.get('db');
// 	console.log(`▶️  Using Mongo URI: ${db}`);
	
// 	// Add connection event listeners for better debugging
// 	mongoose.connection.on('connecting', () => {
// 		console.log('🔄 Connecting to MongoDB...');
// 	});
	
// 	mongoose.connection.on('error', (err) => {
// 		console.error('❌ MongoDB connection error:', err);
// 	});
	
// 	mongoose.connection.on('disconnected', () => {
// 		console.log('⚠️  MongoDB disconnected');
// 	});
	
// 	mongoose.connection.on('reconnected', () => {
// 		console.log('🔄 MongoDB reconnected');
// 	});

// 	// Set connection options for replica set
// 	const options = {
// 		serverSelectionTimeoutMS: 30000, // 30 seconds - increased for replica set
// 		heartbeatFrequencyMS: 2000,
// 		maxPoolSize: 10,
// 		minPoolSize: 1,
// 		socketTimeoutMS: 45000,
// 		connectTimeoutMS: 30000,
// 		retryWrites: true,
// 		readPreference: 'primary'
// 	};

// 	mongoose.connect(db, options)
// 		.then(() => {
// 			winston.info(`✅ Connected to ${db}...`);
// 			console.log('✅ Database connection successful');
// 			if (process.env.NODE_ENV !== 'test')
// 				startJobs();
// 		})
// 		.catch(err => {
// 			console.error('❌ Mongoose connection error:', err.message);
// 			console.error('❌ Full error:', err);
// 			process.exit(1);
// 		});
// }