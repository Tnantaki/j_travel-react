require('dotenv').config();
const winston = require('winston');
const express = require('express');
const path = require('path');
const app = express();

//tell express: if any request to /uploads/ should be served
//from the local uploads directory: http://<your-host>/uploads/1718293847123-cat.png
app.use('./uploads', express.static(path.join(__dirname, 'uploads')));

require('./start/logging')();
require('./start/routes')(app);
require('./start/config')();
require('./start/db')();
require('./start/validation')();
require('./utils')


const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`listening on ${port}...`));

module.exports = server;