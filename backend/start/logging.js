const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
	winston.exceptions.handle(
		new winston.transports.File({filename: 'uncaughtException.log'}),
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
				// winston.prettyPrint()
			)})
	)

	process.on('unhandledRejection', (ex) => {
		winston.error('Unhandled Rejection', ex);
	});

	winston.add(new winston.transports.File({filename: "logfile.log"}));
	// winston.add(new winston.transports.MongoDB({
	// 	db: 'mongodb://localhost/jTravel',
	// 	level: 'info'
	// }));

	//log to console if not production env
	if (process.env.NODE_ENV !== 'production') {
		winston.add(new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple(),
				// winston.prettyPrint()
			)
		}));
	};
}