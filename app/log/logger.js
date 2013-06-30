var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new winston.transports.File({ filename: __dirname + '/app.log', json: false,handleExceptions: true })
    ],
    exitOnError: false
});

module.exports = logger;